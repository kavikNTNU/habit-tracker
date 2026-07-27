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

### 2. Styling + interactivity  [ ] not started
**Deliverable:** The page looks like an app; clicking "mark done" visibly changes it (nothing saved yet).
**Concepts:** css-basics, dom-manipulation, event-listeners

### 3. A simple local server  [ ] not started
**Deliverable:** Visiting localhost:3000 serves the page instead of opening the file directly.
**Concepts:** nodejs-runtime, npm-and-package-json, express-backend, express-routes, localhost-and-ports

### 4. Talking to the server (APIs)  [ ] not started
**Deliverable:** Clicking "mark done" sends a real request the server receives and logs (still nothing permanent).
**Concepts:** http-methods, fetch-api, json, request-response-cycle

### 5. Remembering things (database)  [ ] not started
**Deliverable:** Habits and logs survive a server restart.
**Concepts:** sqlite-database, sql-basics, schema-design, express-db-integration

### 6. The core feature — the daily loop  [ ] not started
**Deliverable:** Create a habit, log it today, see the last 7 days of history.
**Concepts:** date-handling, crud-operations, querying-by-range

### 7. Authentication  [ ] not started
**Deliverable:** The app requires logging in before you can see or edit your habits.
**Concepts:** sessions, password-hashing, protected-routes, environment-variables

### 8. Tests and safety rails  [ ] not started
**Deliverable:** Automated tests catch it if you accidentally break something.
**Concepts:** what-is-a-test, test-runner, input-validation

### 9. Going live (deployment)  [ ] not started
**Deliverable:** The app is live at a real URL, usable from your phone.
**Concepts:** deploying-to-render, production-env-variables, persistent-storage-caveat
