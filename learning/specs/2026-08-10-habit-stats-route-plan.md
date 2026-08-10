# Habit Stats Route (task 15.1) Implementation Plan

**Goal:** Add `GET /api/habits/:id/stats`, returning a 30-day heatmap, 30-day completion rate, and longest-ever streak for one habit, per `learning/specs/2026-08-10-habit-stats-route.md`.

**Architecture:** One new pure function (`longestStreakEver`) added next to `calculateStreak` in `streak.js`, plus one new route in `server.js` that queries the last 30 days of logs (for the heatmap/completion rate) and all-time logs (for the longest streak), following the existing `/api/habits/:id/history` route's auth/ownership pattern.

**Tech Stack:** Express, better-sqlite3, Node's built-in `node:test` runner (matches the existing `streak.test.js` / `habits.test.js` style — no new dependencies).

## Global Constraints
- No new npm dependencies (spec: "no charting library or new dependency" applies to the whole feature, including the backend).
- Follow existing code style: plain `function` expressions, not arrow functions (see `server.js`, `streak.js`).
- Route must 404 (not 403/401) on a habit that doesn't exist or belongs to another user, matching `/api/habits/:id/history`.

---

### Task 1: `longestStreakEver` in `streak.js`

**Files:**
- Modify: `streak.js` (add function, keep `calculateStreak` unchanged)
- Test: `tests/streak.test.js` (add tests, keep existing ones unchanged)

**Interfaces:**
- Produces: `longestStreakEver(dates: string[]) => number` — `dates` is an array of distinct `'YYYY-MM-DD'` strings in **ascending** order (oldest first). Returns the length of the longest run of consecutive calendar days found anywhere in the array, or `0` for an empty array. This is what Task 2 calls with the habit's full log history.

- [ ] **Step 1: Write the failing tests**

Add to `tests/streak.test.js`:

```js
const { calculateStreak, longestStreakEver } = require('../streak');

test('longestStreakEver: no logs at all means zero', function () {
  assert.equal(longestStreakEver([]), 0);
});

test('longestStreakEver: an unbroken run counts every day', function () {
  const longest = longestStreakEver(['2026-07-01', '2026-07-02', '2026-07-03']);
  assert.equal(longest, 3);
});

test('longestStreakEver: a gap keeps the longer of the two runs', function () {
  const longest = longestStreakEver(['2026-07-01', '2026-07-02', '2026-07-03', '2026-07-10', '2026-07-11']);
  assert.equal(longest, 3);
});

test('longestStreakEver: the longest run can be earlier than the most recent one', function () {
  const longest = longestStreakEver([
    '2026-06-01', '2026-06-02', '2026-06-03', '2026-06-04', '2026-06-05',
    '2026-07-20', '2026-07-21'
  ]);
  assert.equal(longest, 5);
});
```

(The last test is the important one — it proves the function scans full history for the longest run, not just the most recent streak, which is exactly how it differs from `calculateStreak`.)

- [ ] **Step 2: Run the tests to verify they fail**

Run: `node --test tests/streak.test.js`
Expected: 4 new failures with "longestStreakEver is not a function" (or similar), existing `calculateStreak` tests still pass.

- [ ] **Step 3: Implement `longestStreakEver`**

Add to `streak.js`, above `module.exports`:

```js
function longestStreakEver(dates) {
  if (dates.length === 0) {
    return 0;
  }

  let longest = 1;
  let current = 1;

  for (let i = 1; i < dates.length; i++) {
    const previous = new Date(dates[i - 1]);
    const next = new Date(dates[i]);
    const dayDiff = (next - previous) / (1000 * 60 * 60 * 24);

    if (dayDiff === 1) {
      current = current + 1;
    } else {
      current = 1;
    }

    if (current > longest) {
      longest = current;
    }
  }

  return longest;
}
```

Update the export line:

```js
module.exports = { calculateStreak, longestStreakEver };
```

- [ ] **Step 4: Run the tests to verify they pass**

Run: `node --test tests/streak.test.js`
Expected: all tests pass (existing `calculateStreak` tests + 4 new ones).

- [ ] **Step 5: Commit**

```bash
git add streak.js tests/streak.test.js
git commit -m "Add longestStreakEver, a full-history streak calculation distinct from calculateStreak's current-streak-from-today"
```

---

### Task 2: `GET /api/habits/:id/stats` route

**Files:**
- Modify: `server.js` (add route; update the `require('./streak')` line)
- Test: `tests/habits.test.js` (add tests)

**Interfaces:**
- Consumes: `longestStreakEver(dates)` from Task 1 (`streak.js`).
- Consumes: `requireAuth` middleware and the `db` handle, both already defined earlier in `server.js`.
- Produces (for task 15.2/15.3 later): the JSON response shape from the spec — `{ daysLogged, totalDays, longestStreak, heatmap: [{ date, done }, ...] }`.

- [ ] **Step 1: Write the failing tests**

Add to `tests/habits.test.js`:

```js
test('GET /api/habits/:id/stats returns 404 for a habit that is not yours', async function () {
  const cookie = await signUpAndGetCookie();
  const otherCookie = await signUpAndGetCookie();

  const createResponse = await fetch('http://localhost:3001/api/habits', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Cookie: cookie },
    body: JSON.stringify({ name: 'Read a book' })
  });
  const habit = await createResponse.json();

  const response = await fetch(`http://localhost:3001/api/habits/${habit.id}/stats`, {
    headers: { Cookie: otherCookie }
  });

  assert.equal(response.status, 404);
});

test('GET /api/habits/:id/stats returns a 30-day heatmap and zeroed stats for a fresh habit', async function () {
  const cookie = await signUpAndGetCookie();

  const createResponse = await fetch('http://localhost:3001/api/habits', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Cookie: cookie },
    body: JSON.stringify({ name: 'Read a book' })
  });
  const habit = await createResponse.json();

  const response = await fetch(`http://localhost:3001/api/habits/${habit.id}/stats`, {
    headers: { Cookie: cookie }
  });
  const stats = await response.json();

  assert.equal(response.status, 200);
  assert.equal(stats.daysLogged, 0);
  assert.equal(stats.totalDays, 30);
  assert.equal(stats.longestStreak, 0);
  assert.equal(stats.heatmap.length, 30);
});
```

- [ ] **Step 2: Run the tests to verify they fail**

With the server running in another terminal (`node server.js`), run:
`node --test tests/habits.test.js`
Expected: both new tests fail with a 404 (route doesn't exist yet — Express falls through to its default 404 handler for both).

- [ ] **Step 3: Update the streak import**

In `server.js`, change:

```js
const { calculateStreak } = require('./streak');
```

to:

```js
const { calculateStreak, longestStreakEver } = require('./streak');
```

- [ ] **Step 4: Implement the route**

Add to `server.js`, directly after the existing `/api/habits/:id/history` route:

```js
app.get('/api/habits/:id/stats', requireAuth, function (req, res) {
  const habit = db.prepare('SELECT id FROM habits WHERE id = ? AND user_id = ?').get(req.params.id, req.session.userId);

  if (!habit) {
    return res.status(404).json({ error: 'Habit not found' });
  }

  const recentDates = db.prepare(`
    SELECT DISTINCT date(logged_at) AS log_date
    FROM logs
    WHERE habit_id = ?
    AND logged_at >= date('now', '-29 days')
  `).all(habit.id).map(function (row) {
    return row.log_date;
  });

  const recentSet = new Set(recentDates);
  const heatmap = [];

  for (let i = 29; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().slice(0, 10);
    heatmap.push({ date: dateStr, done: recentSet.has(dateStr) });
  }

  const allDates = db.prepare(`
    SELECT DISTINCT date(logged_at) AS log_date
    FROM logs
    WHERE habit_id = ?
    ORDER BY log_date
  `).all(habit.id).map(function (row) {
    return row.log_date;
  });

  res.json({
    daysLogged: recentDates.length,
    totalDays: 30,
    longestStreak: longestStreakEver(allDates),
    heatmap: heatmap
  });
});
```

- [ ] **Step 5: Run the tests to verify they pass**

With the server restarted (route changes need a restart, unlike static frontend files), run:
`node --test tests/habits.test.js`
Expected: all tests pass, including the 2 new ones.

- [ ] **Step 6: Manual verification against seeded data**

Log in as a user with a few weeks of habit history, then in the browser console (or via `fetch`) hit `/api/habits/<id>/stats` directly and eyeball the response: `heatmap` should have exactly 30 entries ending today, `daysLogged` should match a manual count of done days in the last 30, and `longestStreak` should match the longest run you can see in the seeded data (not necessarily the most recent one).

- [ ] **Step 7: Commit**

```bash
git add server.js tests/habits.test.js
git commit -m "Add GET /api/habits/:id/stats, backing the section 15 heatmap and stats display"
```

---

## Self-Review Notes
- **Spec coverage:** response shape ✓ (Task 2 Step 4), 30-day completion rate ✓ (`daysLogged`/`totalDays`), longest-ever streak ✓ (Task 1 + Task 2), dense heatmap ✓, zero-log habit falls out naturally and is covered by a test ✓, ownership 404 ✓. Rendering (15.2) and display (15.3) are explicitly out of scope per the spec and not included here.
- **Type consistency:** `longestStreakEver` is defined in Task 1 taking ascending `string[]`, and Task 2's `allDates` query is `ORDER BY log_date` (ascending) — matches.
- **No placeholders:** all steps have real code, not descriptions of code.
