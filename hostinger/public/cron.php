<?php
declare(strict_types=1);
define('QUEUELESS',true);require __DIR__.'/_private/core.php';
try {
 if(PHP_SAPI!=='cli'){
  $key=config()['cron_key']??'';
  if(empty($_SERVER['HTTPS'])||$_SERVER['HTTPS']==='off'||strlen($key)<32||str_contains($key,'REPLACE_')||!hash_equals($key,$_SERVER['HTTP_X_CRON_KEY']??''))fail('forbidden',403);
 }
 transaction(function(){maintenance();sql('UPDATE ql_settings SET last_cron=? WHERE id=1',[now_ms()]);});
 $sent=0;$failed=0;
 for($i=0;$i<20;$i++){
  $n=transaction(function(){
   $n=one("SELECT n.*,u.phone,u.lang,u.sms_opt_in FROM ql_notifications n JOIN ql_users u ON u.id=n.user_id WHERE sms_state='pending' ORDER BY n.created LIMIT 1");if(!$n)return null;
   if(!$n['sms_opt_in']||!$n['phone']||!sms_relevant($n,one('SELECT * FROM ql_visits WHERE id=?',[$n['visit_id']]))){sql("UPDATE ql_notifications SET sms_state='off' WHERE id=?",[$n['id']]);return ['skip'=>true];}
   // Claim before the network call; uncertain provider responses are never retried automatically.
   sql("UPDATE ql_notifications SET sms_state='sending' WHERE id=?",[$n['id']]);return $n;
  });
  if(!$n)break;if(isset($n['skip']))continue;
  try {twilio('', ['To'=>$n['phone'],'MessagingServiceSid'=>config()['messaging_service'],'Body'=>'QueueLess: '.lang_text(json_decode($n['message'],true),$n['lang'])],false);sql("UPDATE ql_notifications SET sms_state='accepted' WHERE id=?",[$n['id']]);$sent++;}
  catch(Throwable $e){sql("UPDATE ql_notifications SET sms_state='review' WHERE id=?",[$n['id']]);$failed++;}
 }
 header('Content-Type: application/json');echo json_encode(['ok'=>true,'accepted'=>$sent,'needsReview'=>$failed]);
}catch(Throwable $e){http_response_code($e instanceof ApiError?$e->status:503);echo json_encode(['error'=>'Cron unavailable. Check server configuration.']);}
