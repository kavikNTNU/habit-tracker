# Knowledge graph

<!-- statuses: seed → introduced → practicing → understood -->
<!-- seed: not yet taught | introduced: explained once | practicing: used it with help | understood: explained in own words + passed a quiz -->

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
- evidence: extracted duplicated rendering logic into a named function (renderHabit), understood it as reusable code rather than inline duplication, and correctly used it via habits.forEach(renderHabit)

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
- evidence: after `querySelectorAll`/`classList.toggle` were explained line by line, correctly predicted and confirmed that clicking a button strikes through its habit, and clicking again reverts it; later used createElement/appendChild to build the entire habit list dynamically from database data instead of hardcoded HTML

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
- evidence: used app.use(express.static(...)) to serve files; wrote explicit app.get('/api/habits') and app.post('/api/log') routes reading from and writing to the database

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
- status: introduced
- depends-on: fetch-api
- introduced: 2026-07-27
- last-reviewed: 2026-07-27
- evidence: taught the two-step .then() chain (parse response, then use the data) while building the dynamic habit list; not yet independently exercised with its own prediction, so capped below practicing

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
- evidence: wrote CREATE TABLE statements, a SELECT COUNT(*) check, and parameterized INSERT statements; understood why `?` placeholders prevent SQL injection instead of pasting values directly into SQL text

## schema-design
- status: practicing
- depends-on: sql-basics
- introduced: 2026-07-27
- last-reviewed: 2026-07-27
- evidence: correctly reasoned through a two-table design (habits + logs linked by habit_id) over one table, citing less duplication and easier renames

## express-db-integration
- status: practicing
- depends-on: express-routes, sqlite-database
- introduced: 2026-07-27
- last-reviewed: 2026-07-27
- evidence: wrote a route that looks up a habit by name and inserts a log row via better-sqlite3; verified real persisted rows via an ad hoc query, and correctly reasoned that every click always INSERTs a new row rather than toggling/removing one, distinguishing it from the purely visual frontend toggle

## date-handling
- status: seed
- depends-on: javascript-fullstack
- introduced: —
- last-reviewed: —
- evidence: —

## crud-operations
- status: practicing
- depends-on: express-db-integration
- introduced: 2026-07-28
- last-reviewed: 2026-07-28
- evidence: built the full Create flow (form → POST /api/habits → INSERT), verified the new habit persists across a page refresh; independently articulated, before being taught, that "done today" should be a derived read from logs rather than deleting or permanently checking off the habit itself

## querying-by-range
- status: seed
- depends-on: sql-basics, date-handling
- introduced: —
- last-reviewed: —
- evidence: —

## sessions
- status: seed
- depends-on: request-response-cycle
- introduced: —
- last-reviewed: —
- evidence: —

## password-hashing
- status: seed
- depends-on: none
- introduced: —
- last-reviewed: —
- evidence: —

## protected-routes
- status: seed
- depends-on: sessions, express-routes
- introduced: —
- last-reviewed: —
- evidence: —

## environment-variables
- status: seed
- depends-on: none
- introduced: —
- last-reviewed: —
- evidence: —

## what-is-a-test
- status: seed
- depends-on: functions
- introduced: —
- last-reviewed: —
- evidence: —

## test-runner
- status: seed
- depends-on: what-is-a-test
- introduced: —
- last-reviewed: —
- evidence: —

## input-validation
- status: seed
- depends-on: request-response-cycle
- introduced: —
- last-reviewed: —
- evidence: —

## deploying-to-render
- status: seed
- depends-on: git-basics, render-deployment
- introduced: —
- last-reviewed: —
- evidence: —

## production-env-variables
- status: seed
- depends-on: environment-variables, deploying-to-render
- introduced: —
- last-reviewed: —
- evidence: —

## persistent-storage-caveat
- status: seed
- depends-on: sqlite-database, deploying-to-render
- introduced: —
- last-reviewed: —
- evidence: —

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
