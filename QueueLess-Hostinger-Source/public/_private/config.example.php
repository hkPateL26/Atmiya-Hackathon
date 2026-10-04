<?php
// Copy to config.php. Never commit your real config or send its contents in chat.
if (!defined('QUEUELESS')) { http_response_code(404); exit; }
return [
  'dsn' => 'mysql:host=localhost;dbname=YOUR_DATABASE;charset=utf8mb4',
  'db_user' => 'YOUR_DATABASE_USER',
  'db_password' => 'YOUR_DATABASE_PASSWORD',
  'origin' => 'https://YOUR-SUBDOMAIN.YOUR-DOMAIN',
  'local_development' => false,
  // Generate separate random secrets, at least 32 characters each.
  'setup_key' => 'REPLACE_WITH_A_RANDOM_SETUP_SECRET',
  'cron_key' => 'REPLACE_WITH_A_DIFFERENT_RANDOM_SECRET',
  // Optional Twilio Verify + Messaging Service. Leave blank until configured.
  'twilio_sid' => '',
  'twilio_token' => '',
  'verify_service' => '',
  'messaging_service' => '',
];
