# Spec: GET /api/habits/:id/stats (task 15.1)

## Purpose
Back the section 15 heatmap/stats feature with one endpoint that returns everything the frontend needs to render a 30-day heatmap, a 30-day completion rate, and the longest-ever streak for a single habit.

## Contract
- `GET /api/habits/:id/stats`
- Auth: `requireAuth`, then an ownership check identical to `/api/habits/:id/history` — `404 { error: 'Habit not found' }` if the habit doesn't exist or belongs to another user.
- Success response:
```json
{
  "daysLogged": 12,
  "totalDays": 30,
  "longestStreak": 15,
  "heatmap": [
    { "date": "2026-07-12", "done": false },
    { "date": "2026-08-10", "done": true }
  ]
}
```
- `heatmap` is a **dense** 30-entry array, oldest first, covering today and the previous 29 days — every day gets an entry regardless of whether it has a log. This differs from `/history`, which only returns days that have a log; dense is worth the divergence because 15.2 renders it straight into a CSS Grid, one cell per entry, with no cross-referencing needed.
- `daysLogged` / `totalDays` are raw counts, not a precomputed percentage — the frontend formats display text, consistent with how the rest of the app splits "backend gives data, frontend presents it."

## Data & algorithm
- **Completion rate (30-day, matches the heatmap window):** query distinct log dates within the last 30 days, then build the dense 30-entry array in JS by generating each of the 30 date strings and checking membership against the query result.
- **Longest-ever streak:** requires the habit's *entire* log history, not just 30 days — a streak from months ago could be the longest one, outside the heatmap window. This is a different calculation from `calculateStreak` in `streak.js`, which only measures the *current* streak anchored to today. Add a new function `longestStreakEver(dates)` next to it in `streak.js`, taking a sorted list of distinct log dates and returning the longest run of consecutive calendar days found anywhere in it.
- **Zero-log habit:** no special-casing required — `daysLogged: 0`, `longestStreak: 0`, and a heatmap of all `done: false` all fall out naturally from empty query results.

## Testing
- Unit tests for `longestStreakEver` in `tests/streak.test.js`, mirroring the existing `calculateStreak` tests: a gap, no logs, an unbroken run, and a run that isn't the most recent one (to prove it's scanning full history, not just the tail).
- Route-level test in `tests/habits.test.js` covering response shape and the ownership 404, matching the existing route test style there.
- Manual verification against real seeded multi-week data in the browser, same as every prior section.

## Out of scope (for 15.1 specifically)
- Rendering the heatmap (CSS Grid) — that's 15.2.
- Displaying the completion rate / longest streak as text — that's 15.3.
