# VITCHA security and QA handover

## Runtime and deployment

The application uses React/Vite and Express with server-only Supabase PostgreSQL persistence in production and a JSON file adapter for local development. Deploy the matching frontend and server together: old clients do not have sessions and will receive 401 responses. Existing members keep their credentials; legacy plaintext PINs are hashed with salted scrypt when the server starts. Login resolves an exact account. Private server authentication configuration is loaded from the runtime directory or server environment, and is excluded from the frontend and delivery archive. Legacy `editor` users are treated as reviewers; new roles are admin, reviewer and viewer, with `user-ice` exclusively owning simulation and maintenance.

The local file adapter requires one Node server process per database directory. Its transactions synchronously read, validate and atomically rename the JSON file without an asynchronous gap. Record revisions reject stale edits and deletes; separate action endpoints append comments/replies against the current record. Client operation IDs deduplicate retries. This file store is not a distributed database and must not be shared by multiple replicas/writers.

Production requires `SUPABASE_URL` and a server-only `SUPABASE_SECRET_KEY`. Apply `deployment/supabase.sql`, import the complete normalized backup, verify its SHA-256 and collection counts, and create a private `vitcha-media` bucket before starting. Render production refuses to start with ephemeral file persistence. `render.yaml` retains the Free plan, adds no paid resources and deploys main automatically after CI passes. Secrets never enter the client build or Git.

PostgreSQL commits use a database advisory transaction lock, expected version and unique commit receipt. A stale writer receives 409; a failed write never reports success, and a lost HTTP acknowledgement is resolved from its receipt. Registration and invitation consumption share one commit. Server requests check the remote version before using a cached snapshot. `/api/data?since=...` avoids downloading unchanged media-rich snapshots; its version also includes the effective session identity. Sessions remain process-local, so use one server instance and expect sign-in again after a restart.

Media uploads await object storage and private metadata before returning a stable `/media/:id` URL. Supabase objects remain private and are read through short-lived signed links. The fallback uses the free Storage quota; it is not an unlimited media plan. Optional Google Drive resumable uploads verify size and MD5 and stream range requests without making Drive files public. Drive requires its own authorized application OAuth configuration in the private runtime table; it is not yet connected. The chat Drive connector is not an application grant.

For local development only, set `DATA_DIR` to a persistent directory containing `database.json` and `uploads`. A missing database requires a complete restore or explicit `BOOTSTRAP_PIN`; startup never silently seeds over a missing production database. Keep independent private backups in addition to persistent database storage.

Sessions use opaque bearer tokens stored in sessionStorage. They expire after 12 hours and after server restart. Roles are checked against current server data on every request. PIN changes invalidate other sessions; deleting a user invalidates that user's sessions. The three mock personas cannot log in directly. Only a founder-authenticated session can enter/leave simulation, and simulated mutations use the simulated role.

## API and data integrity

- `/api/login`, `/api/register` and minimal invite validation are public and rate limited. Registration checks exact case-insensitive identifiers and consumes an unused server invite in the same write as account creation; client-supplied roles are ignored.
- `/api/data` requires authentication and never returns PINs/hashes. The returned member list excludes developer personas; only admins receive invites.
- Core record edits/deletes require admin and an expected revision. Reviewers may create records, comment/reply and update handoff. Viewer accounts can read, with view telemetry only.
- Whole-client `/api/sync` is disabled. Founder maintenance uses explicit revision-checked endpoints. Record import deliberately preserves current users and invites. Sample-data loading uses a founder-only server-owned pack with an operation ID; it appends atomically, skips existing IDs and cannot be invoked by other accounts.
- Profile updates can only target the caller. Role updates require admin; founder and mock roles cannot be changed through member management.
- Media writes require a writable role, allow only known image/audio/video MIME types and cap uploads at 50 MB. Media is served by unguessable shared URLs with `nosniff` and restrictive CSP. New media never falls back to IndexedDB/blob URLs; legacy local video links still need re-uploading from their original device.
- Settings are server-backed and compare the prior settings snapshot. Mutations report failures without clearing record/comment drafts. Main edit forms keep their opening revision, so background polling cannot silently override concurrent edits.

## Before every commit or push

Do not overwrite the database using a sanitized `/api/data` response. Run `npm run backup:live` immediately before each commit or push. It first retrieves `/api/data` and, for the secured server, retrieves `/api/backup` as the founder to obtain the complete snapshot. It validates the snapshot before replacing `server/data/database.json` atomically. Supply `VITCHA_SESSION_TOKEN`, or `VITCHA_ID` and `VITCHA_PIN`, through the environment; do not put credentials in tracked files. `VITCHA_SERVER_URL` can override the default Render endpoint. Stop any local writer before replacing its database. Both deployed endpoints were backed up separately and compared before migration. The complete original snapshot, including its additional account, current avatar and notifications, was imported and verified. Backups now use the authenticated canonical cloud server and preserve the original endpoint separately. Versioned snapshots are stored privately under `.private/backups/`. `node scripts/install-git-guards.mjs` installs non-destructive pre-commit and pre-push guards, which run the live backup automatically and block publication on failure. Runtime data is no longer tracked in new commits; it remains on disk and in private snapshots. Existing repository history is not rewritten by this change.

## Local development and verification

Start the backend with `PORT=3001 npm start`, and run `npm run dev` in another terminal. Vite proxies `/api`, `/uploads` and `/media` to localhost:3001; `VITCHA_DEV_API` can override the target. Use a temporary `DATA_DIR` and `BOOTSTRAP_PIN` when starting with an empty database.

- `npm test`: real HTTP endpoint tests for authentication, all roles, concurrent registrations/comments/replies, stale edits/deletes, session revocation, media validation, safe import and disk/network failure behavior.
- `npm run test:browser`: Chrome tests against a disposable database and fixture accounts. It covers desktop/mobile layout, login, viewer controls, overlapping photo jobs, inline image replacement, retained drafts after a failed save, and invalid invitations. Install Chrome first. On a supported host, install WebKit and use `TEST_WEBKIT=1 npm run test:browser` for the additional engine. Ports 3901 and 4173 must be free.
- `npm run typecheck` and `npm run build`: TypeScript and production build.

Browser tests do not use the real Render database. WebKit could not start on this macOS 14 host: its frozen runtime rejects Playwright’s `PushAPIEnabled` setting. Safari/WebKit has not passed QA; run the optional WebKit project on a supported host. Final device QA should include native iPhone/Android keyboards, camera/HEIC support, GPS permissions, large uploads and production cold starts. JSON atomic rename protects normal write failures, not disk loss; retain independent backups.

## Verification result — 2026-10-28

- Node integration/stability/map style/PostgreSQL/cloud media tests: 50 passed, 0 failed.
- Chrome browser workflows on the compiled production build: 20 passed, 0 failed, including 320/390/768 px layouts and 1440 px desktop. These are emulated viewport tests, not physical device results.
- Production build and its TypeScript build passed; GitHub Pages fallback and `.nojekyll` are restored by postbuild. Map and record dialogs load in separate chunks; the main bundle is about 397 kB (101 kB gzip) for the initial application. The English vector-map update adds a separately loaded WebGL renderer (~1.24 MB, 342 kB gzip) and worker (~520 kB); Vite warns about that optional map chunk.
- Full dependency audit: 0 known vulnerabilities reported. `git diff --check` passed.
- PR #1 is merged into `main`. Supabase persistence, automatic Render deployment and GitHub Pages publication are active. `server/data/database.json` contains the validated live backup, including the current profile image; it is excluded from the delivery archive. Tests used disposable databases.
- Supabase persistence and media survival across production deployments passed live verification. Safari/WebKit and physical-device QA remain unverified; viewport emulation is not a substitute for physical-device testing.

## Final UI polish and delivery

The supplier and store collections now have consistent headings, record counts, role-aware add buttons, larger filter targets, accessible search fields, a single complete filter reset and useful empty states. Reset includes country and city. Avatar images fall back to the bundled brand image if the source is empty or unavailable. The login screen accepts a real typed invitation code; it no longer substitutes a demo invitation. Dismissing an invitation also removes its URL parameter so polling cannot reopen it. Map, detail and creation dialogs are split into on-demand chunks.

Generate the delivery archive with `npm run release` on macOS/Linux (requires the standard `zip` and `unzip` commands). It includes source, built frontend, backend, lockfile, tests, scripts, this handover and the latest QA screenshots when available. The archive deliberately excludes `server/data`, uploads, `.env`, Git history and dependencies. The packager verifies the contents and emits a SHA-256 checksum. Screenshots show disposable test data.

### Run the delivered application locally

1. Extract `release/VITCHA-handoff.zip` into a new folder and run `npm ci`.
2. For an existing installation, copy a **complete, validated** backup to a separate runtime directory as `database.json`, with its `uploads` subdirectory. Do not use a sanitized `/api/data` export.
3. Start against that directory: `DATA_DIR=/absolute/path/to/runtime PORT=3001 npm start`. The server serves both the built UI and API at `http://localhost:3001`.
4. For a fresh, empty installation only, set `BOOTSTRAP_PIN` in the environment to a private value of at least 8 characters. The initial login identifier is `supericez`. No built-in PIN is provided in the source defaults.

### Verify and deploy the matching release

- `npm test` checks the API and persistence; `npm run build` checks TypeScript and produces the frontend.
- `TEST_PRODUCTION=1 npm run test:browser` verifies the compiled frontend through the preview proxy against the temporary API fixture. Never point the fixture at production storage.
- Import and validate the complete backup into the server-only Supabase schema, configure the two server environment values, and run **one** Node process. Frontend and backend must be upgraded together because sessions are now mandatory.
- The Render YAML retains Free hosting. Durable storage is connected and migrated records/media are verified. GitHub Pages publishes the verified frontend with the matching canonical backend.
- Before each commit/push, perform the live backup procedure above. GitHub Actions runs API tests, a production build and browser workflows on pushes and pull requests. Successful `main` checks publish GitHub Pages and permit Render deployment automatically.

### Delivery archive smoke check

Run `npm run verify:release` to validate the ZIP checksum, excluded private files, backend startup, static UI delivery, fresh login, authenticated data access, hashed credentials and avatar persistence across server restart. The final archive passed this check. This used disposable storage and the workspace dependency installation via a temporary symlink; it did not access live data or validate an external hosting provider. The complete registration browser workflow also passed through sign-in and reload without reopening the invitation.

## English China map

The basemap uses [OpenFreeMap Positron](https://openfreemap.org/quick_start/) through the [MapLibre Leaflet adapter](https://github.com/maplibre/maplibre-gl-leaflet). Place-name layers prefer `name:en`, then `name_en`; road-reference labels remain intact. Native-name and `name:latin` fallbacks are deliberately omitted because some source features retain Chinese text in those fields. The final expression also suppresses untranslated or mixed-script values incorrectly supplied in English fields (and names longer than 96 characters). Places without an English name may have no label; stored business names, coordinates and records are not translated or rewritten. Data/provider attribution stays visible on the map.

China remains the initial region. Refreshing team data does not reset a user's map zoom/pan; only an explicit region/type change refits it. Loading failures and a lost WebGL context show a retry action. The vector map needs internet and WebGL; connectivity from mainland China and physical iPhone/Android rendering have not been verified. [OpenFreeMap permits commercial usage without API keys](https://openfreemap.org/).

Non-map browser workflows stub external tile requests and disable GPU acceleration to avoid this host's intermittent Metal screenshot-compositor stalls. Screenshots are optional artifacts (`TEST_CAPTURE=1`), separate from the default functional assertions: this host can still stall screenshot capture even with GPU acceleration disabled. Artifact capture retries are bounded. Current product, member, invitation, map and feed screenshots were captured and visually reviewed; final functional results do not claim that this host's capture driver is reliable. The dedicated headless Chrome map test uses SwiftShader because this host's Metal driver loses its WebGL context. It loads real map tiles, checks map readiness and zoom across an API refresh, and saves `release/preview-china-map.png`. This is not a claim that all physical-device GPU drivers passed QA.


## Changes completed in the final team workflow pass

- **Bugs found and fixed:** `server/app.js` enforces private operations by authenticated identity, never by a client role flag. Concurrent invites receive distinct random codes; repeated request IDs return the same invitation. Registration consumes a link and creates one account atomically, rejects duplicate IDs, and does not replace an active session. Existing-account links return to login. `UserProfileModal.tsx` has one display-name field and saves a new avatar immediately; `/api/data` resolves current identities for authors, replies, likes and read receipts. Legacy author IDs are resolved before renames. Password inputs preserve symbols, Unicode and spaces and accept short nonempty values.
- **Performance and stability:** all newly selected photos, audio and video upload to the server. Forms wait for every outstanding photo/audio/video job. Failed audio remains pending until retry or explicit discard; no demo audio is substituted. Real image/WAV/WebM fixtures verified eight simultaneous records (24 media files), byte-for-byte retrieval, partial video requests, and browser decoding. Forty simultaneous invitation creations stayed distinct. Source item IDs are stable, malformed catalog entries are rejected, and product bulk changes validate all revisions before saving.
- **UI/UX:** the China basemap uses English place names; type/country controls affect only the map and its quick pins. The continuous single-column team feed stays unchanged by map controls. Header Home is gray and Add is dark gray. The dedicated member page supports role changes, invitations and named, spaced invitation messages. The product page supports reviewer curation, categories, tag management, per-item memos and decisions, comparison sets, membership and ordering. Source supplier records remain unchanged. Private maintenance, Render controls, simulation and broadcasts are absent from other accounts' UI and rejected by their API calls. Public profile screens do not explain a member's privileges.
- **Git and deployment status:** PR #1 is merged; `main` contains the release. The Supabase-backed application is live at the canonical Render URL and the original GitHub Pages frontend now uses it. Automatic verification and publication are active, with no billing change. Runtime data and private configuration are excluded from Git and the ZIP.

### Additional verification evidence

The Chrome production suite covers member management, private-control visibility, named invitation copy, existing-account login, map/feed isolation, complete reviewer product curation and reordering, viewer read-only behavior, immediate avatar persistence after reload, failed audio retry, actual audio/video decoding, and failed broadcast acknowledgement. Server tests cover other-admin role changes, private operations for every ordinary role, atomic bulk curation and unchanged source records. Live verification preserved real member values, source records, passwords and notifications. It saved the existing avatar unchanged to verify persistence and uploaded tiny private media fixtures without creating feed records. Reserved mock persona roles were corrected separately.

The server loads optional private authentication configuration from `DATA_DIR/recovery.json` (owner-readable only) or `ACCOUNT_RECOVERY_PASSWORD_HASH`. Keep this runtime configuration with the private deployment data, never in frontend assets, screenshots, public documentation values or Git. The local runtime file has been prepared separately and is deliberately excluded from the ZIP.


### จุดอ้างอิงสำหรับส่งต่อโค้ด

| ไฟล์และบรรทัด | สิ่งที่แก้ไข |
| --- | --- |
| `server/app.js:123` | ตรวจบัญชีสำหรับคำสั่งส่วนตัวทุกครั้ง |
| `server/app.js:163` | สร้างบัญชีและใช้คำเชิญในธุรกรรมเดียว ป้องกันทับไอดี |
| `server/app.js:290` | บันทึกรูปโปรไฟล์ทันทีพร้อมตรวจ revision |
| `server/app.js:338` | รหัสคำเชิญไม่ซ้ำและป้องกันคำขอเดิมซ้ำ |
| `server/app.js:358` | MOCKUP ผ่านคำสั่งส่วนตัวแบบ atomic |
| `server/products.js:81` | คัดสินค้า แท็ก หมวด และชุดเปรียบเทียบแยกจากต้นฉบับ |
| `src/context/AppContext.tsx:291` | รอเซิร์ฟเวอร์และรีเฟรชก่อนยืนยันผล |
| `src/components/MembersManagementView.tsx:23` | หน้าสมาชิกและคำเชิญแยกจากการตั้งค่าเนื้อหา |
| `src/components/ProductWorkspace.tsx:37` | หน้าคัดสินค้าและจัดชุด รองรับมือถือ |
| `src/components/DashboardOverview.tsx:17` | ฟีดรวมที่ไม่เปลี่ยนตามตัวกรองแผนที่ |
| `src/components/UserProfileModal.tsx:13` | ชื่อช่องเดียวและอัปเดตรูปทันที |
| `src/components/AudioRecorder.tsx:16` | อัด/อัปโหลดจริง รอส่งสำเร็จหรือให้ลองใหม่ |
| `src/utils/inviteMessage.ts:1` | ข้อความคัดลอกพร้อมชื่อ เว้นบรรทัด และลิงก์ |

## Durable storage direction under the no-new-cost constraint

The original Supabase organization was inspected only; no VITCHA project or data was added there and no Studio/HubChat resources were changed. The new account now contains the VITCHA schema, RLS restrictions, a checksum-verified backup (6 total user records, 7 suppliers, 5 stores and 2 invitations), private runtime configuration and a private media bucket limited to 50 MB per file. Original endpoint backups remain untouched. The user authorized the connection, the existing server key was stored in Render environment settings, and the Supabase-backed release is live on the dashboard service. No paid plan was activated.

The migration preserved embedded media and compared fresh source backups immediately before cutover. Never overwrite newer cloud state with an old import. Both frontend routes now use the canonical cloud-backed server. The separate original Render service is outside the accessible workspace and still requires account access to retire. Google Drive application OAuth remains pending; new uploads currently use the configured Supabase free storage quota.

## Production connection verification

The Supabase-backed server at `https://vitcha-sourcing-fxjw.onrender.com` started successfully. Live checks verified exact-account login, 401 for unauthenticated data access, the original avatar, 3 real visible members, 7 suppliers and 5 stores. Three tiny PNG/WebM/WAV fixtures uploaded to private object storage and downloaded byte-for-byte. Saving the existing avatar acknowledged a durable database write without changing its image. Test media has no feed records. All 6 stored user records (including 3 hidden developer personas) and both invitations remain preserved. No data was placed in the original Supabase organization.

Render is configured for After CI Checks Pass. GitHub Pages is configured for Actions deployment, and the verified main-branch build publishes automatically. The frontend migrates saved references to the old JSON endpoint onto the new canonical server. The old backend remains independently backed up; it is outside the currently accessible Render workspace. Do not direct new clients to that original endpoint.

The local Git backup guard now defaults to the authenticated cloud service and also preserves a separate snapshot of the original endpoint. It can use owner-readable `.private/backup-auth.json` bound to that exact server, or environment credentials. Private values are never included in Git or delivery archives. Failed backups block publication.

Legacy reserved personas are normalized at startup: the viewer, reviewer and administrator simulation identities always have their intended roles. Live migration inspection found stale roles in the old export; the regression test covers that export shape and verifies that actual member roles remain unchanged. These three reserved identities remain unable to log in directly and absent from member lists.

## Embedded-browser map compatibility

The final map pass reproduced `WebGL context lost` in the embedded browser. MapLibre remains on 6.16.0; the canvas now requests the low-power GPU preference and the lockfile resolves style-spec 26.5.0. Together these changes passed visible English-map rendering and reload in the embedded browser, plus the dedicated Chrome production map test. A read-only DOM diagnostic records map initialization failures without exposing them in the user interface. The retry message no longer assumes every rendering error is an internet outage. The production dependency audit reports zero known vulnerabilities.

## Sample pack and refresh regression checks (2026-10-30)

`POST /api/system/sample-pack` accepts only a pack ID and operation ID. The bundled pack contains 10 suppliers, 10 drink stores, 10 locations, 10 lab items (8 drinks and 2 toppings) and 2 brand storefronts (42 records). JPEGs are deduplicated into `public/mockup-media`; keep those assets and `server/mockup-catalog.json` in the release. Existing records, including edited samples and real lab/franchise records, are preserved. A lost acknowledgement can be checked through the founder-only operation receipt endpoint. The UI reads records back and verifies their IDs before announcing completion. Counts come from the returned data, including zero.

Pulling down at the top shows temporary progress and success/failure, with no permanent refresh row. Sample loading reports its result in a dismissible native dialog; checking for a new application build is bounded and does not block the data result. Browser regression tests cover an empty database, real pack loading, repeated clicks after reload, lost acknowledgement, refresh failure and a same-frame touch gesture. API/PostgreSQL tests cover duplicate prevention, preserving real records and an interrupted durable commit.

Snapshot transport accepts `media=images-v1` and deduplicates repeated embedded images after current member identities are applied. This prevents profile avatars repeated in comments, likes and history from inflating a roughly 1 MB snapshot above 20 MB. Clients reconstruct the exact values in memory; stored records, membership, credentials and roles are unchanged. Older clients retain the original response format. Regression tests use repeated 70 KB avatars and assert exact round-trip equality and payload size.

## Two-brand mockup refresh

The v2 sample catalog uses the supplied VITCHA/VITZA logos and a shared concept storefront, with no branch names. VITZA soda concepts are explicitly unapproved ideas rather than incorrectly linked tea recipes. The founder-only `/api/system/brand-concept` operation requires confirmation and the current database revision. It atomically retires only the four known mock branch IDs, adds two brand records and two topping records, preserves all members and unrelated records, and records an idempotent migration receipt. Real records colliding with retired IDs cause a conflict. The previous sample-pack ID remains accepted for existing clients but resolves to the new catalog.

## Complete record activity journey (2026-10-31)

Supplier, reference-store and location detail views retain the activity section and default to all stages. Six stage buttons filter the same inline timeline; visited stages are derived only from versioned server events, never from the ordinal position of the current stage. Repeated/backward moves remain separate events. Legacy history is retained with an explicit limitation message, and surviving full comments/replies are readable without guessing their historical stage.

The server appends version-2 audit events with actor ID, timestamp, stage before/after, and full allowed-field before/after values for creation, edits, handoff, media/attachment changes, deletion and restoration. Comment/reply events keep immutable text/media snapshots. Hand-off revisions and operation-ID retry deduplication remain enforced. Client-supplied audit history is not accepted by ordinary record writes. No member credentials, roles, or production records are migrated or reset by this release.

Timeline media opens in a dismissible in-page dialog. Full notes wrap on mobile; filters and incremental loading keep long histories usable. Older shortened text and missing transitions cannot be reconstructed. Retaining historical attachment URLs does not guarantee a file remains available if removed from its external storage.

Validation includes full text/cleared-field preservation, backward and skipped stages, retry deduplication, stale-write rejection, immutable comments after replies, attachment removal, membership preservation, delete/restore continuity, mobile history/media/filter/reload behavior and legacy-stage honesty.
