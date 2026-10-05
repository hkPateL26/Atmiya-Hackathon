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
  // Assistant: one Gemini key enables AI chat, audio transcription and preliminary document checks.
  'gemini_key' => '',
  'gemini_model' => 'gemini-3.8-flash',
  'ai_daily_limit' => 200, // Total model/speech calls per day, not a currency spending cap.
  'ai_user_daily_limit' => 30,
  'source_cache_seconds' => 3600,
  // Optional Cloud Text-to-Speech: absolute path to the service-account JSON, outside public_html.
  'google_service_account_file' => '',
  'google_voices' => ['gu'=>'','hi'=>'','en'=>''],
  // Optional government_sources array: [{id,title,url,kind}]. PHP associative arrays, not JSON.
  // Kinds: certificate, ayushman, scholarship, farmer, housing. Only HTTPS *.gov.in / *.nic.in URLs.
  // Use specific official requirement pages or PDFs, not JavaScript-only portal homepages.
];
