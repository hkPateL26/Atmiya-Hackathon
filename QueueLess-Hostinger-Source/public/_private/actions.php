<?php
declare(strict_types=1);
defined('QUEUELESS') || exit;
function auth_action(string $action,array $b): ?array {
 $ip=$_SERVER['REMOTE_ADDR']??'unknown';
 if(in_array($action,['login','register','recover'],true)){
  rate('auth-ip',$ip,30,900);$email=strtolower(text_field($b,'email',190));if(!filter_var($email,FILTER_VALIDATE_EMAIL))fail('invalid');rate('auth-account',$email,10,900);
  $password=text_field($b,'password',128);if(strlen($password)<12)fail('passwordLength');
  if($action==='login'){$u=one('SELECT * FROM ql_users WHERE email=?',[$email]);$hash=$u['password_hash']??'$2y$12$G6xZHwlNU/XqthUaUsDQUuS2JCyxaMI4DDHf6tNfeyHs1AbumD7zK';if(!password_verify($password,$hash)||!$u)fail('credentials',401);sign_in($u);return ['ok'=>true];}
  if($action==='register'){
   $name=text_field($b,'name',100);$recovery=bin2hex(random_bytes(20));
   $u=transaction(function()use($email,$password,$name,$recovery){if(one('SELECT id FROM ql_users WHERE email=?',[$email]))fail('accountExists',409);$id=uid();sql('INSERT INTO ql_users (id,email,name,password_hash,recovery_hash,created) VALUES (?,?,?,?,?,?)',[$id,$email,$name,password_hash($password,PASSWORD_DEFAULT),password_hash($recovery,PASSWORD_DEFAULT),now_ms()]);return one('SELECT * FROM ql_users WHERE id=?',[$id]);});sign_in($u);return ['ok'=>true,'recovery'=>$recovery];
  }
  $code=text_field($b,'recovery',100);$u=one('SELECT * FROM ql_users WHERE email=?',[$email]);if(!$u||!password_verify($code,$u['recovery_hash']??''))fail('credentials',401);
  $newCode=bin2hex(random_bytes(20));transaction(function()use($u,$password,$newCode){$changed=sql('UPDATE ql_users SET password_hash=?,recovery_hash=?,session_version=session_version+1 WHERE id=? AND recovery_hash=?',[password_hash($password,PASSWORD_DEFAULT),password_hash($newCode,PASSWORD_DEFAULT),$u['id'],$u['recovery_hash']])->rowCount();if(!$changed)fail('credentials',401);audit($u['id'],'password_recovered');});return ['ok'=>true,'recovery'=>$newCode];
 }
 if(in_array($action,['otpSend','otpCheck'],true)){
  $phone=text_field($b,'phone',20);if(!preg_match('/^\+91[6-9][0-9]{9}$/',$phone))fail('phone');
  rate('otp-ip',$ip,15,3600);rate('otp-phone',$phone,6,900);
  if($action==='otpSend'){rate('otp-cooldown',$phone,1,60);twilio('Verifications',['To'=>$phone,'Channel'=>'sms']);$_SESSION['otp_phone']=$phone;$_SESSION['otp_time']=now_ms();return ['ok'=>true];}
  if(($_SESSION['otp_phone']??'')!==$phone||now_ms()-($_SESSION['otp_time']??0)>600000)fail('otpExpired');
  $code=text_field($b,'code',10);if(!preg_match('/^\d{4,10}$/',$code))fail('invalid');$result=twilio('VerificationCheck',['To'=>$phone,'Code'=>$code]);if(($result['status']??'')!=='approved')fail('credentials',401);
  $signed=current_user();$u=transaction(function()use($phone,$signed){$u=one('SELECT * FROM ql_users WHERE phone=?',[$phone]);if($signed){if($u&&$u['id']!==$signed['id'])fail('accountExists',409);sql('UPDATE ql_users SET phone=? WHERE id=?',[$phone,$signed['id']]);return one('SELECT * FROM ql_users WHERE id=?',[$signed['id']]);}if($u)return $u;$id=uid();sql('INSERT INTO ql_users (id,phone,name,created) VALUES (?,?,?,?)',[$id,$phone,'Citizen',now_ms()]);return one('SELECT * FROM ql_users WHERE id=?',[$id]);});unset($_SESSION['otp_phone'],$_SESSION['otp_time']);sign_in($u);return ['ok'=>true];
 }
 if($action==='logout'){$_SESSION=[];session_regenerate_id(true);$_SESSION['csrf']=bin2hex(random_bytes(32));return ['ok'=>true];}
 return null;
}
function state(?array $u): array {
 $isAdmin=($u['role']??'')==='admin';$isOfficer=($u['role']??'')==='officer';
 $officeFilter='';$officeParams=[];
 if(!$isAdmin){$officeFilter=' WHERE verified=1';if($isOfficer){$officeFilter.=' OR id=?';$officeParams[]=$u['office_id'];}if($u){$officeFilter.=' OR id IN (SELECT office_id FROM ql_visits WHERE user_id=?)';$officeParams[]=$u['id'];}}
 $offices=all('SELECT * FROM ql_offices'.$officeFilter.' ORDER BY city',$officeParams);
 $services=all('SELECT * FROM ql_services');$counters=all('SELECT * FROM ql_counters');
 $ids=array_column($offices,'id');$services=array_values(array_filter($services,fn($s)=>in_array($s['office_id'],$ids,true)));$counters=array_values(array_filter($counters,fn($c)=>in_array($c['office_id'],$ids,true)));
 $active=all("SELECT * FROM ql_visits WHERE status IN ('booked','checked-in','called','serving') ORDER BY arrival,created");
 $estimates=[];$summaries=[];foreach($services as $s){$o=current(array_filter($offices,fn($o)=>$o['id']===$s['office_id']));$estimates+=estimate($o,$s,$active);$summaries[$s['id']]=['waiting'=>count(array_filter($active,fn($v)=>$v['service_id']===$s['id']&&in_array($v['status'],['checked-in','called','serving'],true))),'activeCounters'=>count(array_filter($counters,fn($c)=>$c['service_id']===$s['id']&&!$c['paused']&&!$o['paused']))];}
 $visits=$u?all('SELECT * FROM ql_visits WHERE user_id=? ORDER BY created DESC LIMIT 100',[$u['id']]):[];foreach($visits as &$v)$v['estimate']=$estimates[$v['id']]??null;unset($v);
 $desk=[];$metrics=[];$audit=[];$members=[];
 if($isAdmin||$isOfficer){$scope=$isAdmin?'':' AND office_id=?';$params=$isAdmin?[]:[$u['office_id']];
  $desk=all("SELECT * FROM ql_visits WHERE (status IN ('booked','checked-in','called','serving') OR updated>?)".$scope.' ORDER BY arrival,created LIMIT 500',array_merge([now_ms()-86400000],$params));foreach($desk as &$v)$v['estimate']=$estimates[$v['id']]??null;unset($v);
  $metrics=one("SELECT COUNT(*) AS visits,SUM(CASE WHEN status='completed' THEN 1 ELSE 0 END) AS completed,SUM(CASE WHEN status='missed' THEN 1 ELSE 0 END) AS missed,AVG(CASE WHEN started_at IS NOT NULL AND checked_at IS NOT NULL THEN (started_at-checked_at)/60000.0 END) AS wait_minutes,AVG(CASE WHEN started_at IS NOT NULL AND predicted_at IS NOT NULL THEN ABS(started_at-predicted_at)/60000.0 END) AS prediction_error FROM ql_visits WHERE created>?".$scope,array_merge([now_ms()-30*86400000],$params));
  $audit=all('SELECT * FROM ql_audit WHERE 1=1'.$scope.' ORDER BY created DESC LIMIT 50',$params);
 }
 if($isAdmin)$members=all('SELECT id,email,phone,name,role,office_id FROM ql_users ORDER BY created DESC LIMIT 200');
 return ['health'=>$isAdmin?['lastCron'=>one('SELECT last_cron FROM ql_settings WHERE id=1')['last_cron'],'smsQueue'=>all('SELECT sms_state,COUNT(*) AS total FROM ql_notifications GROUP BY sms_state')]:null,'user'=>public_user($u),'offices'=>$offices,'services'=>$services,'counters'=>$counters,'visits'=>$visits,'summaries'=>$summaries,'desk'=>$desk,'metrics'=>$metrics,'audit'=>$audit,'members'=>$members,'notifications'=>$u?all('SELECT * FROM ql_notifications WHERE user_id=? ORDER BY created DESC LIMIT 60',[$u['id']]):[],'chats'=>$u?all('SELECT id,title,messages,updated FROM ql_chats WHERE user_id=? ORDER BY updated DESC LIMIT 30',[$u['id']]):[],'updated'=>now_ms(),'csrf'=>$_SESSION['csrf'],'otpAvailable'=>!empty(config()['verify_service'])&&!empty(config()['twilio_sid'])&&!empty(config()['twilio_token']),'smsAvailable'=>!empty(config()['messaging_service'])&&!empty(config()['twilio_sid'])&&!empty(config()['twilio_token'])];
}
function mutate(array $u,string $action,array $b): array {
 $now=now_ms();
 if($action==='profile'){
  $name=text_field($b,'name',100);$travel=int_field($b,'travel',0,240);$lang=text_field($b,'lang',2);if(!in_array($lang,['gu','hi','en'],true))fail('invalid');$sms=!empty($b['sms'])&&$u['phone']?1:0;
  sql('UPDATE ql_users SET name=?,travel=?,lang=?,sms_opt_in=? WHERE id=?',[$name,$travel,$lang,$sms,$u['id']]);return ['ok'=>true];
 }
 if($action==='readNotifications'){sql('UPDATE ql_notifications SET read_at=? WHERE user_id=? AND read_at IS NULL',[$now,$u['id']]);return ['ok'=>true];}
 if(in_array($action,['book','reschedule','walkin'],true)){
  $id=text_field($b,'id',40);if(!preg_match('/^[a-zA-Z0-9-]{16,40}$/',$id))fail('invalid');
  $service=text_field($b,'service',40);[$o,$s]=office_service($service);
  if($action==='walkin')staff($u,$o['id']);
  $arrival=int_field($b,'arrival',0,PHP_INT_MAX);$old=one('SELECT * FROM ql_visits WHERE id=?',[$id]);
  if($action!=='reschedule'&&$old){if(($action==='book'&&$old['user_id']===$u['id']||$action==='walkin'&&$old['mode']==='walkin'&&$old['office_id']===$o['id'])&&$old['service_id']===$service&&$old['arrival']===$arrival)return ['ok'=>true,'id'=>$id];fail('conflict',409);}
  check_bookable($o,$s);
  if($action==='reschedule'){
   if(!$old||$old['user_id']!==$u['id'])fail('missing',404);
   if($old['status']==='booked'&&$old['arrival']===$arrival&&$old['service_id']===$service)return ['ok'=>true,'id'=>$id];
   if($old['status']!=='booked'||$old['arrival']-$now<60*MINUTE)fail('cutoff',409);
   [$oo,$os]=office_service($old['service_id']);if($os['kind']!==$s['kind'])fail('invalid');
  }
  if(!in_array($arrival,slots($o,date('Y-m-d',(int)($arrival/1000)),$action==='walkin'?0:15),true))fail('slot',409);
  $seat=null;for($i=0;$i<(int)$s['capacity'];$i++){if(!one('SELECT id FROM ql_visits WHERE slot_key=?',[$service.':'.$arrival.':'.$i])){$seat=$i;break;}}if($seat===null)fail('slot',409);
  $key=$service.':'.$arrival.':'.$seat;
  if($action==='reschedule'){
   sql('UPDATE ql_visits SET office_id=?,service_id=?,arrival=?,seat=?,slot_key=?,grace_delay=?,updated=? WHERE id=?',[$o['id'],$service,$arrival,$seat,$key,$o['delay_minutes'],$now,$id]);audit($u['id'],'rescheduled',$o['id'],$id,['from'=>$old['arrival'],'to'=>$arrival]);
  }else{
   $owner=$action==='walkin'?null:$u['id'];$name=$action==='walkin'?text_field($b,'name',100):$u['name'];$activeKey=$owner?$owner.':'.$s['kind']:null;
   if($activeKey&&one('SELECT id FROM ql_visits WHERE active_user_service=?',[$activeKey]))fail('duplicate',409);
   sql('INSERT INTO ql_visits (id,user_id,office_id,service_id,arrival,seat,token,status,mode,name,travel_minutes,grace_delay,reason,active_user_service,slot_key,checked_at,created,updated) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[$id,$owner,$o['id'],$service,$arrival,$seat,'Q-'.strtoupper(substr(uid(),0,10)),$owner?'booked':'checked-in',$owner?'scheduled':'walkin',$name,$owner?$u['travel']:0,$o['delay_minutes'],'',$activeKey,$key,$owner?null:$now,$now,$now]);audit($u['id'],$action,$o['id'],$id);
  }
  $v=one('SELECT * FROM ql_visits WHERE id=?',[$id]);notify_visit($v,'reserved',['તમારું ટોકન '.$v['token'].' બુક થયું.','आपका टोकन '.$v['token'].' बुक हुआ।','Your token '.$v['token'].' is reserved.'],'reserved:'.$id.':'.$arrival);return ['ok'=>true,'id'=>$id,'token'=>$v['token']];
 }
 if(in_array($action,['cancel','checkin','call','start','complete','missed','priority'],true)){
  $v=one('SELECT * FROM ql_visits WHERE id=?',[text_field($b,'id',40)]);if(!$v)fail('missing',404);[$o,$s]=office_service($v['service_id']);
  if(in_array($action,['cancel','checkin'],true)){if($v['user_id']!==$u['id'])staff($u,$v['office_id']);}else staff($u,$v['office_id']);
  if($action==='cancel'){if($v['status']==='cancelled')return ['ok'=>true];if(!in_array($v['status'],['booked','checked-in'],true))fail('inactive',409);release_visit($v,'cancelled',$u['id']);notify_visit($v,'cancelled',['મુલાકાત રદ થઈ.','मुलाकात रद्द हुई।','Your visit was cancelled.'],'cancel:'.$v['id']);return ['ok'=>true];}
  if($action==='checkin'){
   if($v['status']==='checked-in')return ['ok'=>true];if($v['status']!=='booked')fail('inactive',409);
   if($now<$v['arrival']-15*MINUTE||(!$o['paused']&&$now>$v['arrival']+(25+$v['grace_delay'])*MINUTE))fail('checkinWindow',409);
   $vs=all("SELECT * FROM ql_visits WHERE service_id=? AND status IN ('booked','checked-in','called','serving')",[$s['id']]);$est=estimate($o,$s,$vs)[$v['id']]??null;$prediction=$est&&$est['earliest']!==null?(int)(($est['earliest']+$est['latest'])/2):null;
   sql("UPDATE ql_visits SET status='checked-in',checked_at=?,predicted_at=?,updated=? WHERE id=?",[$now,$prediction,$now,$v['id']]);
  }elseif($action==='call'){
   if($o['paused'])fail('closed',409);if($v['status']!=='checked-in')fail('inactive',409);if($v['arrival']>$now)fail('notDue',409);
   $c=one('SELECT * FROM ql_counters WHERE id=?',[text_field($b,'counter',40)]);if(!$c||$c['service_id']!==$v['service_id']||$c['paused'])fail('counter',409);
   if(one('SELECT id FROM ql_visits WHERE busy_counter=?',[$c['id']]))fail('counter',409);
   $first=one("SELECT id FROM ql_visits WHERE service_id=? AND status='checked-in' AND arrival<=? ORDER BY priority DESC,arrival,created,id LIMIT 1",[$s['id'],$now]);if($first['id']!==$v['id'])fail('queueOrder',409);
   sql("UPDATE ql_visits SET status='called',counter_id=?,busy_counter=?,called_at=?,updated=? WHERE id=?",[$c['id'],$c['id'],$now,$now,$v['id']]);notify_visit($v,'called',['તમારો વારો આવ્યો. કાઉન્ટર '.$c['name'].' પર આવો.','आपकी बारी है। काउंटर '.$c['name'].' पर आएँ।','Your turn: please go to counter '.$c['name'].'.'],'called:'.$v['id']);
  }elseif($action==='start'){if($v['status']==='serving')return ['ok'=>true];if($v['status']!=='called')fail('inactive',409);sql("UPDATE ql_visits SET status='serving',started_at=?,updated=? WHERE id=?",[$now,$now,$v['id']]);}
  elseif($action==='complete'){if($v['status']==='completed')return ['ok'=>true];if($v['status']!=='serving')fail('inactive',409);sql("UPDATE ql_visits SET status='completed',completed_at=?,active_user_service=NULL,slot_key=NULL,busy_counter=NULL,updated=? WHERE id=?",[$now,$now,$v['id']]);notify_visit($v,'completed',['તમારી મુલાકાત પૂર્ણ થઈ.','आपकी मुलाकात पूरी हुई।','Your visit is complete.'],'completed:'.$v['id']);}
  elseif($action==='missed'){if($v['status']!=='called'||$now-$v['called_at']<10*MINUTE)fail('grace',409);release_visit($v,'missed',$u['id'],text_field($b,'reason',500));return ['ok'=>true];}
  elseif($action==='priority'){if(!$o['priority_policy']||!in_array($v['status'],['booked','checked-in'],true))fail('priorityPolicy',409);$reason=text_field($b,'reason',500);sql('UPDATE ql_visits SET priority=?,reason=?,updated=? WHERE id=?',[!empty($b['priority'])?1:0,$reason,$now,$v['id']]);audit($u['id'],'priority',$v['office_id'],$v['id'],['reason'=>$reason,'priority'=>!empty($b['priority'])]);return ['ok'=>true];}
  audit($u['id'],$action,$v['office_id'],$v['id']);return ['ok'=>true];
 }
 if($action==='counterPause'){
  $c=one('SELECT * FROM ql_counters WHERE id=?',[text_field($b,'id',40)]);if(!$c)fail('missing',404);staff($u,$c['office_id']);$reason=text_field($b,'reason',500);sql('UPDATE ql_counters SET paused=? WHERE id=?',[!empty($b['paused'])?1:0,$c['id']]);audit($u['id'],$b['paused']?'counter_paused':'counter_resumed',$c['office_id'],null,['counter'=>$c['name'],'reason'=>$reason]);return ['ok'=>true];
 }
 if($action==='officeStatus'){
  $id=text_field($b,'id',40);staff($u,$id);$o=one('SELECT * FROM ql_offices WHERE id=?',[$id]);if(!$o)fail('missing',404);$delay=int_field($b,'delay',0,240);$notice=words($b,'notice');$paused=!empty($b['paused'])?1:0;
  sql('UPDATE ql_offices SET paused=?,delay_minutes=?,notice=?,updated=? WHERE id=?',[$paused,$delay,$notice,$now,$id]);
  // Once an office extends the arrival grace period, retain it for existing bookings.
  foreach(all("SELECT * FROM ql_visits WHERE office_id=? AND status IN ('booked','checked-in')",[$id]) as $v){
   $grace=max((int)$v['grace_delay'],$delay,($o['paused']&&!$paused)?(int)ceil(($now-$v['arrival'])/MINUTE):0);
   sql('UPDATE ql_visits SET grace_delay=? WHERE id=?',[$grace,$v['id']]);
   notify_visit($v,'officeUpdate',json_decode($notice,true),'office:'.$id.':'.$now.':'.$v['id']);
  }
  audit($u['id'],'office_status',$id,null,['paused'=>$paused,'delay'=>$delay,'notice'=>json_decode($notice,true)]);return ['ok'=>true];
 }
 if($action==='saveOffice'){
  admin($u);$id=text_field($b,'id',40,false)?:uid();$name=words($b,'name');$address=words($b,'address');$city=text_field($b,'city',100);$url=url_field(text_field($b,'url',1000,false));$opens=int_field($b,'opens',0,1425);$closes=int_field($b,'closes',15,1440);if($opens>=$closes||$opens%15||$closes%15)fail('invalid');
  $days=text_field($b,'weekdays',20);if(!preg_match('/^[0-6](,[0-6])*$/',$days))fail('invalid');$closures=$b['closures']??[];if(!is_array($closures)||count($closures)>100)fail('invalid');foreach($closures as $d)if(!is_string($d)||!preg_match('/^\d{4}-\d{2}-\d{2}$/',$d))fail('invalid');
  $policy=text_field($b,'priorityPolicy',1000,false);$verified=!empty($b['verified'])?1:0;if($verified&&!$url)fail('sourceRequired');
  if(one('SELECT id FROM ql_offices WHERE id=?',[$id]))sql('UPDATE ql_offices SET name=?,address=?,city=?,official_url=?,opens=?,closes=?,weekdays=?,closures=?,priority_policy=?,verified=?,updated=? WHERE id=?',[$name,$address,$city,$url,$opens,$closes,$days,json_encode($closures),$policy,$verified,$now,$id]);
  else sql('INSERT INTO ql_offices (id,name,address,city,official_url,opens,closes,weekdays,closures,priority_policy,verified,notice,updated) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)',[$id,$name,$address,$city,$url,$opens,$closes,$days,json_encode($closures),$policy,$verified,'["","",""]',$now]);
  audit($u['id'],'office_saved',$id);return ['ok'=>true,'id'=>$id];
 }
 if($action==='saveService'){
  admin($u);$office=text_field($b,'office',40);if(!one('SELECT id FROM ql_offices WHERE id=?',[$office]))fail('missing',404);$kind=text_field($b,'kind',40);if(!in_array($kind,['certificate','ayushman','scholarship','farmer','housing'],true))fail('invalid');$duration=int_field($b,'duration',1,120);$capacity=int_field($b,'capacity',1,10);
  $checklist=$b['checklist']??[];if(!is_array($checklist)||count($checklist)>20)fail('invalid');foreach($checklist as $item)words(['item'=>$item],'item');$source=url_field(text_field($b,'source',1000,false));$verified=!empty($b['verified']);if($verified&&(!$source||!$checklist))fail('sourceRequired');
  $existing=one('SELECT id FROM ql_services WHERE office_id=? AND kind=?',[$office,$kind]);$id=$existing['id']??uid();
  if($existing)sql('UPDATE ql_services SET duration=?,capacity=?,checklist=?,source_url=?,verified_at=?,enabled=? WHERE id=?',[$duration,$capacity,json_encode($checklist,JSON_UNESCAPED_UNICODE),$source,$verified?$now:null,!empty($b['enabled'])?1:0,$id]);
  else sql('INSERT INTO ql_services (id,office_id,kind,duration,capacity,checklist,source_url,verified_at,enabled) VALUES (?,?,?,?,?,?,?,?,?)',[$id,$office,$kind,$duration,$capacity,json_encode($checklist,JSON_UNESCAPED_UNICODE),$source,$verified?$now:null,!empty($b['enabled'])?1:0]);audit($u['id'],'service_saved',$office,null,['kind'=>$kind]);return ['ok'=>true,'id'=>$id];
 }
 if($action==='addCounter'){admin($u);[$o,$s]=office_service(text_field($b,'service',40));$name=text_field($b,'name',80);if(count(all('SELECT id FROM ql_counters WHERE office_id=?',[$o['id']]))>=50)fail('limit');sql('INSERT INTO ql_counters (id,office_id,service_id,name) VALUES (?,?,?,?)',[uid(),$o['id'],$s['id'],$name]);audit($u['id'],'counter_added',$o['id'],null,['name'=>$name]);return ['ok'=>true];}
 if($action==='setRole'){
  admin($u);$id=text_field($b,'id',40);$role=text_field($b,'role',16);if(!in_array($role,['citizen','officer','admin'],true)||$id===$u['id'])fail('invalid');$target=one('SELECT id FROM ql_users WHERE id=?',[$id]);if(!$target)fail('missing',404);$office=$role==='officer'?text_field($b,'office',40):null;if($office&&!one('SELECT id FROM ql_offices WHERE id=?',[$office]))fail('missing',404);
  sql('UPDATE ql_users SET role=?,office_id=?,session_version=session_version+1 WHERE id=?',[$role,$office,$id]);audit($u['id'],'role_changed',$office,null,['user'=>$id,'role'=>$role]);return ['ok'=>true];
 }
 if($action==='chat'){
  $message=text_field($b,'message',2000);$lang=in_array($b['lang']??'', ['gu','hi','en'],true)?$b['lang']:'gu';$id=text_field($b,'id',40,false);$old=$id?one('SELECT * FROM ql_chats WHERE id=? AND user_id=?',[$id,$u['id']]):null;if($id&&!$old)fail('missing',404);$messages=$old?json_decode($old['messages'],true):[];if(count($messages)>=100)fail('chatLimit');
  $q=mb_strtolower($message);$reply=lang_text(['હું બિલ્ટ-ઇન સહાયક છું. ટોકન, સમય બદલવા, દસ્તાવેજો અથવા યોજનાઓ વિશે પૂછો. AI સેવા જોડાયેલી નથી.','मैं बिल्ट-इन सहायक हूँ। टोकन, समय बदलने, दस्तावेज़ या योजनाएँ पूछें। AI सेवा जुड़ी नहीं है।','I’m the built-in assistant. Ask about your token, rescheduling, documents or schemes. An AI service is not connected.'],$lang);
  if(preg_match('/wait|queue|token|રાહ|ટોકન|कतार|टोकन/u',$q)){
   $v=one("SELECT * FROM ql_visits WHERE user_id=? AND status IN ('booked','checked-in','called','serving') ORDER BY arrival LIMIT 1",[$u['id']]);
   if($v){[$o,$s]=office_service($v['service_id']);$e=estimate($o,$s,all("SELECT * FROM ql_visits WHERE service_id=? AND status IN ('booked','checked-in','called','serving')",[$s['id']]))[$v['id']]??null;$time=date('d M, h:i A',(int)($v['arrival']/1000)).' IST';$range=$e&&$e['earliest']?date('h:i A',(int)($e['earliest']/1000)).'–'.date('h:i A',(int)($e['latest']/1000)).' IST':'—';$reply=lang_text(["ટોકન {$v['token']}. આગમન: $time. સેવા અંદાજ: $range. આગમન સમય બદલાયો નથી.","टोकन {$v['token']}। आगमन: $time। सेवा अनुमान: $range। आगमन समय नहीं बदला।","Token {$v['token']}. Reserved arrival: $time. Estimated service: $range. Your arrival time is unchanged."],$lang);}else $reply=lang_text(['તમારી સક્રિય મુલાકાત નથી. મુલાકાત ગોઠવો પેજ પરથી બુક કરો.','आपकी सक्रिय मुलाकात नहीं है। मुलाकात तय करें पेज से बुक करें।','You have no active visit. Book from Plan Visit.'],$lang);
  }elseif(preg_match('/resched|earlier|બદલ|વહેલ|बदल|पहले/u',$q))$reply=lang_text(['આગમનના 60 મિનિટ પહેલાં સમય બદલી શકો છો. નવો સમય ઉપલબ્ધ હોય ત્યારે જ જૂનો છોડાય છે. વહેલો સમય તમારી સંમતિ વિના લાગુ નહીં થાય.','आगमन से 60 मिनट पहले समय बदल सकते हैं। नया समय मिलने पर ही पुराना छूटेगा। आपकी अनुमति बिना समय पहले नहीं होगा।','Reschedule at least 60 minutes before arrival. The old slot is released only when the new slot is secured. Earlier times always need your confirmation.'],$lang);
  elseif(preg_match('/document|દસ્તાવેજ|दस्तावेज/u',$q))$reply=lang_text(['તમારા ટોકન પર સેવા પ્રમાણે ચકાસેલી દસ્તાવેજ યાદી જુઓ. યાદી ચકાસેલી ન હોય તો મુલાકાત પહેલાં કચેરીનો સંપર્ક કરો.','टोकन पर सेवा की सत्यापित दस्तावेज़ सूची देखें। सत्यापित न हो तो कार्यालय से संपर्क करें।','Open your token for the service-specific checklist and source. If the office hasn’t verified it, contact the office before travelling.'],$lang);
  elseif(preg_match('/scheme|yojana|યોજના|योजना/u',$q))$reply=lang_text(['યોજનાઓ પેજ પર 20 યોજનાઓ છે. પાત્રતા અને દસ્તાવેજો સત્તાવાર પોર્ટલ પર તપાસો. હું અરજી મંજૂર કરતો નથી.','योजनाएँ पेज पर 20 योजनाएँ हैं। पात्रता और दस्तावेज़ आधिकारिक पोर्टल से जाँचें। मैं आवेदन मंज़ूर नहीं करता।','The Schemes page contains 20 catalogue entries. Confirm eligibility and documents with the official portal. I cannot approve applications.'],$lang);
  $messages[]=['role'=>'user','text'=>$message];$messages[]=['role'=>'assistant','text'=>$reply];
  if(empty($b['temporary'])){$id=$id?:uid();if($old)sql('UPDATE ql_chats SET messages=?,updated=? WHERE id=? AND user_id=?',[json_encode($messages,JSON_UNESCAPED_UNICODE),$now,$id,$u['id']]);else sql('INSERT INTO ql_chats (id,user_id,title,messages,updated) VALUES (?,?,?,?,?)',[$id,$u['id'],mb_substr($message,0,60),json_encode($messages,JSON_UNESCAPED_UNICODE),$now]);}else $id=null;
  return ['ok'=>true,'id'=>$id,'messages'=>$messages];
 }
 if($action==='deleteChat'){sql('DELETE FROM ql_chats WHERE id=? AND user_id=?',[text_field($b,'id',40),$u['id']]);return ['ok'=>true];}
 if($action==='renameChat'){sql('UPDATE ql_chats SET title=?,updated=? WHERE id=? AND user_id=?',[text_field($b,'title',100),$now,text_field($b,'id',40),$u['id']]);return ['ok'=>true];}
 fail('invalid');
}
