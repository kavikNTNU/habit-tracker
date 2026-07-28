# Learning plan: Habit & Goal Tracker

## Locked decisions
- Language: JavaScript (frontend + backend) — one language removes an entire axis of overload for a first project
- Frontend: Plain HTML/CSS/JS, no framework — learn what React later abstracts, instead of hiding it
- Backend: Express — thin layer over Node, huge community, minimal boilerplate
- Database: SQLite — real SQL, zero server setup; Supabase rejected because it would hide the backend/API/auth layers this project exists to teach
- Deployment: Render — git-push deploys, huge beginner documentation; SQLite persistence caveat to be solved explicitly in section 9, not hidden

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

### 6. The core feature — the daily loop  [ ] not started
**Deliverable:** Create a habit, log it today, see the last 7 days of history.
**Concepts:** date-handling, crud-operations, querying-by-range
**Tasks:**
- [x] 6.1 Add a form to create a new habit: HTML form + a POST /api/habits route that inserts it into the database
- [x] 6.2 Show each habit's real "already done today" state on page load, comparing today's date against its logged_at entries (plus made today's log entry properly toggleable via INSERT/DELETE, and diagnosed an apparent stuck-habit bug that turned out to be correct odd-click-count behavior)
- [ ] 6.3 Add a way to view each habit's last 7 days of history: a date-range SQL query, a route, and a place to display it

### 7. Authentication  [ ] not started
**Deliverable:** The app requires logging in before you can see or edit your habits.
**Concepts:** sessions, password-hashing, protected-routes, environment-variables

### 8. Tests and safety rails  [ ] not started
**Deliverable:** Automated tests catch it if you accidentally break something.
**Concepts:** what-is-a-test, test-runner, input-validation

### 9. Going live (deployment)  [ ] not started
**Deliverable:** The app is live at a real URL, usable from your phone.
**Concepts:** deploying-to-render, production-env-variables, persistent-storage-caveat
