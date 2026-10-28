# VITCHA security and QA handover

## Runtime and deployment

The application retains React/Vite, Express and JSON persistence. Deploy the matching frontend and server together: old clients do not have sessions and will receive 401 responses. Existing members keep their credentials; legacy plaintext PINs are hashed with salted scrypt when the server starts. Login resolves an exact account. Private server authentication configuration is loaded from the runtime directory or server environment, and is excluded from the frontend and delivery archive. Legacy `editor` users are treated as reviewers; new roles are admin, reviewer and viewer, with `user-ice` exclusively owning simulation and maintenance.

Run one Node server process per database directory. Transactions synchronously read, validate and atomically rename the JSON file without an asynchronous gap. Record revisions reject stale edits and deletes; separate action endpoints append comments/replies against the current record. Client operation IDs deduplicate retries. This file store is not a distributed database and must not be shared by multiple replicas/writers.

Set `DATA_DIR` to a persistent storage directory containing `database.json`; uploads live under `DATA_DIR/uploads`. Back up both the JSON and uploads. The user declined new hosting charges. `render.yaml` retains the Free plan, adds no paid disk and holds deployment pending durable external storage. No hosting settings have been changed. The current JSON/filesystem runtime must not be activated on ephemeral production storage. A future external database/media adapter is still required for the free-hosting path. Restore the latest complete database, uploads and private runtime configuration before starting the upgrade. A missing database deliberately stops startup rather than replacing the team. Render's default filesystem is ephemeral; persistent disks are available for paid services ([Render documentation](https://render.com/docs/disks)). If a database is missing, startup requires `BOOTSTRAP_PIN` of at least 8 characters or a restored backup; startup never silently creates an account with a known password.

Sessions use opaque bearer tokens stored in sessionStorage. They expire after 12 hours and after server restart. Roles are checked against current server data on every request. PIN changes invalidate other sessions; deleting a user invalidates that user's sessions. The three mock personas cannot log in directly. Only a founder-authenticated session can enter/leave simulation, and simulated mutations use the simulated role.

## API and data integrity

- `/api/login`, `/api/register` and minimal invite validation are public and rate limited. Registration checks exact case-insensitive identifiers and consumes an unused server invite in the same write as account creation; client-supplied roles are ignored.
- `/api/data` requires authentication and never returns PINs/hashes. The returned member list excludes developer personas; only admins receive invites.
- Core record edits/deletes require admin and an expected revision. Reviewers may create records, comment/reply and update handoff. Viewer accounts can read, with view telemetry only.
- Whole-client `/api/sync` is disabled. Founder maintenance uses explicit revision-checked endpoints. Record import deliberately preserves current users and invites. Sample-data loading uses a private, revision-checked batch endpoint with an operation ID; it appends atomically and cannot be invoked by other accounts.
- Profile updates can only target the caller. Role updates require admin; founder and mock roles cannot be changed through member management.
- Media writes require a writable role, allow only known image/audio/video MIME types and cap uploads at 50 MB. Media is served by unguessable shared URLs with `nosniff` and restrictive CSP. New media never falls back to IndexedDB/blob URLs; legacy local video links still need re-uploading from their original device.
- Settings are server-backed and compare the prior settings snapshot. Mutations report failures without clearing record/comment drafts. Main edit forms keep their opening revision, so background polling cannot silently override concurrent edits.

## Before every commit or push

Do not overwrite the database using a sanitized `/api/data` response. Run `npm run backup:live` immediately before each commit or push. It first retrieves `/api/data` and, for the secured server, retrieves `/api/backup` as the founder to obtain the complete snapshot. It validates the snapshot before replacing `server/data/database.json` atomically. Supply `VITCHA_SESSION_TOKEN`, or `VITCHA_ID` and `VITCHA_PIN`, through the environment; do not put credentials in tracked files. `VITCHA_SERVER_URL` can override the default Render endpoint. Stop any local writer before replacing its database. Both deployed endpoints were backed up separately and compared. The original endpoint contains one additional account, the updated primary avatar and additional notifications; source records match. Versioned snapshots are stored privately under `.private/backups/`. `node scripts/install-git-guards.mjs` installs non-destructive pre-commit and pre-push guards, which run the live backup automatically and block publication on failure. Runtime data is no longer tracked in new commits; it remains on disk and in private snapshots. Existing repository history is not rewritten by this change.

## Local development and verification

Start the backend with `PORT=3001 npm start`, and run `npm run dev` in another terminal. Vite proxies `/api` and `/uploads` to localhost:3001; `VITCHA_DEV_API` can override the target. Use a temporary `DATA_DIR` and `BOOTSTRAP_PIN` when starting with an empty database.

- `npm test`: real HTTP endpoint tests for authentication, all roles, concurrent registrations/comments/replies, stale edits/deletes, session revocation, media validation, safe import and disk/network failure behavior.
- `npm run test:browser`: Chrome tests against a disposable database and fixture accounts. It covers desktop/mobile layout, login, viewer controls, overlapping photo jobs, inline image replacement, retained drafts after a failed save, and invalid invitations. Install Chrome first. On a supported host, install WebKit and use `TEST_WEBKIT=1 npm run test:browser` for the additional engine. Ports 3901 and 4173 must be free.
- `npm run typecheck` and `npm run build`: TypeScript and production build.

Browser tests do not use the real Render database. WebKit could not start on this macOS 14 host: its frozen runtime rejects Playwright’s `PushAPIEnabled` setting. Safari/WebKit has not passed QA; run the optional WebKit project on a supported host. Final device QA should include native iPhone/Android keyboards, camera/HEIC support, GPS permissions, large uploads and production cold starts. JSON atomic rename protects normal write failures, not disk loss; retain independent backups.

## Verification result — 2026-10-28

- Node integration/stability/map style tests: 38 passed, 0 failed.
- Chrome browser workflows on the compiled production build: 20 passed, 0 failed, including 320/390/768 px layouts and 1440 px desktop. These are emulated viewport tests, not physical device results.
- Production build and its TypeScript build passed; GitHub Pages fallback and `.nojekyll` are restored by postbuild. Map and record dialogs load in separate chunks; the main bundle is about 397 kB (101 kB gzip) for the initial application. The English vector-map update adds a separately loaded WebGL renderer (~1.24 MB, 342 kB gzip) and worker (~520 kB); Vite warns about that optional map chunk.
- Full dependency audit: 0 known vulnerabilities reported. `git diff --check` passed.
- Branch: `main`; changes are uncommitted. No commit/push/deployment was performed. `server/data/database.json` contains the validated live backup, including the current profile image; it is excluded from the delivery archive. Tests used disposable databases.
- Safari/WebKit remains unverified due to the host runtime incompatibility described above. Production persistent storage and real-device QA remain deployment prerequisites.

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
- Restore the latest complete database and uploads to persistent storage, configure `DATA_DIR`, and run **one** Node process. Frontend and backend must be upgraded together because sessions are now mandatory.
- The Render YAML retains Free hosting. Do not activate this version until durable storage is connected and all migrated records/media have been verified. For GitHub Pages, publish the contents of `dist` only with the matching updated backend.
- Before each commit/push, perform the live backup procedure above. Release work is published to `codex/vitcha-security-release`, which does not deploy production. GitHub Actions automatically runs API tests, a production build and browser workflows on pushes and pull requests.

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
- **Git branch and commit status:** release branch `codex/vitcha-security-release`; production `main` is unchanged. No live deployment or billing change. The source, compiled UI, tests and automated verification workflow are prepared for code publication. Runtime data and private configuration are excluded from the release branch and ZIP.

### Additional verification evidence

The Chrome production suite covers member management, private-control visibility, named invitation copy, existing-account login, map/feed isolation, complete reviewer product curation and reordering, viewer read-only behavior, immediate avatar persistence after reload, failed audio retry, actual audio/video decoding, and failed broadcast acknowledgement. Server tests cover other-admin role changes, private operations for every ordinary role, atomic bulk curation and unchanged source records. No real members, records, passwords or notifications were changed on the live service.

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

The reference SuperiCez Studio uses Render Free with Supabase, plus a Google Drive media integration. Google Drive is suitable for media and private versioned backups; account creation, single-use invitations and permission changes need database transactions. VITCHA has not yet been migrated to Supabase or Drive. The connected Supabase organization already has two active free projects and a quota warning; capacity must be resolved without mixing or overwriting another application’s data. The chat’s Drive connector is not an application OAuth grant. VITCHA needs its own authorized Drive connection before automatic runtime uploads can operate.
