<?php
declare(strict_types=1);
defined('QUEUELESS') || exit;
ini_set('display_errors','0');
const MINUTE = 60000;
const ACTIVE = ['booked','checked-in','called','serving'];
date_default_timezone_set('Asia/Kolkata');
function now_ms(): int { return (int)round(microtime(true)*1000); }
function uid(): string { return bin2hex(random_bytes(16)); }
function fail(string $code, int $status=400): never { throw new ApiError($code,$status); }
class ApiError extends RuntimeException { public function __construct(public string $error,public int $status){parent::__construct($error);} }
function config(): array {
 static $c;
 if ($c) return $c;
 $path=getenv('QUEUELESS_CONFIG') ?: __DIR__.'/config.php';
 if(!is_file($path)) fail('setupRequired',503);
 $c=require $path;
 return $c;
}
function db(): PDO {
 static $db;
 if (!$db) { $c=config(); $db=new PDO($c['dsn'],$c['db_user']??null,$c['db_password']??null,[PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION,PDO::ATTR_DEFAULT_FETCH_MODE=>PDO::FETCH_ASSOC,PDO::ATTR_EMULATE_PREPARES=>false]); }
 return $db;
}
function sql(string $query,array $params=[]): PDOStatement { $q=db()->prepare($query); $q->execute($params); return $q; }
function one(string $query,array $params=[]): ?array { return sql($query,$params)->fetch() ?: null; }
function all(string $query,array $params=[]): array { return sql($query,$params)->fetchAll(); }
function lock_db(): void { db()->beginTransaction(); sql('SELECT id FROM ql_lock WHERE id=1'.(db()->getAttribute(PDO::ATTR_DRIVER_NAME)==='mysql'?' FOR UPDATE':'')); }
function transaction(callable $fn): mixed { lock_db(); try{$result=$fn();db()->commit();return $result;}catch(Throwable $e){if(db()->inTransaction())db()->rollBack();throw $e;} }
function audit(string $actor,string $action,?string $office=null,?string $visit=null,array $detail=[]): void {
 sql('INSERT INTO ql_audit (id,actor,office_id,visit_id,action,detail,created) VALUES (?,?,?,?,?,?,?)',[uid(),$actor,$office,$visit,$action,json_encode($detail,JSON_UNESCAPED_UNICODE),now_ms()]);
}
function session_init(): void {
 $c=config(); $local=($c['local_development']??false) && in_array($_SERVER['REMOTE_ADDR']??'', ['127.0.0.1','::1'],true);
 if(!$local && (empty($_SERVER['HTTPS']) || $_SERVER['HTTPS']==='off')) fail('httpsRequired',403);
 ini_set('session.use_strict_mode','1'); ini_set('session.use_only_cookies','1');
 session_name('queueless_session');
 session_set_cookie_params(['lifetime'=>0,'path'=>'/','secure'=>!$local,'httponly'=>true,'samesite'=>'Lax']);
 session_start();
 if(isset($_SESSION['last']) && now_ms()-$_SESSION['last']>8*3600000){$_SESSION=[];session_regenerate_id(true);}
 $_SESSION['last']=now_ms();
 $_SESSION['csrf']??=bin2hex(random_bytes(32));
}
function current_user(): ?array {
 if(empty($_SESSION['uid']))return null;
 $u=one('SELECT * FROM ql_users WHERE id=?',[$_SESSION['uid']]);
 if(!$u || (int)$u['session_version']!==(int)($_SESSION['version']??0)){unset($_SESSION['uid']);return null;}
 return $u;
}
function need_user(): array { return current_user()??fail('signin',401); }
function public_user(?array $u): ?array { if(!$u)return null;return array_intersect_key($u,array_flip(['id','name','email','phone','role','office_id','lang','travel','sms_opt_in'])); }
function sign_in(array $u): void { session_regenerate_id(true);$_SESSION['uid']=$u['id'];$_SESSION['version']=$u['session_version'];$_SESSION['csrf']=bin2hex(random_bytes(32)); }
function staff(array $u,string $office): void { if($u['role']!=='admin' && !($u['role']==='officer' && $u['office_id']===$office))fail('forbidden',403); }
function admin(array $u): void { if($u['role']!=='admin')fail('forbidden',403); }
function check_post(): array {
 $origin=$_SERVER['HTTP_ORIGIN']??'';
 if($origin!=='' && $origin!==rtrim(config()['origin'],'/'))fail('forbidden',403);
 if(!hash_equals($_SESSION['csrf'],$_SERVER['HTTP_X_CSRF_TOKEN']??''))fail('csrf',403);
 $raw=file_get_contents('php://input',false,null,0,65537);
 if(strlen($raw)>65536)fail('invalid');
 $body=json_decode($raw,true);if(!is_array($body))fail('invalid');return $body;
}
function text_field(array $b,string $key,int $max=200,bool $required=true): string {
 $v=$b[$key]??'';if(!is_string($v))fail('invalid');$v=trim($v);
 if(($required && $v==='') || mb_strlen($v)>$max)fail('invalid');return $v;
}
function int_field(array $b,string $key,int $min,int $max): int {
 $v=filter_var($b[$key]??null,FILTER_VALIDATE_INT);if($v===false || $v===null || $v<$min || $v>$max)fail('invalid');return $v;
}
function url_field(string $v): string { if($v!=='' && (!filter_var($v,FILTER_VALIDATE_URL)||parse_url($v,PHP_URL_SCHEME)!=='https'))fail('invalid');return $v; }
function words(array $b,string $key,bool $required=true): string {
 $v=$b[$key]??null;if(!is_array($v)||count($v)!==3)fail('invalid');
 foreach($v as $s)if(!is_string($s)||mb_strlen($s)>1000||($required&&!trim($s)))fail('invalid');return json_encode(array_values($v),JSON_UNESCAPED_UNICODE);
}
function lang_text(array $words,string $lang): string {return $words[$lang==='gu'?0:($lang==='hi'?1:2)];}
function rate(string $scope,string $key,int $limit,int $seconds): void {
 $blocked=transaction(function()use($scope,$key,$limit,$seconds){$id=$scope.':'.hash('sha256',$key);$r=one('SELECT * FROM ql_limits WHERE id=?',[$id]);$now=now_ms();if(!$r){sql('INSERT INTO ql_limits (id,attempts,expires) VALUES (?,?,?)',[$id,1,$now+$seconds*1000]);return false;}if($r['expires']<$now){sql('UPDATE ql_limits SET attempts=1,expires=? WHERE id=?',[$now+$seconds*1000,$id]);return false;}sql('UPDATE ql_limits SET attempts=attempts+1 WHERE id=?',[$id]);return $r['attempts']>=$limit;});
 if($blocked)fail('rateLimit',429);
}
function slots(array $o,string $day,int $lead=15): array {
 $now=now_ms();$today=date('Y-m-d');if(!preg_match('/^\d{4}-\d{2}-\d{2}$/',$day)||$day<$today||$day>date('Y-m-d',strtotime('+7 days')))return [];
 $start=strtotime($day.' 00:00:00')*1000;
 if(!in_array(date('w',(int)($start/1000)),explode(',',$o['weekdays']),true)||in_array($day,json_decode($o['closures'],true),true))return [];
 $out=[];for($m=(int)$o['opens'];$m+15<=(int)$o['closes'];$m+=15){$time=$start+$m*MINUTE;if($time>=$now+$lead*MINUTE)$out[]=$time;}return $out;
}
function office_service(string $id): array {
 $s=one('SELECT * FROM ql_services WHERE id=?',[$id]);if(!$s)fail('missing',404);
 $o=one('SELECT * FROM ql_offices WHERE id=?',[$s['office_id']]);return [$o,$s];
}
function check_bookable(array $o,array $s): void {
 if(!$o['verified']||$o['paused']||!$s['enabled'])fail('closed',409);
 if(!one('SELECT id FROM ql_counters WHERE service_id=? AND paused=0',[$s['id']]))fail('closed',409);
}
function estimate(array $o,array $s,array $visits,?int $clock=null): array {
 $now=$clock??now_ms();$recent=all("SELECT started_at,completed_at FROM ql_visits WHERE service_id=? AND status='completed' ORDER BY completed_at DESC LIMIT 30",[$s['id']]);
 $dur=[];foreach($recent as $v){$n=($v['completed_at']-$v['started_at'])/MINUTE;if($n>=.25 && $n<=240)$dur[]=$n;}sort($dur);
 $measured=count($dur)>=5;$low=$measured?max(1,$dur[(int)floor((count($dur)-1)*.25)]):max(1,$s['duration']*.75);$high=$measured?max($low+1,$dur[(int)floor((count($dur)-1)*.85)]):$s['duration']*1.5;
 $counters=$o['paused']?[]:all('SELECT * FROM ql_counters WHERE service_id=? AND paused=0',[$s['id']]);
 $lows=[];$highs=[];foreach($counters as $c){$l=$h=$now;foreach($visits as $v)if($v['counter_id']===$c['id']&&in_array($v['status'],['called','serving'],true)){$l=max($now+MINUTE,($v['started_at']?:$now)+$low*MINUTE);$h=max($now+MINUTE,($v['started_at']?:$now)+$high*MINUTE);}$lows[]=$l;$highs[]=$h;}
 $waiting=array_values(array_filter($visits,fn($v)=>$v['service_id']===$s['id']&&in_array($v['status'],['booked','checked-in'],true)));
 usort($waiting,function($a,$b)use($now){if($a['arrival']<=$now&&$b['arrival']<=$now&&$a['priority']!=$b['priority'])return $b['priority']<=>$a['priority'];return ($a['arrival']<=>$b['arrival'])?:($a['created']<=>$b['created'])?:strcmp($a['id'],$b['id']);});
 $out=[];foreach($waiting as $i=>$v){$row=['earliest'=>null,'latest'=>null,'samples'=>count($dur),'basis'=>$measured?'measured':'configured','ahead'=>$i,'activeCounters'=>count($counters)];if($counters){$li=array_search(min($lows),$lows);$hi=array_search(min($highs),$highs);$floor=max($now,$v['arrival']+$o['delay_minutes']*MINUTE);$row['earliest']=max($floor,$lows[$li]);$row['latest']=max($row['earliest'],$floor+max(2,$high-$low)*MINUTE,$highs[$hi]);$lows[$li]=$row['earliest']+$low*MINUTE;$highs[$hi]=$row['latest']+$high*MINUTE;}$out[$v['id']]=$row;}return $out;
}
function notify_visit(array $v,string $kind,array $message,string $dedup): void {
 if(!$v['user_id'] || one('SELECT id FROM ql_notifications WHERE dedup=?',[$dedup]))return;
 $u=one('SELECT * FROM ql_users WHERE id=?',[$v['user_id']]);
 $sms=(!empty(config()['messaging_service'])&&!empty(config()['twilio_sid'])&&!empty(config()['twilio_token'])&&$u['phone']&&$u['sms_opt_in'])?'pending':'off';
 sql('INSERT INTO ql_notifications (id,user_id,visit_id,kind,message,dedup,created,sms_state) VALUES (?,?,?,?,?,?,?,?)',[uid(),$u['id'],$v['id'],$kind,json_encode($message,JSON_UNESCAPED_UNICODE),$dedup,now_ms(),$sms]);
}
function release_visit(array $v,string $status,string $actor,string $reason=''): void {
 sql('UPDATE ql_visits SET status=?,active_user_service=NULL,slot_key=NULL,busy_counter=NULL,reason=?,updated=? WHERE id=?',[$status,$reason,now_ms(),$v['id']]);
 audit($actor,$status,$v['office_id'],$v['id'],['reason'=>$reason]);
}
function maintenance(): void {
 $now=now_ms();$visits=all("SELECT v.*,o.paused FROM ql_visits v JOIN ql_offices o ON o.id=v.office_id WHERE v.status IN ('booked','checked-in')");
 foreach($visits as $v){if($v['paused'])continue;
  if($v['status']==='booked' && $now>$v['arrival']+(25+$v['grace_delay'])*MINUTE){release_visit($v,'missed','system','Arrival grace period ended');notify_visit($v,'missed',['ચેક-ઇન સમય પૂરો થયો. નવી મુલાકાત બુક કરો.','चेक-इन समय समाप्त हुआ। नई मुलाकात बुक करें।','Your check-in grace period ended. Please book another visit.'],'missed:'.$v['id']);}
  elseif($v['status']==='booked'&&$now>=$v['arrival']-($v['travel_minutes']+5)*MINUTE){notify_visit($v,'leave',['તમારી મુલાકાતનો સમય નજીક છે. ટોકન તપાસો.','आपकी मुलाकात का समय पास है। टोकन देखें।','Your visit is approaching. Check your token and travel plan.'],'leave:'.$v['id'].':'.$v['arrival']);}
 }
 sql('DELETE FROM ql_limits WHERE expires<?',[$now-86400000]);
}
function twilio(string $path,array $body,bool $verify=true): array {
 $c=config();if(empty($c['twilio_sid'])||empty($c['twilio_token'])||($verify&&empty($c['verify_service'])))fail('providerNotConnected',503);
 $url=$verify?'https://verify.twilio.com/v2/Services/'.rawurlencode($c['verify_service']).'/'.$path:'https://api.twilio.com/2010-04-01/Accounts/'.rawurlencode($c['twilio_sid']).'/Messages.json';
 $ch=curl_init($url);curl_setopt_array($ch,[CURLOPT_POST=>true,CURLOPT_POSTFIELDS=>http_build_query($body),CURLOPT_RETURNTRANSFER=>true,CURLOPT_USERPWD=>$c['twilio_sid'].':'.$c['twilio_token'],CURLOPT_TIMEOUT=>15,CURLOPT_CONNECTTIMEOUT=>5]);
 $raw=curl_exec($ch);$status=curl_getinfo($ch,CURLINFO_HTTP_CODE);curl_close($ch);
 if($raw===false||$status<200||$status>=300)fail('providerFailed',502);
 return json_decode($raw,true)??[];
}
