# QueueLess Government Office

A working, multilingual project prototype centered on remote token booking and protected arrival windows.

## Included
- Gujarati (default), Hindi and English throughout the interface.
- Public service, office and scheme discovery; 20 supplied scheme entries with search/category filters.
- Account-backed tokens and chat history stored in D1 with server-side ownership checks.
- ChatGPT sign-in through the hosting platform; a local-only development identity for testing.
- Atomic slot reservation, duplicate prevention, idempotent booking requests, cancellation, 60-minute rescheduling cutoff and check-in window.
- An earlier-time option requires explicit confirmation. Queue simulation never changes arrival reservations.
- Arrival/departure planning, document preparation checklist, missed-token handling and visit history.
- An isolated per-account office simulator to demonstrate changing service speed and queue counts.
- Built-in multilingual chat guidance with history, rename, deletion and temporary conversations.
- Responsive desktop/mobile layouts, loading skeletons, keyboard focus and optional supported-device vibration.

## Honest integration boundaries
This is a student project prototype, not a government portal. Offices, distances, travel times, queue counts and bookings are demonstration data. Official appointments are not made. The catalogue is for discovery; eligibility, benefits, required documents and current availability must be verified against official sources. Sathshri Seva Yojana is retained exactly as requested but marked unverified.

Live generative AI, SMS OTP/reminders, real office feeds, actual document verification, production officer roles and hardware QR kiosks require integrations. The current assistant explicitly identifies itself as a built-in guide. The private deployed site uses platform sign-in, not mobile OTP. In-app arrival guidance is available; no background SMS is sent.

## Development
Requires Node 22.13+.

- Install: `npm run install:ci`
- Develop: `npm run dev`
- Type check: `node node_modules/typescript/bin/tsc --noEmit`
- Generate schema migrations: `npm run db:generate`
- Build: `npm run build`

On Windows, if the npm shim fails, invoke the installed npm CLI through Node, or use `node scripts/run-framework.mjs dev` / `build` directly.

Local D1 migrations: build once and run `node --import ./scripts/sites-env.mjs ./node_modules/wrangler/bin/wrangler.js d1 execute DB --local --config dist/server/wrangler.json --persist-to .wrangler/state --file drizzle/0000_tranquil_deathstrike.sql` once for the initial database. Hosting applies migrations separately.

The production platform authenticates requests; never expose the local development server publicly. Site access is private by default.

## Validation completed
TypeScript check and production build. Local API tests cover anonymous privacy, authentication, reservation persistence, duplicate and repeated-request guards, early check-in rejection, stable arrival time when the queue changes, successful rescheduling, invalid-slot rollback, chat persistence, rename/deletion, temporary chats and cancellation. Browser review covers Gujarati/English/Hindi and phone-width rendering.
