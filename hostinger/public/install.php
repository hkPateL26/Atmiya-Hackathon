<?php
declare(strict_types=1);
define('QUEUELESS',true);require __DIR__.'/_private/core.php';
header('Cache-Control: no-store');header('X-Frame-Options: DENY');header('X-Content-Type-Options: nosniff');
$message='';$done=false;$recovery='';
try {
 session_init();
 if($_SERVER['REQUEST_METHOD']==='POST'){
  $key=config()['setup_key']??'';
  if(strlen($key)<32||str_contains($key,'REPLACE_')||!hash_equals($key,(string)($_POST['setup_key']??'')))fail('The setup key is incorrect.',403);
  if(!hash_equals($_SESSION['csrf'],(string)($_POST['csrf']??'')))fail('Refresh the page and try again.',403);
  $email=strtolower(trim((string)($_POST['email']??'')));$name=trim((string)($_POST['name']??''));$pass=password_field($_POST);
  if(!filter_var($email,FILTER_VALIDATE_EMAIL)||strlen($email)>190||!$name||mb_strlen($name)>100)fail('Use a valid email, name and a password of 12–128 characters.');
  // Installation only: schema creation is never performed during normal requests.
  foreach(explode(';',file_get_contents(__DIR__.'/_private/schema.sql')) as $statement)if(trim($statement))db()->exec($statement);
  $recovery=bin2hex(random_bytes(20));
  transaction(function()use($email,$name,$pass,$recovery){if(one('SELECT installed FROM ql_settings WHERE id=1')['installed'])fail('Already installed. Sign in on the home page.',409);$id=uid();sql('INSERT INTO ql_users (id,email,name,password_hash,recovery_hash,role,created) VALUES (?,?,?,?,?,?,?)',[$id,$email,$name,hash_password($pass),password_hash($recovery,PASSWORD_DEFAULT),'admin',now_ms()]);sql('UPDATE ql_settings SET installed=1 WHERE id=1');audit($id,'installed');});
  $done=true;$message='Installed. Sign in, add a verified office, enable its services and add a counter. Delete install.php after setup.';
 }
}catch(ApiError $e){$message=$e->error==='passwordLength'?'Use a password of 12–128 characters.':($e->error==='setupRequired'?'First copy _private/config.example.php to _private/config.php and fill in your MySQL settings, HTTPS origin and a random setup key.':$e->error);}
catch(Throwable $e){$message='Could not connect or create the database tables. Check the MySQL credentials and PHP extensions in Hostinger. Your password is not shown in this error.';}
function esc(string $s): string {return htmlspecialchars($s,ENT_QUOTES,'UTF-8');}
?><!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Set up QueueLess</title>
<style>body{font:16px/1.6 system-ui;background:#f2f6f6;color:#172f31;margin:0;padding:30px}main{max-width:480px;margin:30px auto;background:white;padding:32px;border-radius:20px;border:1px solid #dae5e4}label{display:block;margin:18px 0 5px}input,button{box-sizing:border-box;width:100%;padding:13px;font:inherit;border:1px solid #b8cbca;border-radius:8px}button{background:#075d55;color:white;margin-top:24px;cursor:pointer}p{padding:12px;background:#eef6f4}small{color:#53666a}</style><main><h1>Set up QueueLess</h1><small>One-time administrator setup · PHP 8.2+ / MySQL</small>
<?php if($message):?><p role="status"><?=esc($message)?></p><?php endif;?>
<?php if($done):?><p>Save this recovery code in your password manager. It can reset your administrator password and will not be shown again.</p><code style="overflow-wrap:anywhere;display:block;padding:16px;background:#eef6f4"><?=esc($recovery)?></code><?php endif;?>
<?php if(!$done):?><form method="post"><input type="hidden" name="csrf" value="<?=esc($_SESSION['csrf']??'')?>"><label for="key">Setup key from your server configuration</label><input id="key" type="password" name="setup_key" required autocomplete="off"><label for="name">Administrator name</label><input id="name" name="name" maxlength="100" required autocomplete="name"><label for="email">Administrator email</label><input id="email" type="email" name="email" required autocomplete="email"><label for="password">Password (at least 12 characters)</label><input id="password" type="password" name="password" minlength="12" maxlength="128" required autocomplete="new-password"><button>Create administrator</button></form><?php endif;?><p><a href="./">Open QueueLess</a></p></main></html>
