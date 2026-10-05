<?php
declare(strict_types=1);
define('QUEUELESS',true);
require __DIR__.'/_private/core.php';require __DIR__.'/_private/actions.php';require __DIR__.'/_private/assistant.php';
header('Content-Type: application/json; charset=utf-8');header('Cache-Control: no-store');header('X-Content-Type-Options: nosniff');
try{
 session_init();
 if($_SERVER['REQUEST_METHOD']==='GET'){
  echo json_encode(['ai'=>ai_ready(),'transcription'=>ai_ready(),'cloudVoice'=>!empty(config()['google_service_account_file']),'authenticity'=>false,'sources'=>array_map(fn($s)=>array_intersect_key($s,array_flip(['id','title','url','kind'])),official_sources())]);exit;
 }
 if($_SERVER['REQUEST_METHOD']!=='POST')fail('method',405);
 $u=need_user();$csrf=$_SESSION['csrf'];$multipart=str_starts_with($_SERVER['CONTENT_TYPE']??'','multipart/form-data');
 if($multipart){if((int)($_SERVER['CONTENT_LENGTH']??0)>5*1024*1024)fail('fileSize');if(!hash_equals($csrf,$_SERVER['HTTP_X_CSRF_TOKEN']??''))fail('csrf',403);if(($_SERVER['HTTP_ORIGIN']??'')!==rtrim(config()['origin'],'/'))fail('forbidden',403);$b=$_POST;}else $b=check_post();
 $action=text_field($b,'action',30);rate('assistant-request',$u['id'],20,60);
 session_write_close(); // Slow providers must not hold PHP session or queue database locks.
 $result=match($action){'chat'=>ai_chat($u,$b),'document'=>document_check($u,$b),'transcribe'=>transcribe_audio($u,$b),'speak'=>synthesize_voice($u,$b),default=>fail('invalid')};
 ai_current($u);echo json_encode($result,JSON_UNESCAPED_UNICODE|JSON_THROW_ON_ERROR);
}catch(ApiError $e){http_response_code($e->status);echo json_encode(['error'=>$e->error]);}
catch(Throwable $e){error_log('QueueLess assistant failed: '.get_class($e));http_response_code(503);echo json_encode(['error'=>'aiProvider']);}
