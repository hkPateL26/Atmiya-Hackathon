# QueueLess assistant — activation and handoff

Version 1.2 adds multilingual AI chat, official-source retrieval, voice input/output and preliminary document checks to the Hostinger PHP/MySQL edition. The application and database stay on Hostinger. AI processing uses Google APIs; browser speech may use the browser vendor's service. No additional npm packages or database migration are required.

## What works without new accounts

Email/password login, booking, officer actions, saved/temporary chat, local token guidance and language switching work without an AI provider. Matching browser voices and browser speech recognition can be used where supported, with the user's permission. Gujarati speech is not guaranteed on every device. Unavailable capabilities show a clear message; they do not simulate successful verification.

## Credentials the hosting person needs

| Feature | Setup |
|---|---|
| AI chat, language detection, recorded speech transcription, document checks | One Gemini API key in the private PHP config |
| Consistent cloud speech for Gujarati, Hindi and English | Google Cloud Text-to-Speech enabled, billing/quota configured, and one service-account credential file |
| Public government pages/PDFs | No citizen government login; server outbound HTTPS and readable approved sources |
| Official document authenticity | Not connected. Requires a separately approved issuer/DigiLocker integration; AI inspection cannot replace it |

The Google services can be managed with the same Google account/project where supported by the account setup. Citizens do not create Google API accounts. Do not assume provider usage is free: check the selected model's current quota, pricing and data-use terms. For a test, use synthetic documents without real identifiers.

## 1. Hostinger prerequisites

Follow README.md for PHP/MySQL installation. Enable `pdo_mysql`, `mbstring`, `curl`, `fileinfo` and `openssl`. Use HTTPS. Set `upload_max_filesize` to at least `4M`, `post_max_size` to at least `5M`, and `max_execution_time` to at least `120`; hosting-level timeouts can still be lower. Allow outbound HTTPS to Google API/OAuth endpoints and configured government sites.

Upload the new `.htaccess`: it allows microphone use by this site (`microphone=(self)`) but still requires the visitor's browser permission. It also protects `_private/`. Never disable TLS verification to make a source work.

## 2. Connect Gemini privately

Create a key through [Google AI Studio](https://aistudio.google.com/apikey) using [Google's API-key instructions](https://ai.google.dev/gemini-api/docs/api-key). Set appropriate key restrictions, usage limits and billing alerts in the Google project. Put the key in the existing server file `_private/config.php`; never in frontend code, a GitHub commit or chat:

```php
'gemini_key' => 'YOUR_PRIVATE_GEMINI_KEY',
'gemini_model' => 'gemini-3.8-flash',
'ai_daily_limit' => 200,
'ai_user_daily_limit' => 30,
'source_cache_seconds' => 3600,
```

The default is listed in Google's [current model catalogue](https://ai.google.dev/gemini-api/docs/models). If your project cannot access it, select an available model supporting text, image/PDF, audio input and structured JSON output. The setting is configurable; availability may change.

The app limits model/speech calls to six per minute per account, 30 per day per account and 200 per day across the site by default. These are request limits, **not a currency spending cap**. Failed attempts may consume an allowance. A spoken interaction can use three provider calls: transcription, answer generation and speech playback. Use provider quotas and monitoring as well.

## 3. Connect cloud voice

Follow Google's [Text-to-Speech setup](https://docs.cloud.google.com/text-to-speech/docs/before-you-begin) and [service-account authentication](https://developers.google.com/identity/protocols/oauth2/service-account) instructions. Enable the Text-to-Speech API in the credential's project, configure billing, and grant only the access needed by that API rather than project Owner/Editor access. Your organization may restrict downloadable keys; follow its credential policy.

Store the service-account JSON **outside every public web directory and outside the repository**. Example path only:

```php
'google_service_account_file' => '/home/YOUR_HOSTINGER_USER/private/queueless-voice.json',
'google_voices' => ['gu'=>'', 'hi'=>'', 'en'=>''],
```

Restrict file access to the hosting account/PHP process. Do not give the credential file a public download URL. The server signs a short-lived OAuth assertion; no Google credential is delivered to the browser. Blank voice names let the provider choose a matching `gu-IN`, `hi-IN` or `en-IN` voice. Optionally specify names from Google's [supported voices](https://docs.cloud.google.com/text-to-speech/docs/list-voices-and-types).

Without this credential, playback uses an installed browser voice in the requested language. If none exists, the site reports it instead of reading Gujarati text with an unrelated voice. Cloud speech is limited to 1,800 characters/4,800 UTF-8 bytes per playback; ask for a shorter answer when needed.

## 4. Maintain official information sources

The server fetches approved government HTML pages and PDFs when needed, caches them for an hour by default, and displays source links and retrieval times. This is refreshed public information, **not a direct connection to private government records or an assurance that every rule has just changed**. A retrieval timestamp is not the rule's effective date. Pages that require JavaScript, login, CAPTCHA, large PDFs or unavailable certificates/DNS may not be readable.

Defaults cover service categories and include portals for PM-JAY, PM-KISAN, MYSY, Digital Gujarat, PMAY, Jan Suraksha, Gujarat WCD and Developing Castes Welfare. They are starting points, not a complete verified requirements database for every listed scheme. Questions are routed by recognized topic; the selected service is the fallback. An unsupported or unclear rule must be confirmed by the office.

For accurate document requirements, the admin should maintain the service-specific official source URL and checklist. The host can also set an explicit source list in `_private/config.php`; this replaces the defaults:

```php
'government_sources' => [
  [
    'id' => 'women-welfare',
    'title' => 'Gujarat WCD — women welfare schemes',
    'url' => 'https://wcd.gujarat.gov.in/posts?id=438',
    'kind' => 'housing',
    'keywords' => ['ganga', 'vahli', 'dikri'],
  ],
  // Add other verified service-specific pages/PDFs here.
],
```

Kinds: `certificate`, `ayushman`, `scholarship`, `farmer`, `housing`. Only HTTPS hosts ending in `.gov.in` or `.nic.in` are accepted; redirects and resolved network addresses are validated. No arbitrary visitor-supplied URL is fetched. Make `_private/source-cache/` writable by PHP. It contains public source copies only and must remain inaccessible from the web. If refresh fails, a cached copy up to seven days old is explicitly marked stale; after that the source is unavailable. Freshness alone does not prove a page contains the applicable rule.

## 5. Test after activation

1. Open Help after signing in. Confirm AI shows configured. This indicates settings exist; a successful answer is still required to verify credentials and quotas.
2. Accept the processing notice. Ask a question covered by a configured source and inspect its citation and retrieval date.
3. With the website in English, ask in Gujarati, then Hindi. Replies should follow the question language. Ambiguous questions use the selected website language. Explicit response-language requests take precedence.
4. Switch the website language without refreshing. Controls, errors and existing document findings switch immediately. New replies follow the new preference unless the question clearly uses another language. Previously saved chat text keeps its original language.
5. Click the microphone and grant permission. Record up to 30 seconds, stop, review the transcript, then send. With Gemini enabled, the audio is transcribed and its language detected. Browser fallback recognition uses the selected language and has more limited automatic detection.
6. Enable Speak answers; test audible Gujarati, Hindi and English on the actual target phones/browsers. Stop speaking and language changes should cancel current playback.
7. Upload synthetic PDF/JPG/PNG documents below 4 MB (images below 24 megapixels). Try a clear sample, unreadable sample, name mismatch, incomplete field and clearly printed past expiry. Inspect the correction message in all three languages. Check an unsupported rule produces uncertainty rather than invented eligibility.
8. Confirm saved history is account-specific; temporary chat disappears after leaving/reloading. The site does not persist uploaded documents or document-check results. PHP temporarily holds the upload for the request; provider retention/data-use terms still apply.
9. Test expired login, rejected microphone permission, unavailable source, quota exhaustion and phone layout. Confirm normal bookings/officer updates still work while AI is slow.

## Limits before a public pilot

- Document results are preliminary assistance, not proof of genuineness, an issuer lookup, or a benefits decision. Manual officer review remains necessary. Suspicious/incomplete information is reported as a correction or uncertainty.
- Government pages and uploaded documents are untrusted input. Prompts constrain answers, but model errors remain possible; citations and human review are necessary.
- The assistant cannot change bookings. Private queue guidance stays in local server code. External chat includes the question and up to six recent messages only after consent.
- No provider credentials were available during development, so live Gemini responses, real audio transcription, cloud playback and document-analysis quality have not been verified. Browser hardware/permission testing and an actual Hostinger pilot are still required.
- Large-scale traffic needs load testing, provider capacity planning and hosting upgrades. This release has bounded requests/caching and releases session locks during slow calls, but is not certified for government-wide traffic.

## Updates

For an existing v1.1 installation, back up files/database, preserve `_private/config.php`, add the assistant settings above, upload the v1.2 build and omit/remove `install.php`. No schema migration is needed. Preserve private credentials and source-cache directories. Source changes still require `npm run build` and upload of `dist/`; GitHub commits alone do not deploy to Hostinger.
