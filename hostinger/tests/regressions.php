<?php
declare(strict_types=1);
// Run ONLY against an installed, disposable localhost database with QA fixture accounts.
define('QUEUELESS',true);
require __DIR__.'/../public/_private/core.php';
require __DIR__.'/../public/_private/actions.php';
if(PHP_SAPI!=='cli'||!(config()['local_development']??false)||!str_contains(config()['dsn'],'host=127.0.0.1;')||!preg_match('/dbname=queueless_test_[a-z0-9_]+;/i',config()['dsn']))throw new RuntimeException('A local test database is required.');
$count=0;
function must(bool $ok,string $name):void{global $count;if(!$ok)throw new RuntimeException($name);$count++;echo "PASS $name\n";}
function rejects(callable $fn,string $error):void{try{$fn();}catch(ApiError $e){must($e->error===$error,'Rejected: '.$error);return;}throw new RuntimeException('Expected '.$error);}
try{
 $p='  exact password spaces  ';$hash=hash_password(password_field(['password'=>$p]));
 must(verify_password($p,$hash)&&!verify_password(trim($p),$hash),'Password spaces are preserved');
 $p=str_repeat('a',80).'one';$hash=hash_password($p);
 must(verify_password($p,$hash)&&!verify_password(str_repeat('a',80).'two',$hash),'Passwords differing after byte 72 remain distinct');
 $p=str_repeat('ગુજરાત',8);must(verify_password($p,hash_password(password_field(['password'=>$p]))),'Unicode passwords round-trip');
 $legacy=password_hash('existing password',PASSWORD_BCRYPT);must(verify_password('existing password',$legacy),'Existing accounts remain compatible');
 rejects(fn()=>password_field(['password'=>str_repeat('x',129)]),'passwordLength');
 must(!valid_day('2026-02-30')&&valid_day('2028-02-29'),'Calendar dates are validated');
 $now=now_ms();$v=['arrival'=>$now+MINUTE,'status'=>'booked'];$n=['created'=>$now,'kind'=>'leave','dedup'=>'leave:id:'.$v['arrival']];
 must(sms_relevant($n,$v,$now),'Current reminder remains eligible');
 must(!sms_relevant($n,[...$v,'arrival'=>$now+2*MINUTE],$now),'Rescheduled reminder is skipped');
 must(!sms_relevant($n,[...$v,'status'=>'cancelled'],$now),'Cancelled visit reminder is skipped');
 must(!sms_relevant([...$n,'kind'=>'called'],[...$v,'status'=>'completed'],$now),'Completed visit is not called by stale SMS');
 must(!sms_relevant([...$n,'created'=>$now-25*3600000],$v,$now),'Old notifications expire before SMS delivery');
 lock_db();
 $u=one('SELECT * FROM ql_users WHERE email=?',['citizen-a@queueless.test']);$admin=one("SELECT * FROM ql_users WHERE role='admin' LIMIT 1");
 if(!$u||!$admin)throw new RuntimeException('Run integration fixtures first');
 $s=one("SELECT s.* FROM ql_services s JOIN ql_counters c ON c.service_id=s.id WHERE s.kind='certificate' LIMIT 1");
 [$o,$s]=office_service($s['id']);sql('UPDATE ql_offices SET paused=0,verified=1 WHERE id=?',[$o['id']]);sql('UPDATE ql_counters SET paused=0 WHERE service_id=?',[$s['id']]);sql('UPDATE ql_services SET capacity=1,enabled=1 WHERE id=?',[$s['id']]);
 $times=slots($o,date('Y-m-d',strtotime('+3 days')));$arrival=$times[4];
 $id=uid();sql("INSERT INTO ql_visits (id,user_id,office_id,service_id,arrival,seat,token,status,mode,name,travel_minutes,reason,slot_key,created,updated) VALUES (?,?,?,?,?,2,?,'booked','test','Capacity fixture',0,'',?,?,?)",[$id,$u['id'],$o['id'],$s['id'],$arrival,'QA-'.substr($id,0,20),$s['id'].':'.$arrival.':2',$now-10000,$now]);
 rejects(fn()=>mutate($admin,'book',['id'=>uid(),'service'=>$s['id'],'arrival'=>$arrival]),'slot');
 for($i=0;$i<105;$i++){$history=uid();sql("INSERT INTO ql_visits (id,user_id,office_id,service_id,arrival,seat,token,status,mode,name,travel_minutes,reason,created,updated) VALUES (?,?,?,?,?,0,?,'completed','test','History fixture',0,'',?,?)",[$history,$u['id'],$o['id'],$s['id'],$arrival,'QA-'.substr($history,0,20),$now+$i,$now]);}
 $_SESSION=['csrf'=>'test-only'];$snapshot=state($u);must(in_array($id,array_column($snapshot['visits'],'id'),true),'Active booking survives more than 100 newer history records');
 for($i=0;$i<505;$i++){$future=uid();sql("INSERT INTO ql_visits (id,user_id,office_id,service_id,arrival,seat,token,status,mode,name,travel_minutes,reason,created,updated) VALUES (?,NULL,?,?,?,0,?,'booked','test','Desk fixture',0,'',?,?)",[$future,$o['id'],$s['id'],$arrival+$i,'QA-'.substr($future,0,20),$now,$now]);}
 $snapshot=state($admin);must(count($snapshot['desk'])>500,'Officer dashboard does not silently truncate active tokens');
 for($i=0;$i<205;$i++)sql("INSERT INTO ql_users (id,name,email,created) VALUES (?,?,?,?)",[uid(),'Directory fixture','directory-'.$i.'@queueless.test',$now+$i]);
 must(search_members($admin,'citizen-a@queueless.test')['total']===1,'Admin search finds older accounts beyond 200 recent registrations');
 $page=search_members($admin,'Directory fixture',1);must(count($page['members'])===25&&$page['total']===205,'Account directory paginates matching users');
 must(search_members($admin,'directory_%')['total']===0,'Account search treats wildcard characters literally');
 rejects(fn()=>search_members($u,''),'forbidden');
 $visit=one('SELECT * FROM ql_visits WHERE id=?',[$id]);$dedup='qa-office:'.uid();
 notify_visit($visit,'officeUpdate',['Old','Old','Old'],$dedup);
 sql("UPDATE ql_notifications SET sms_state='pending' WHERE dedup=?",[$dedup]);
 notify_visit($visit,'officeUpdate',['New','New','New'],$dedup.':new');
 must(one('SELECT sms_state FROM ql_notifications WHERE dedup=?',[$dedup])['sms_state']==='off','New office notice supersedes its queued predecessor');
 db()->rollBack();echo "$count regression checks passed; database fixtures rolled back.\n";
}catch(Throwable $e){if(db()->inTransaction())db()->rollBack();fwrite(STDERR,$e->getMessage()."\n");exit(1);}
