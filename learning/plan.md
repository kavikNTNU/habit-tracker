# Learning plan: Habit & Goal Tracker

## Locked decisions
- Language: JavaScript (frontend + backend) — one language removes an entire axis of overload for a first project
- Frontend: Plain HTML/CSS/JS, no framework — learn what React later abstracts, instead of hiding it
- Backend: Express — thin layer over Node, huge community, minimal boilerplate
- Database: SQLite — real SQL, zero server setup; Supabase rejected because it would hide the backend/API/auth layers this project exists to teach
- Deployment: Render — git-push deploys, huge beginner documentation; SQLite persistence caveat tested directly in section 9 (created a live habit, triggered a redeploy, confirmed it and the account were wiped). Real fixes, parked for v2: (a) a Render persistent disk (paid tier), attaching a real volume that survives redeploys, or (b) migrating from a SQLite file to a hosted database service (e.g. Render's managed PostgreSQL) — the more production-correct fix, and the natural next step for the SQL skills already built here

## Sections
### 1. A page that renders locally  [x] done
**Deliverable:** Open a file, see a hardcoded list of habits on screen.
**Concepts:** html-basics, browser-rendering, git-basics
**Tasks:**
- [x] 1.1 Set up git so the project has a save-and-undo history from the start (pulled forward from section 9: also connect to a GitHub remote now, at the learner's request — section 9 will just push to it instead of setting it up)
- [x] 1.2 Create `index.html` with a basic page skeleton and see a blank page render in the browser
- [x] 1.3 Add a hardcoded list of habits to the page and see it show up in the browser

### 2. Styling + interactivity  [x] done
**Deliverable:** The page looks like an app; clicking "mark done" visibly changes it (nothing saved yet).
**Concepts:** css-basics, dom-manipulation, event-listeners
**Tasks:**
- [x] 2.1 Create a separate CSS file, link it to `index.html`, and add basic styling so the page looks less like plain HTML
- [x] 2.2 Add a "mark done" button next to each habit in the HTML (plus an unplanned detour: caught and fixed a deleted `</head>` tag using `git diff`)
- [x] 2.3 Create a separate JS file, link it, and write an event listener that visually marks a habit as done when its button is clicked

### 3. A simple local server  [x] done
**Deliverable:** Visiting localhost:3000 (ended up 3001, port 3000 was taken) serves the page instead of opening the file directly.
**Concepts:** nodejs-runtime, npm-and-package-json, express-backend, express-routes, localhost-and-ports
**Tasks:**
- [x] 3.1 Turn this folder into an npm project (`npm init`) and tour the resulting `package.json`
- [x] 3.2 Install Express (`npm install express`) and tour what that created (`node_modules`, `package-lock.json`) — plus added `.gitignore` for `node_modules`
- [x] 3.3 Write a minimal Express server that serves `index.html`, run it, and visit `localhost:3001` in the browser

### 4. Talking to the server (APIs)  [x] done
**Deliverable:** Clicking "mark done" sends a real request the server receives and logs (still nothing permanent).
**Concepts:** http-methods, fetch-api, json, request-response-cycle
**Tasks:**
- [x] 4.1 Add an explicit Express route that receives a POST request and logs it on the server (verified manually with Invoke-RestMethod before wiring up the button)
- [x] 4.2 Update script.js to send a real fetch() request to that route when a button is clicked
- [x] 4.3 Watch the full round trip: click in the browser, see it logged on the server, inspect it in browser dev tools

### 5. Remembering things (database)  [x] done
**Deliverable:** Habits and logs survive a server restart.
**Concepts:** sqlite-database, sql-basics, schema-design, express-db-integration
**Tasks:**
- [x] 5.1 Install better-sqlite3, create a database file with a habits table and a logs table, seeded with the current 3 habits (plus a real npm supply-chain-security detour: approving better-sqlite3's blocked install script)
- [x] 5.2 Update the POST /api/log route to insert a real row into the database instead of console.log
- [x] 5.3 Add a GET /api/habits route and render the habit list dynamically from the database instead of hardcoded HTML; verify persistence by restarting the server (plus a real "forgot to restart the server" 404 debugging detour)

### 6. The core feature — the daily loop  [x] done
**Deliverable:** Create a habit, log it today, see the last 7 days of history.
**Concepts:** date-handling, crud-operations, querying-by-range
**Tasks:**
- [x] 6.1 Add a form to create a new habit: HTML form + a POST /api/habits route that inserts it into the database
- [x] 6.2 Show each habit's real "already done today" state on page load, comparing today's date against its logged_at entries (plus made today's log entry properly toggleable via INSERT/DELETE, and diagnosed an apparent stuck-habit bug that turned out to be correct odd-click-count behavior)
- [x] 6.3 Add a way to view each habit's last 7 days of history: a date-range SQL query, a route, and a place to display it (plus a show/hide toggle refinement)

### 7. Authentication  [x] done
**Deliverable:** The app requires logging in before you can see or edit your habits.
**Concepts:** sessions, password-hashing, protected-routes, environment-variables
**Tasks:**
- [x] 7.1 Install bcryptjs + express-session, create a users table, and build a signup route that hashes and stores a password (also added user_id to habits and removed the old auto-seeded habits, since habits now belong to a specific user)
- [x] 7.2 Build a login route and a simple login/signup page; wire up sessions so a successful login is remembered (plus fixing a real login-screen flash caused by async timing)
- [x] 7.3 Protect the habit API routes behind an auth-check, and add logout (plus scoping all habit/log/history data by user_id, fixing a username case-sensitivity bug, and cleaning up test accounts down to one: testuser123)
- [x] 7.4 Move the session secret into a .env file instead of hardcoding it in server.js
- [x] 7.5 Add an admin role: a role column on users, an admin-only route aggregating all users' habit stats, and a simple view for it (added mid-section at the learner's request, pushing section 8 back slightly; also fixed a username-whitespace duplicate-account bug found along the way)

### 8. Tests and safety rails  [x] done
**Deliverable:** Automated tests catch it if you accidentally break something.
**Concepts:** what-is-a-test, test-runner, input-validation
**Tasks:**
- [x] 8.1 Set up Node's built-in test runner; write a first automated test for something you've been checking by hand (auth protection on /api/habits)
- [x] 8.2 Add real input validation (reject empty/whitespace-only habit and account names), and write tests confirming both the rejection and that valid input still works (plus fixing a frontend bug where a failed request rendered a habit literally named "undefined")
- [x] 8.3 Add tests covering the core create → log → toggle flow, then deliberately break something on purpose and watch a test catch it (real break-fix-verify cycle completed)

### 9. Going live (deployment)  [x] done
**Deliverable:** The app is live at a real URL, usable from your phone.
**Concepts:** deploying-to-render, production-env-variables, persistent-storage-caveat
**Tasks:**
- [x] 9.1 Prepare the app for deployment: make the port configurable via process.env.PORT, and push the final code to GitHub
- [x] 9.2 Create a Render web service connected to the repo, configure the SESSION_SECRET environment variable there, deploy, and confirm the live URL actually works (signup, login, habits)
- [x] 9.3 Deliberately test the SQLite persistence caveat on the live deployment, confirm what actually happens, and document the honest tradeoff and real fixes as a parked next step

### 10. Project structure cleanup  [x] done
**Deliverable:** Frontend files live in `public/`, only that folder is served, and server.js/db.js are no longer downloadable as static files (a real vulnerability confirmed via curl, not just a style preference).
**Concepts:** node-path-module, express-routes (deepened), sql-basics/schema-design (deepened, if routes split happens later)
**Tasks:**
- [x] 10.1 Create public/, move index.html/style.css/script.js into it, update express.static to serve only that folder via path.join, and verify locally that the app still works and the server source is no longer reachable
- [x] 10.2 Push the fix and verify it closes the same vulnerability on the live Render deployment

### 11. Bug fixes from the improvement audit  [x] done
**Deliverable:** Login can't crash on a missing username, and auth error messages show the server's real reason instead of one generic message.
**Concepts:** input-validation (deepened), request-response-cycle (deepened)
**Tasks:**
- [x] 11.1 Fix the login route's missing (req.body.username || '') guard, and update tryAuth() to display the server's real error text instead of a hardcoded generic message

### 12. Habit streaks  [ ] not started
**Deliverable:** Each habit shows its current streak (consecutive days done), computed with a real loop.
**Concepts:** loops, conditionals (deepened), date-handling (deepened), what-is-a-test (deepened — unit test vs. integration test)
**Tasks:**
- [x] 12.1 Write calculateStreak(dates) as a small pure function in its own file, with unit tests proving it handles a real streak, a broken streak, and no logs at all (plus a referenceDate parameter fix for non-reproducible date-dependent tests)
- [x] 12.2 Wire the streak calculation into GET /api/habits so each habit's response includes its current streak (verified against real seeded multi-day data, not just the trivial one-day case)
- [ ] 12.3 Display the streak on the frontend next to each habit
