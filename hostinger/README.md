# QueueLess Gujarat — Hostinger PHP/MySQL edition

This is the standalone Hostinger edition. It uses React for the interface and PHP 8.2+ with PDO/MySQL (InnoDB) for its server. Node.js is used only to build the frontend on your computer; Node.js hosting is not required. No Cloudflare, Sites, Netlify or external database is required.

## First installation

Use the prepared `QueueLess-Hostinger-v1.2-Upload.zip`. Extract **its contents**, not an enclosing extra folder, into your subdomain's actual document root. Example only:

```text
/public_html/queueless/
  index.html
  assets/
  favicon.svg
  api.php
  assistant.php
  install.php
  cron.php
  .htaccess
  _private/
```

1. **Prepare the subdomain.** In hPanel, open your website's Subdomains page and check the exact Directory assigned to it. Use that directory rather than assuming the example above. Enable SSL and force HTTPS. If another site is already there, back it up before replacing files.
2. **Select PHP 8.2 or newer**, preferably a currently supported PHP 8.4 release available in your panel. Enable `pdo_mysql`, `mbstring`, `curl`, `fileinfo`, and `openssl`. PHP sessions and outbound HTTPS must work. Do not select Node.js hosting for this package.
3. **Create a fresh MySQL database and database user** in hPanel → Databases → Management. Keep the full prefixed database name, username, host and password. Do not reuse an unrelated application's database. You do not need to import a `.sql` file manually; the installer creates the `ql_` tables.
4. **Upload and extract the upload ZIP** using File Manager, or upload its extracted contents using FTP/FTPS. Ensure hidden `.htaccess` files were included both at the top level and inside `_private/`.
5. **Create the configuration.** In File Manager, copy `_private/config.example.php` to `_private/config.php`. Edit only the new `config.php`:

   ```php
   'dsn' => 'mysql:host=localhost;dbname=u123456789_queueless;charset=utf8mb4',
   'db_user' => 'u123456789_queueless',
   'db_password' => 'YOUR_DATABASE_PASSWORD',
   'origin' => 'https://queueless.yourdomain.com',
   'local_development' => false,
   'setup_key' => 'YOUR_UNIQUE_RANDOM_STRING_OF_AT_LEAST_32_CHARACTERS',
   'cron_key' => 'A_DIFFERENT_UNIQUE_RANDOM_STRING_OF_AT_LEAST_32_CHARACTERS',
   ```

   Use the actual MySQL host and full names shown by hPanel. `origin` is the exact HTTPS scheme and hostname visitors use, **without a path**. If hosting in a URL subdirectory, the origin still has no path. Use a password manager to create the two random keys; do not use the example strings. Keep `local_development` false. Leave Twilio values empty for now. Escape a single quote inside a PHP string as `\'`. Never upload credentials to GitHub or paste this file into chat.

6. **Install.** Open `https://YOUR-SUBDOMAIN/install.php`. Enter your setup key, your administrator name and email, and a password of at least 12 characters. Submit once. Save the recovery code displayed after installation in your password manager. Registration does not make anyone an admin; this one-time installer creates the first admin.
7. **Remove `install.php` from the server.** The database also locks out repeat installation, but the setup file is no longer needed.
8. **Open the subdomain and sign in** with the administrator account. The office list starts empty intentionally. There are no preinstalled accounts or invented office listings. Public-source retrieval and optional AI are described in ASSISTANT-SETUP.md; private government records are not connected.

## Make the first office bookable

1. Open **Administration → Offices & services**.
2. Add the office name and address in Gujarati, Hindi and English; city; official source URL; hours; working weekdays and holiday dates. Enter an office-approved priority policy only if that office actually has one. Verify the information before checking **publish this office**.
3. Save the office. Choose a service, enter its planned duration and the number of tokens the office can actually handle per 15-minute slot. Add each required document on its own line, in matching order in all three languages. Record the checklist's official source. Mark it verified only after checking it, and enable the service.
4. Add at least one counter assigned to that service. A service with no open counter cannot accept bookings.
5. Ask the officer to register a normal account. Verify the person's identity separately. In **Accounts & access**, choose **Officer**, assign the office, and save. They must sign in again after the role change. Email/password registration does not verify email ownership; do not use an email string alone to verify an officer's identity.
6. In a separate private browser window, register a citizen account, save its recovery code, then reserve an available time. Public visitors can browse offices, slots and the scheme catalogue without registering.
7. At the booked time, the citizen checks in; the officer selects the counter, calls the token, starts service and completes it. The citizen's screen refreshes every five seconds while visible. The protected arrival window does not move when another booking changes.

For a first rehearsal, use clearly labelled test records and keep the subdomain restricted to your team. Remove test records from a dedicated testing database or create a fresh production database before accepting actual citizens; do not wipe a database containing real bookings.

## Automatic reminders and no-shows

In hPanel → Advanced → Cron Jobs, create a **PHP** cron job for the full server path to `cron.php`, scheduled every minute if your plan permits. Example path only:

```text
/home/u123456789/domains/yourdomain.com/public_html/queueless/cron.php
```

Use the actual full path shown by Hostinger. For the panel's PHP option, enter the script path; use the PHP version selected for this application. If your plan's minimum interval is longer, reminders will be correspondingly less precise. Running the job should return `{"ok":true,...}` in its output. Administration shows the last automatic check.

The cron job creates approaching-visit notifications and processes missed arrivals even when nobody is viewing the website. Open pages also refresh queue state and apply these time rules. In-app notifications work without SMS. The app does not send browser push notifications when closed.

## Optional mobile OTP and SMS

Email/password accounts, bookings, officer actions, saved chat and in-app notifications work without Twilio.

To enable phone sign-in, configure a Twilio Verify service and fill in `twilio_sid`, `twilio_token`, and `verify_service` in the server's private config. The app supports Indian `+91` mobile numbers. Verify codes are checked with Twilio; there are no demo or hard-coded OTP codes.

To send booking, approaching-visit and turn alerts, also configure `messaging_service`, a Twilio Messaging Service with an appropriate sender. Each citizen must verify their phone and explicitly enable SMS in Profile. Keep the cron job running. Complete any sender or country-specific registration required by Twilio for your account and destinations. Provider fees apply.

Test OTP and SMS with your own opted-in test phone before relying on them. These external integrations were not live-tested because no provider account was connected. `accepted` means Twilio accepted a message, not confirmed delivery. Failed or uncertain sends are marked for review and are not retried automatically, avoiding duplicate messages. Check provider logs when Administration reports a delivery issue.

## Rules implemented

- One active token per citizen per service category. Free virtual tokens.
- Shared online and walk-in capacity; atomic booking and rescheduling transactions prevent double booking. A failed replacement preserves the old reservation.
- Rescheduling closes 60 minutes before the original arrival time. An earlier slot is always an explicit citizen choice.
- Arrival window: 15 minutes. Check-in: from 15 minutes before to 25 minutes after the reserved start. Office delays extend the grace period; resuming after an office pause grants existing bookings at least another 25 minutes to check in.
- Officers call only checked-in, due tokens in priority/arrival order. Calling an eligible priority token requires a previously published office policy and an audited reason. A called token can be marked missed after 10 minutes with a reason.
- Only officers of the assigned office, or admins, can call/start/complete a visit. Citizens cannot mark themselves served.
- Wait estimates use active counters and each service's recent measured durations once five valid samples exist; otherwise they use the administrator's planned duration. They are planning ranges, not guarantees or a trained AI model. Travel time is the citizen's estimate, not live traffic.
- Audit records cover queue changes and access changes. Thirty-day metrics include completed visits, actual waiting time, check-in prediction error and no-shows among completed/missed visits.
- Gujarati default, Hindi and English UI; server-checked permissions, CSRF protection, password hashing, secure session cookies, sign-in/OTP rate limiting and session invalidation after role changes or recovery.
- Saved chat with rename/delete and temporary mode. The built-in guide can read the signed-in citizen's actual token. Optional Gemini chat, speech transcription and preliminary document checks are now integrated; add private credentials to activate them. The assistant cannot mutate a booking.
- Twenty requested scheme catalogue entries. Scheme-specific eligibility and benefits are not asserted; the final “Sathshri Seva Yojana” name remains explicitly unverified. Service document lists are managed and verified by the office.

## Assistant activation in v1.2

Read **ASSISTANT-SETUP.md** (also supplied separately as QueueLess-Assistant-Setup.md). It explains the Gemini key, optional Google Cloud voice credential, official sources, upload limits, multilingual behavior and post-deployment checks. No database migration is needed. Keep document checks labelled preliminary: issuer authenticity is not verified.

## Updating the website

The source ZIP is standalone: put its **contents** at your repository root if you want to maintain this edition in GitHub. Keep `_private/config.php` out of Git. This project does not need the earlier Sites project or its `.openai` files.

On a computer with Node.js 22.13+:

```text
npm ci
npm run build
```

Upload the **contents of `dist/`** to the same subdomain folder. Preserve the server's `_private/config.php`, database and backups. Upload the new assets before replacing `index.html`; keep previous assets until open tabs no longer need them. Skip `install.php` on updates. Updating source files alone without rebuilding does not update the frontend. Vite's development server alone does not run PHP; use a PHP-capable local server and a separate test database for full-stack testing.

Committing or pushing to GitHub alone does **not** deploy this package. Automatic GitHub-to-Hostinger deployment is not configured. Future database schema changes need an explicit migration and backup; do not reinstall or replace the database to update the UI.

## Troubleshooting

| What you see | Check |
|---|---|
| 404 or default Hostinger page | Subdomain Directory and ZIP extraction level; `index.html` must be directly in that directory. |
| “Complete website setup” | Create private config, then visit `install.php` and complete installation. |
| “Could not connect” / HTTP 503 | MySQL host/name/user/password, PHP version/extensions, and hosting error logs. A missing database schema also requires installation. |
| HTTPS required | Enable SSL and force HTTPS in hPanel. Keep `local_development` false on Hostinger. |
| Session/CSRF/permission error | Check config `origin` matches the current HTTPS hostname. Refresh, then sign in again; check browser cookies. |
| No bookable office | Publish a verified office, enable a service and add an unpaused counter; check opening days and closures. |
| No OTP option | Fill all three Verify provider values; empty configuration deliberately disables it. |
| No SMS arriving | Verify phone + opt in; check provider sender setup, country support, credit, cron execution and provider logs. |
| No officer desk | Admin assigns the account to an office, then the officer signs in again. |
| Lost password | Use the recovery code saved at registration/installation. Recovery rotates that code and invalidates older sessions. No recovery emails are sent. |

Before opening to citizens, confirm `_private/schema.sql` and `_private/config.php` return 403 or 404 when requested in a browser. Keep the `_private/.htaccess` rule in place. Enable hosting backups and make a database export before future upgrades.

## Verification performed

Built frontend and checked TypeScript. PHP files passed syntax checks using PHP 8.4.26. Integration checks ran against a separate local MariaDB 11.4 instance, including authorization, booking capacity, rescheduling rollback, service lifecycle, grace extensions, chat ownership and missing-provider behavior. Independent PHP processes contested a single slot successfully (one reservation, one conflict). Desktop and 390px mobile layouts were inspected in the browser.

This package has not been uploaded to your Hostinger account. Hostinger-specific configuration, outbound SMS and real office data still require the setup above.

## Official setup references

- [Hostinger subdomains and directories](https://www.hostinger.com/support/1583405-how-to-create-and-delete-subdomains-in-hostinger/)
- [Create a Hostinger MySQL database](https://www.hostinger.com/support/1583542-how-to-create-a-new-mysql-database-in-hostinger/)
- [Configure a Hostinger cron job](https://www.hostinger.com/support/1583465-how-to-set-up-a-cron-job-at-hostinger/)
- [Twilio Verify](https://www.twilio.com/docs/verify/api)


## Version 1.1 audit update

See `AUDIT.md` for the bug list, causes and validation: 48 automated checks plus browser checks. This update needs no database migration. Preserve your private configuration and database, omit `install.php` when updating, and sign in again after upload because installation-specific session names have changed. New registrations and resets use the revised password format; keep the updated server authentication files together.

The source contains `tests/regressions.php` for the focused regression checks. It requires a separate installed localhost database named `queueless_test_*`, local development enabled, and the test fixture accounts/services; never run test fixtures against production.
