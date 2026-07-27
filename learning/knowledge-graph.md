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
- status: introduced
- depends-on: nodejs-runtime
- introduced: 2026-07-27
- last-reviewed: 2026-07-27
- evidence: explained why a thin framework beats a heavy one (NestJS) for a beginner

## sqlite-database
- status: introduced
- depends-on: sql-basics
- introduced: 2026-07-27
- last-reviewed: 2026-07-27
- evidence: understood why a file-based DB removes setup pain vs. Postgres; understood why a managed service (Supabase) would hide the exact layers being learned

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
- status: seed
- depends-on: variables
- introduced: —
- last-reviewed: —
- evidence: —

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
- status: seed
- depends-on: none
- introduced: —
- last-reviewed: —
- evidence: —

## css-basics
- status: seed
- depends-on: html-basics
- introduced: —
- last-reviewed: —
- evidence: —

## dom-manipulation
- status: seed
- depends-on: html-basics, functions
- introduced: —
- last-reviewed: —
- evidence: —

## event-listeners
- status: seed
- depends-on: dom-manipulation
- introduced: —
- last-reviewed: —
- evidence: —

## browser-rendering
- status: seed
- depends-on: html-basics
- introduced: —
- last-reviewed: —
- evidence: —

## git-basics
- status: practicing
- depends-on: none
- introduced: 2026-07-27
- last-reviewed: 2026-07-27
- evidence: ran git init/add/commit/branch rename/remote add/push in own terminal; correctly predicted outcomes of git add, git commit, git remote -v, and git push each time; independently noticed an extra pushed file (skills-lock.json) without being prompted

## nodejs-runtime
- status: seed
- depends-on: javascript-fullstack
- introduced: —
- last-reviewed: —
- evidence: —

## npm-and-package-json
- status: seed
- depends-on: nodejs-runtime
- introduced: —
- last-reviewed: —
- evidence: —

## express-routes
- status: seed
- depends-on: express-backend
- introduced: —
- last-reviewed: —
- evidence: —

## localhost-and-ports
- status: seed
- depends-on: nodejs-runtime
- introduced: —
- last-reviewed: —
- evidence: —

## http-methods
- status: seed
- depends-on: none
- introduced: —
- last-reviewed: —
- evidence: —

## fetch-api
- status: seed
- depends-on: http-methods, event-listeners
- introduced: —
- last-reviewed: —
- evidence: —

## json
- status: seed
- depends-on: none
- introduced: —
- last-reviewed: —
- evidence: —

## request-response-cycle
- status: seed
- depends-on: http-methods, express-routes
- introduced: —
- last-reviewed: —
- evidence: —

## sql-basics
- status: seed
- depends-on: none
- introduced: —
- last-reviewed: —
- evidence: —

## schema-design
- status: seed
- depends-on: sql-basics
- introduced: —
- last-reviewed: —
- evidence: —

## express-db-integration
- status: seed
- depends-on: express-routes, sqlite-database
- introduced: —
- last-reviewed: —
- evidence: —

## date-handling
- status: seed
- depends-on: javascript-fullstack
- introduced: —
- last-reviewed: —
- evidence: —

## crud-operations
- status: seed
- depends-on: express-db-integration
- introduced: —
- last-reviewed: —
- evidence: —

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
- status: seed
- depends-on: none
- introduced: —
- last-reviewed: —
- evidence: —

## agent-memory-and-claude-md
- status: seed
- depends-on: none
- introduced: —
- last-reviewed: —
- evidence: —
