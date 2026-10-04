<?php
declare(strict_types=1);
define('QUEUELESS',true);
require __DIR__.'/_private/core.php';
require __DIR__.'/_private/actions.php';
header('Content-Type: application/json; charset=utf-8');header('Cache-Control: no-store');header('X-Content-Type-Options: nosniff');
try {
 session_init();$installed=one('SELECT installed FROM ql_settings WHERE id=1');if(!$installed||!$installed['installed'])fail('setupRequired',503);
 if($_SERVER['REQUEST_METHOD']==='GET'){
  if(($_GET['action']??'')==='slots'){
   [$o,$s]=office_service((string)($_GET['service']??''));if(!$o['verified'])fail('missing',404);
   $walkin=($_GET['walkin']??'')==='1';if($walkin)staff(need_user(),$o['id']);check_bookable($o,$s);
   $result=transaction(function()use($o,$s,$walkin){maintenance();$out=[];foreach(slots($o,(string)($_GET['day']??''),$walkin?0:15) as $time){$used=(int)one('SELECT COUNT(*) AS n FROM ql_visits WHERE service_id=? AND arrival=? AND slot_key IS NOT NULL',[$s['id'],$time])['n'];$out[]=['arrival'=>$time,'remaining'=>max(0,(int)$s['capacity']-$used)];}return ['slots'=>$out,'csrf'=>$_SESSION['csrf']];});
  }else $result=transaction(function(){maintenance();return state(current_user());});
 }elseif($_SERVER['REQUEST_METHOD']==='POST'){
  $b=check_post();$action=text_field($b,'action',40);$result=auth_action($action,$b);
  if($result===null){$u=need_user();rate('write',$u['id'],90,60);$result=transaction(function()use($action,$b){$u=need_user();maintenance();return mutate($u,$action,$b);});}
  $result['csrf']=$_SESSION['csrf']??'';
 }else fail('method',405);
 echo json_encode($result,JSON_UNESCAPED_UNICODE|JSON_THROW_ON_ERROR);
}catch(ApiError $e){http_response_code($e->status);echo json_encode(['error'=>$e->error]);}
catch(Throwable $e){error_log('QueueLess request failed: '.get_class($e).' '.$e->getCode());http_response_code(503);echo json_encode(['error'=>'unavailable']);}
