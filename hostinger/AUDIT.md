# QueueLess audit and fixes — updated 5 October 2026

The Hostinger PHP/MySQL edition has been updated. This is a working local application with database-backed accounts, reservations, officer actions and history. It has not been deployed to Hostinger or approved for use by a government office.

## Assistant update — v1.2

Added language-aware chat, official government source retrieval/citations/freshness, recorded speech transcription, matching-language browser/cloud speech and structured multilingual document-readiness findings. Provider activation is documented in ASSISTANT-SETUP.md. No credentials, new npm dependencies or schema changes were introduced.

| Issue found while adding the assistant | Cause | Fix |
|---|---|---|
| Results could describe a previous file | Upload controls remained editable while analysis was pending | Lock document inputs during the request; clear findings when inputs change. |
| Expiry could be overclaimed | Model output alone was treated as sufficient | Require a clearly printed, valid past date; otherwise report uncertainty. |
| Fresh source could imply applicable rules were confirmed | Retrieval freshness and rule relevance were conflated | An explicit rule-uncertainty finding also marks requirements unconfirmed. |
| Speech could continue after language changes | Audio/recording requests outlived the selected language | Stop recording/playback, cancel pending requests and ignore stale results. |
| Installed voices may initially appear missing | Browser voice list loads asynchronously | Wait briefly for voiceschanged; still require the correct language. |
| Cloud OAuth request format needed correction | Token endpoint expects a form body | Use form-encoded JWT token exchange; credentials remain server-side. |
| Source redirects could exceed the interface timeout | Each hop had a separate timeout | Apply a total source-download deadline. |
| Unsupported upload content could masquerade as an image | Filename/MIME declarations cannot be trusted | Inspect actual content and image dimensions before provider processing. |
| Temporary chat follow-ups lacked context | Only the newest question was sent | Include bounded recent conversation in memory, without persistence. |

Validation for this update: 42 pure assistant checks, 15 assistant API checks and 19 existing regressions passed (76 checks). The production/TypeScript build and all eight deployable PHP syntax checks passed. Tests cover language precedence, topic routing, source/address restrictions, incomplete model responses, expiry uncertainty, CSRF, authentication, account isolation, temporary history, disguised/oversized files and disconnected-provider errors. API uploads used synthetic files only. Browser testing confirmed a Gujarati response on the English website, instant Hindi/English control changes and the disconnected-provider/document state.

Direct source tests retrieved Digital Gujarat and PMAY pages. NHA/PM-KISAN failed certificate validation and MYSY failed DNS resolution from this environment. TLS verification was retained. Hosting administrators must test their exact requirement pages from Hostinger. Google provider credentials were unavailable, so no live generated answer, audio transcription, cloud speech or document-analysis quality is claimed as tested. Actual microphone hardware and production hosting have not been tested.

## Previous v1.1 bugs found and fixed

| Problem | Cause | Change |
|---|---|---|
| Sign-in errors hidden behind the popup | Native dialogs appear above ordinary toast notifications | Persistent errors now appear inside the dialog. |
| Selected time lost after signing in | The booking effect unconditionally cleared the selection | Retain the time, re-fetch availability, clear it only if unavailable. |
| Booking conflict leaves stale choices | Failed requests did not reload available slots | Refresh both slots and shared state after a conflict. |
| Abandoned booking reappears during later sign-in | Closing the dialog retained its pending booking | Closing now clears the abandoned booking. |
| Recovery flow returns an unauthenticated user to booking | Recovery resets credentials but does not sign in | Show the new recovery code, then return to sign-in. |
| One-time recovery code easily dismissed | Escape/close could discard it | Require the explicit “I have saved it” action. |
| Two local installations sign each other out | Browser cookies are shared across ports | Session names now include the configured origin and application path. |
| Open polling tabs keep sessions alive indefinitely | Every poll resets the idle timer | Add a 12-hour maximum signed-in session lifetime. |
| Logout could leave private content visible if refresh failed | UI depended on the next successful state request | Clear account data immediately after successful logout. |
| Password spaces behave inconsistently | Registration/login trimmed the password, while installation did not | Preserve password bytes, use consistent Unicode length validation. |
| Long passwords can share an effective bcrypt prefix | Bcrypt only considers its input limit | New and reset passwords use a versioned SHA-384 prehash before bcrypt. Existing hashes remain readable. |
| Reduced capacity permits another booking | Vacant seat IDs were checked without total occupancy | Check total active reservations as well as seat uniqueness. |
| Active token vanishes behind newer history | Active and completed visits shared a 100-row limit | Fetch every active token separately from recent history. |
| Officer desk omits active tokens | A 500-row mixed history/active limit | Fetch the active queue without silently truncating it. |
| Call buttons permit the wrong next token | UI and server ordering differed | Use priority/arrival order and disable calls for busy, paused or mismatched counters. |
| Officer-marked missed turn lacks a citizen notification | That status branch returned before notifying | Add a persisted missed-turn notification. |
| Outdated reminders remain deliverable | Worker did not recheck current booking status and arrival | Skip obsolete, rescheduled, cancelled and expired messages; supersede pending office notices. |
| Chat remains on screen after account changes | Component state outlived the account | Remount private chat/profile state when the signed-in identity changes. |
| New chat title field is empty | Only reopening history populated the title | Populate the title after the first saved message; scroll to new messages. |
| Older users cannot be assigned officer access | Admin UI only listed the latest 200 accounts | Add protected server-side search with 25-result pagination. |
| Invalid closure dates accepted | Date validation checked only the text shape | Validate real calendar dates. |
| Repeated form labels are ambiguous | Every translated field was labelled only by language | Include both the field name and language. |
| Weekday setup is unnecessarily technical | Required entering numeric weekday codes | Replace with labelled weekday checkboxes. |
| Storage restrictions can crash initial rendering | Local storage access was unguarded | Fall back to in-memory preferences. |
| Success toast disappears immediately | Dialog-close effect cleared all messages | Clear old messages when opening, retain success messages when closing. |

Slot availability now uses a grouped occupancy query instead of a separate query for each slot. Keyboard focus and reduced-motion styling were also checked and improved.

## Previous v1.1 validation

- Production build and TypeScript checks passed.
- All six deployable PHP files passed PHP 8.4 syntax checks.
- 20 integration checks passed against a fresh local MariaDB database: installation, login, role/session invalidation, CSRF, authorization, booking, atomic rescheduling, private records, chat, officer lifecycle, delay/grace rules and unavailable OTP behavior.
- 19 focused regression checks passed: password handling, dates, reminder relevance, reduced capacity, active history, large active queues, admin search/pagination and directory permissions. Their database fixtures were rolled back.
- 7 queue-rule checks passed: measured estimates, paused counters, overdue arrivals, reminder deduplication and unpublished-office privacy.
- One independent-process concurrency check passed: two bookings contested one slot; exactly one succeeded.
- One recovery check passed: the code rotates, the old code is rejected, and the new password signs in.
- Browser checks: failed-login error visibility, sign-in retaining the selected slot, confirmed booking/token display, saved chat, chat clearing after another tab logs out, admin search and weekday controls. Mobile token/admin layouts were visually inspected. No JavaScript errors appeared in the inspected flows.

That is 48 automated checks, plus the browser checks. This is a scoped audit, not proof that every possible bug has been eliminated. The local HTTP server uses a private-file protection router; Hostinger's actual Apache/LiteSpeed `.htaccess` enforcement still needs the deployment check in the setup guide.

## What remains before a real pilot

- Upload the package, configure Hostinger MySQL/HTTPS and run the installer once.
- Add verified office information, document checklists, service capacity and individually approved officer accounts.
- Configure a scheduled cron job for unattended reminders and expiry.
- Connect and test the SMS/OTP provider if mobile authentication or text messages are needed. Email/password login already works; registration does not verify email ownership.
- Test with expected concurrent usage on the actual hosting plan. The current implementation serializes queue mutations and state maintenance with a database lock; it has not been capacity-tested for government-wide traffic.
- Verify backups/restoration and office procedures before accepting real citizen data.

Updates use five-second polling while a page is visible. This is not a WebSocket push system. Local queue guidance remains rule-based. Generative AI and voice are implemented but require provider activation and live testing. SMS delivery and private government integrations remain unactivated.

## Upgrade compatibility

No schema changes are required for this update. Back up files and database, upload the new build, preserve `_private/config.php`, and omit/remove `install.php` for an existing installation. Users will need to sign in again because session names changed. Existing password hashes remain accepted; new registrations and password resets use the updated hashing format. Do not revert to the old authentication code after creating passwords with the new format.

