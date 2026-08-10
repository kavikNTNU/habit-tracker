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

### 12. Habit streaks  [x] done
**Deliverable:** Each habit shows its current streak (consecutive days done), computed with a real loop.
**Concepts:** loops, conditionals (deepened), date-handling (deepened), what-is-a-test (deepened — unit test vs. integration test)
**Tasks:**
- [x] 12.1 Write calculateStreak(dates) as a small pure function in its own file, with unit tests proving it handles a real streak, a broken streak, and no logs at all (plus a referenceDate parameter fix for non-reproducible date-dependent tests)
- [x] 12.2 Wire the streak calculation into GET /api/habits so each habit's response includes its current streak (verified against real seeded multi-day data, not just the trivial one-day case)
- [x] 12.3 Display the streak on the frontend next to each habit

### 13. Shared fetch helpers  [x] done
**Deliverable:** All 8 fetch call sites in script.js go through two small shared helpers (postJSON, getJSON) instead of repeating the same boilerplate; one intentional exception left as raw fetch since it didn't fit either helper's shape.
**Concepts:** functions (deepened — real DRY refactor), promises-and-then (deepened)
**Tasks:**
- [x] 13.1 Write postJSON(url, data) and getJSON(url) as shared helper functions
- [x] 13.2 Refactor every fetch call site to use them, and manually re-verify every feature still works (signup, login, logout, add habit, mark done, history, admin stats)
- [x] 13.3 Run the full automated test suite to prove the refactor didn't break anything — the textbook use case for having tests in the first place (plus discovering the suite doesn't cover the frontend at all)

### 14. Frontend design polish  [x] done
**Deliverable:** A cleaner, more professional-looking UI built on a small CSS variable system, with working dark mode and fixed accessibility labels — kept deliberately simple, no new frameworks or build tools.
**Concepts:** css custom properties (new), accessibility basics (new)
**Tasks:**
- [x] 14.1 Introduce CSS custom properties for a small, deliberate color palette, and refactor existing hardcoded colors to use them
- [x] 14.2 Improve typography, spacing, and button/card styling using the new variables (plus two real bugs caught by testing in the browser rather than just reading the diff: a `#auth-section` ID selector silently beating `.hidden`'s class selector on specificity, and `.done`'s opacity fading the buttons/history list along with the habit name, fixed by scoping it to a new `.habit-name` span)
- [x] 14.3 Add a dark mode toggle, reusing the variable system from 14.1 (plus localStorage for persisting the choice across reloads)
- [x] 14.4 Fix the accessibility gap from the audit: add real `<label>` elements to every form input (username, password, new-habit) — a real fix over placeholder-only fields, not just cosmetic, since placeholder text isn't reliably exposed as a field's accessible name

### 15. Stats & visualizations  [x] done
**Deliverable:** Each habit shows a simple 30-day activity heatmap plus two summary numbers — completion rate over the last 30 days and longest-ever streak (alongside the current streak already shown) — built with plain HTML/CSS/JS, no charting library or new dependency.
**Concepts:** data aggregation (new), CSS grid (new), loops/date-handling (deepened)
**Tasks:**
- [x] 15.1 Add a GET /api/habits/:id/stats route that queries the last 30 days of logs and returns per-day done/not-done, a completion rate, and the longest-ever streak (a new calculation distinct from calculateStreak's "current streak counting back from today"). Spec and plan written first (`learning/specs/2026-08-10-habit-stats-route*.md`); added `longestStreakEver` in `streak.js` (full-history scan, distinct from `calculateStreak`'s current-streak-from-today) plus unit tests, then the route itself with route tests. Verified against real seeded data — a habit with a 4-day run in mid-July but only a 1-day current streak correctly reported `longestStreak: 4`, proving it scans full history rather than just the recent tail.
- [x] 15.2 Build a small CSS Grid heatmap on the frontend: 30 squares per habit, colored based on that day's done/not-done. Used `display: grid; grid-template-columns: repeat(7, 1fr)`, letting the browser auto-wrap 30 cells into weekly rows (first real use of CSS Grid), plus `aspect-ratio: 1` to keep cells square. Lazy-loaded behind a new "Stats" toggle button, same pattern as the existing "History" button, so `/stats` only fires on demand.
- [x] 15.3 Display completion rate and longest streak as text next to each habit's heatmap, and manually verify against real seeded multi-week data. Combined naturally with 15.2 since both render together on the same toggle. Verified in both light and dark mode in the browser — the "Sleep 8 hours" habit's 4-day mid-July run rendered as 4 consecutive green cells with "6/30 days — longest streak: 4" shown above it.

### 16. Habit resource links  [ ] not started
**Deliverable:** Each habit can optionally have a link to an external article/resource about that habit, editable and shown as a real clickable link — the parked idea from section 14 finally scoped.
**Concepts:** schema-design (deepened — nullable optional column), crud-operations (deepened — update, not just create)
**Tasks:**
- [ ] 16.1 Add a nullable `resource_url` column to the habits table via a guarded migration, and a route to update it
- [ ] 16.2 Add a small form/input on the frontend to set or edit a habit's resource link
- [ ] 16.3 Render the link, when set, as a real `<a href>` next to the habit, opening in a new tab

### 17. Custom habit types & units  [ ] not started
**Deliverable:** A habit can be tracked as a simple yes/no (today's model) or as a numeric quantity with a unit (e.g. "8 glasses", "30 minutes"), and logging asks for a number when relevant.
**Concepts:** schema-design (deepened), conditionals (deepened — branching UI/logic per habit type)
**Tasks:**
- [ ] 17.1 Add `type` and `unit` columns to habits, defaulting existing habits to today's plain yes/no type
- [ ] 17.2 Update the log route to accept an optional numeric `amount`, and the create-habit form to pick a type/unit
- [ ] 17.3 Update the frontend to show a number input instead of just "Mark done" for quantity-type habits, and display the logged amount + unit in history

### 18. Weekly goals  [ ] not started
**Deliverable:** A habit can be tracked against a weekly target (e.g. "exercise 3x/week") instead of daily, with progress shown as "2/3 this week".
**Concepts:** date-handling (deepened — week boundaries), sql-basics (deepened — grouping by week)
**Tasks:**
- [ ] 18.1 Add a `frequency` (daily/weekly) and `weekly_target` column to habits, building on the type/unit groundwork from section 17
- [ ] 18.2 Write a query/function that counts a habit's logs within the current calendar week for weekly-type habits
- [ ] 18.3 Display weekly progress ("2/3 this week") instead of a daily streak for weekly-type habits, and verify against real seeded data spanning a week boundary

### 19. Reminders  [ ] not started
**Deliverable:** An opt-in browser reminder (e.g. "you haven't logged water today") shown via the Notifications API while the app is open — no backend job scheduler, no email/push infrastructure.
**Concepts:** browser Notifications API (new), browser permissions (new)
**Tasks:**
- [ ] 19.1 Request notification permission from the user via a button, and understand what "opt-in" means for browser permissions
- [ ] 19.2 On page load (or on demand via a button), check which habits aren't done today and fire a real browser notification for them
- [ ] 19.3 Add a toggle to enable/disable reminders, persisted the same way as dark mode (localStorage)

### 20. Sharing / multi-user visibility  [ ] not started
**Deliverable:** A user can share read-only visibility of one habit's streak/progress with another registered user (not full account sharing) — the biggest structural change in the parking lot, saved for last.
**Concepts:** authorization models (new — deepens protected-routes beyond "yours vs. not yours"), schema-design (deepened — a join/permissions table)
**Tasks:**
- [ ] 20.1 Design and add a `shares` table (habit_id, shared_with_user_id), and reason through why this is safer than exposing another user's full account
- [ ] 20.2 Add a route for a user to share one of their habits by username, and a route for the recipient to view habits shared with them (read-only, no mark-done)
- [ ] 20.3 Add a simple "Shared with me" section on the frontend showing read-only streaks
