# Knowledge graph

<!-- statuses: seed → introduced → practicing → understood -->
<!-- seed: not yet taught | introduced: explained once | practicing: used it with help | understood: explained in own words + passed a quiz -->

## node-path-module
- status: practicing
- depends-on: nodejs-runtime
- introduced: 2026-07-30
- last-reviewed: 2026-07-30
- evidence: used path.join(__dirname, 'public') to fix a real, curl-verified vulnerability (server.js/db.js/package.json were downloadable as static files); understood why manual string concatenation of paths breaks across operating systems; verified the same fix on the live Render deployment, not just locally

## javascript-fullstack
- status: introduced
- depends-on: none
- introduced: 2026-07-27
- last-reviewed: 2026-07-27
- evidence: explained why one language for both frontend/backend lowers overload for a beginner

## vanilla-frontend-no-framework
- status: introduced
- depends-on: javascript-fullstack
- introduced: 2026-07-27
- last-reviewed: 2026-07-27
- evidence: explained why skipping a framework first makes the later jump to React easier

## express-backend
- status: practicing
- depends-on: nodejs-runtime
- introduced: 2026-07-27
- last-reviewed: 2026-07-27
- evidence: explained why a thin framework beats a heavy one (NestJS) for a beginner; wrote and ran a real Express server serving index.html, and explained the client-server distinction vs. opening the file directly

## sqlite-database
- status: practicing
- depends-on: sql-basics
- introduced: 2026-07-27
- last-reviewed: 2026-07-27
- evidence: understood why a file-based DB removes setup pain vs. Postgres; understood why a managed service (Supabase) would hide the exact layers being learned; installed better-sqlite3 (approving its blocked install script), wrote db.js, ran it, and confirmed habits.db was created; confirmed both habits and logs survive a full server restart, the section's actual deliverable

## render-deployment
- status: introduced
- depends-on: git-basics
- introduced: 2026-07-27
- last-reviewed: 2026-07-27
- evidence: corrected on first pass — initially had control/black-box backwards for managed platform vs. VPS, then confirmed the corrected explanation

## variables
- status: seed
- depends-on: none
- introduced: —
- last-reviewed: —
- evidence: —

## functions
- status: practicing
- depends-on: variables
- introduced: 2026-07-28
- last-reviewed: 2026-07-28
- evidence: extracted duplicated rendering logic into a named function (renderHabit), understood it as reusable code rather than inline duplication, and correctly used it via habits.forEach(renderHabit); later extracted a shared async test helper (signUpAndGetCookie) into its own module and imported it via destructuring (const { signUpAndGetCookie } = require('./helpers'))

## loops
- status: seed
- depends-on: variables
- introduced: —
- last-reviewed: —
- evidence: —

## conditionals
- status: seed
- depends-on: variables
- introduced: —
- last-reviewed: —
- evidence: —

## arrays-and-objects
- status: seed
- depends-on: variables
- introduced: —
- last-reviewed: —
- evidence: —

## html-basics
- status: practicing
- depends-on: none
- introduced: 2026-07-27
- last-reviewed: 2026-07-27
- evidence: wrote real content into title/h1 elements and a ul/li list of own real habits (water, sleep, exercise), all in own editor; correctly predicted the list would render as three bullet points and confirmed it in the browser

## css-basics
- status: practicing
- depends-on: html-basics
- introduced: 2026-07-27
- last-reviewed: 2026-07-27
- evidence: filled in a real background-color value after selectors/properties were explained; correctly predicted the page would look "more sorted and clean" and confirmed habit items rendered as spaced, rounded cards

## dom-manipulation
- status: practicing
- depends-on: html-basics, functions
- introduced: 2026-07-27
- last-reviewed: 2026-07-27
- evidence: after `querySelectorAll`/`classList.toggle` were explained line by line, correctly predicted and confirmed that clicking a button strikes through its habit, and clicking again reverts it; later used createElement/appendChild to build the entire habit list dynamically from database data instead of hardcoded HTML; built a show/hide toggle using innerHTML clearing and a children.length check

## event-listeners
- status: practicing
- depends-on: dom-manipulation
- introduced: 2026-07-27
- last-reviewed: 2026-07-27
- evidence: after addEventListener was explained, correctly observed the click-triggered toggle behavior in the browser, matching the code's logic to the visible outcome; predicted a form submit would reload the page, observed it didn't, and correctly attributed that to event.preventDefault()

## browser-rendering
- status: practicing
- depends-on: html-basics
- introduced: 2026-07-27
- last-reviewed: 2026-07-27
- evidence: predicted only the tab title would show; after opening index.html, correctly identified both the tab title and the body heading as separate rendered outputs

## git-basics
- status: practicing
- depends-on: none
- introduced: 2026-07-27
- last-reviewed: 2026-07-27
- evidence: ran git init/add/commit/branch rename/remote add/push in own terminal; correctly predicted outcomes of git add, git commit, git remote -v, and git push each time; independently noticed an extra pushed file (skills-lock.json) without being prompted; explained why node_modules belongs in .gitignore but package-lock.json does not

## nodejs-runtime
- status: practicing
- depends-on: javascript-fullstack
- introduced: 2026-07-27
- last-reviewed: 2026-07-27
- evidence: ran `node server.js` directly in own terminal to execute JavaScript outside the browser; correctly identified that a running Node process doesn't pick up file edits automatically and needs a manual restart, after hitting a real 404 caused by exactly that

## npm-and-package-json
- status: practicing
- depends-on: nodejs-runtime
- introduced: 2026-07-27
- last-reviewed: 2026-07-27
- evidence: ran `npm init -y`, toured the generated package.json field by field; correctly connected "scripts" to what `npm run dev` will later execute, though initially over-framed the whole file as behavioral instructions (like CLAUDE.md) rather than a project manifest — corrected in discussion

## express-routes
- status: practicing
- depends-on: express-backend
- introduced: 2026-07-27
- last-reviewed: 2026-07-27
- evidence: used app.use(express.static(...)) to serve files; wrote explicit app.get('/api/habits') and app.post('/api/log') routes reading from and writing to the database; wrote a route with a URL parameter (/api/habits/:id/history) and correctly explained req.params vs req.body

## localhost-and-ports
- status: practicing
- depends-on: nodejs-runtime
- introduced: 2026-07-27
- last-reviewed: 2026-07-27
- evidence: hit a real port-3000-already-in-use conflict, self-resolved by switching to 3001; correctly articulated the difference between file:// access and a real localhost client-server request

## http-methods
- status: practicing
- depends-on: none
- introduced: 2026-07-27
- last-reviewed: 2026-07-27
- evidence: explained GET as "give me something" vs POST as "here's something, do something with it"; sent a real POST request with Invoke-RestMethod and correctly predicted the server would log it

## fetch-api
- status: practicing
- depends-on: http-methods, event-listeners
- introduced: 2026-07-27
- last-reviewed: 2026-07-27
- evidence: wrote a fetch() POST call from the click handler, correctly predicted both the strikethrough and the server-side log line, and correctly reasoned that state resets on reload because nothing is persisted yet; later used a GET fetch with a .then() chain to load and render habits dynamically from the database

## json
- status: practicing
- depends-on: none
- introduced: 2026-07-27
- last-reviewed: 2026-07-27
- evidence: sent a real JSON body ({habit: "water"}) in a POST request and saw it arrive intact as req.body on the server, and received a JSON response back

## promises-and-then
- status: practicing
- depends-on: fetch-api
- introduced: 2026-07-27
- last-reviewed: 2026-07-28
- evidence: taught the two-step .then() chain (parse response, then use the data) while building the dynamic habit list; later correctly diagnosed a real UI flash bug as an async-timing issue (the /api/me check taking a moment before the correct section could be shown), which was fixed by hiding both sections until the check resolves

## request-response-cycle
- status: practicing
- depends-on: http-methods, express-routes
- introduced: 2026-07-27
- last-reviewed: 2026-07-27
- evidence: sent a real POST request from a separate terminal; correctly predicted and confirmed the server logged the request body ("Received: water") and sent back a JSON response ("status: ok"); later confirmed the same round trip end-to-end from the browser via a real button click, inspected in dev tools Network tab (payload + response)

## sql-basics
- status: practicing
- depends-on: none
- introduced: 2026-07-27
- last-reviewed: 2026-07-27
- evidence: wrote CREATE TABLE statements, a SELECT COUNT(*) check, and parameterized INSERT statements; understood why `?` placeholders prevent SQL injection instead of pasting values directly into SQL text; later read an EXISTS subquery and a DELETE statement, and used raw SELECT queries to diagnose real data during debugging; correctly explained why LEFT JOIN kept a zero-habit user in an admin stats query where a plain JOIN would have silently dropped them, and why COUNT(DISTINCT habits.id) was needed to avoid overcounting after joining in logs

## schema-design
- status: practicing
- depends-on: sql-basics
- introduced: 2026-07-27
- last-reviewed: 2026-07-27
- evidence: correctly reasoned through a two-table design (habits + logs linked by habit_id) over one table, citing less duplication and easier renames; understood why CREATE TABLE IF NOT EXISTS can't retroactively add a column to an existing table, and why deleting local throwaway dev data was reasonable here vs. a real migration in production; understood UNIQUE as a database-enforced constraint, not just app logic; later saw a real guarded migration (PRAGMA table_info + ALTER TABLE) that preserved existing users/habits instead of wiping them, correctly predicting the difference from the earlier delete-and-recreate approach

## express-db-integration
- status: practicing
- depends-on: express-routes, sqlite-database
- introduced: 2026-07-27
- last-reviewed: 2026-07-27
- evidence: wrote a route that looks up a habit by name and inserts a log row via better-sqlite3; verified real persisted rows via an ad hoc query, and correctly reasoned that every click always INSERTs a new row rather than toggling/removing one, distinguishing it from the purely visual frontend toggle; later implemented real INSERT/DELETE toggle logic for "today," and diagnosed an apparent bug by querying raw data directly instead of guessing

## date-handling
- status: practicing
- depends-on: javascript-fullstack
- introduced: 2026-07-28
- last-reviewed: 2026-07-28
- evidence: understood date(logged_at) = date('now') as comparing calendar dates while ignoring time-of-day; when a habit appeared "stuck" as done, correctly reconciled it by reasoning that an odd number of toggle clicks (7) leaves a final logged state, rather than assuming a bug

## crud-operations
- status: practicing
- depends-on: express-db-integration
- introduced: 2026-07-28
- last-reviewed: 2026-07-28
- evidence: built the full Create flow (form → POST /api/habits → INSERT), verified the new habit persists across a page refresh; independently articulated, before being taught, that "done today" should be a derived read from logs rather than deleting or permanently checking off the habit itself

## querying-by-range
- status: practicing
- depends-on: sql-basics, date-handling
- introduced: 2026-07-28
- last-reviewed: 2026-07-28
- evidence: wrote a route with a URL parameter (:id) and a date('now', '-6 days') range query to fetch a habit's last 7 days of logs; end-to-end feature worked on first real test, then refined into a proper show/hide toggle

## sessions
- status: practicing
- depends-on: request-response-cycle
- introduced: 2026-07-28
- last-reviewed: 2026-07-28
- evidence: wired up express-session, set req.session.userId on login/signup, built /api/me to check login state, and verified a returning visitor stays logged in across a refresh via the session cookie; correctly explained why generic auth error messages avoid leaking which usernames exist; diagnosed a real duplicate-account bug (clicking "Sign up" instead of "Log in" creates a new empty account) and identified a case-sensitivity gap in username matching, fixed with .toLowerCase() normalization

## password-hashing
- status: practicing
- depends-on: none
- introduced: 2026-07-28
- last-reviewed: 2026-07-28
- evidence: installed bcryptjs, wrote a signup route using hashSync with a cost factor, and directly verified in the database that the stored value was a scrambled hash rather than the plaintext password; later used bcrypt.compareSync to verify a login without ever reversing the hash

## protected-routes
- status: practicing
- depends-on: sessions, express-routes
- introduced: 2026-07-28
- last-reviewed: 2026-07-28
- evidence: wrote a requireAuth middleware and applied it to all habit routes; scoped every habit/log/history query by user_id to prevent cross-user data leaks; verified via a direct unauthenticated API call that it correctly returns 401, and understood why PowerShell displays that as a red error despite it being the correct behavior; later added a role column and a requireAdmin middleware chained after requireAuth, correctly distinguishing 401 (not logged in) from 403 (logged in but not authorized), and understood why admin accounts must be created outside the public signup flow

## environment-variables
- status: practicing
- depends-on: none
- introduced: 2026-07-28
- last-reviewed: 2026-07-28
- evidence: generated a real random secret via crypto.randomBytes, moved it into .env (gitignored) with a safe .env.example template, wired up dotenv; correctly predicted a restart would log them out since the signing secret changed; understood process.env as a shared object of string values, and that one SESSION_SECRET signs every user's cookie rather than being per-user; recognized process.env.PORT as another platform-provided variable (assigned by the host, not chosen locally), with a `|| 3001` fallback for local dev

## what-is-a-test
- status: practicing
- depends-on: functions
- introduced: 2026-07-29
- last-reviewed: 2026-07-29
- evidence: wrote a real automated test (node:test + node:assert/strict) for something previously only checked by hand — auth protection on /api/habits — and correctly predicted it would pass; later deliberately broke the log-toggle logic, correctly predicted the flow test would fail, read a real AssertionError (0 !== 1) down to the exact failing line, and correctly reasoned that only tests exercising that specific code path could catch it

## test-runner
- status: practicing
- depends-on: what-is-a-test
- introduced: 2026-07-29
- last-reviewed: 2026-07-29
- evidence: ran `node --test`, read and understood the pass/fail summary output, and knew Node's built-in test runner needs no extra npm install; later wrote tests requiring real login (manually carrying a session cookie between requests) and unique per-run test data, growing the suite to 6 passing tests; completed a full break-fix-verify cycle on a real regression

## input-validation
- status: practicing
- depends-on: request-response-cycle
- introduced: 2026-07-29
- last-reviewed: 2026-07-29
- evidence: added trim-and-reject validation to POST /api/habits and POST /api/signup (empty/whitespace names, minimum password length), fixing the original stray ' '/'æ' habits from section 6; diagnosed and fixed a real frontend bug where an unchecked error response rendered as a habit literally named "undefined"; wrote and passed tests for both the rejection and the valid-input cases

## deploying-to-render
- status: practicing
- depends-on: git-basics, render-deployment
- introduced: 2026-07-29
- last-reviewed: 2026-07-29
- evidence: created a Render web service connected to the GitHub repo, configured build/start commands and a production SESSION_SECRET, deployed successfully, and verified real signup/login/habit-creation works end-to-end at the live URL; later pushed a real security fix and verified via curl that it correctly propagated to the live deployment

## production-env-variables
- status: practicing
- depends-on: environment-variables, deploying-to-render
- introduced: 2026-07-29
- last-reviewed: 2026-07-29
- evidence: understood Render's dashboard env var entry as the production equivalent of the local .env file, generated a separate secret for production rather than reusing the local one, and correctly reasoned why local test accounts (testuser123, admin) don't exist on the live deployment

## persistent-storage-caveat
- status: practicing
- depends-on: sqlite-database, deploying-to-render
- introduced: 2026-07-29
- last-reviewed: 2026-07-29
- evidence: correctly separated session persistence from data persistence when predicting the outcome; created a habit on the live deployment, triggered a real redeploy via git push, and directly confirmed the habit and account both vanished, matching the ephemeral-filesystem explanation; understood the two real production fixes (a paid persistent disk, or migrating to a hosted database) as parked next steps

## writing-a-good-plan
- status: introduced
- depends-on: none
- introduced: 2026-07-27
- last-reviewed: 2026-07-27
- evidence: walked through locking 5 stack decisions with tradeoffs and understanding checks before any code was written

## reviewing-a-diff
- status: practicing
- depends-on: none
- introduced: 2026-07-27
- last-reviewed: 2026-07-27
- evidence: read a real `git diff` output, correctly identified a deleted `</head>` line from the -/+ markers, reasoned about why the browser still rendered fine (self-corrected to "browsers auto-repair invalid structure" after an initial "ignore" guess), and applied the fix themselves

## agent-memory-and-claude-md
- status: seed
- depends-on: none
- introduced: —
- last-reviewed: —
- evidence: —
