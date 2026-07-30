const test = require('node:test');
const assert = require('node:assert/strict');
const { calculateStreak } = require('../streak');

test('a streak with a gap stops counting at the gap', function () {
  const streak = calculateStreak(['2026-07-29', '2026-07-28', '2026-07-25'], '2026-07-30');
  assert.equal(streak, 2);
});

test('no logs at all means zero streak', function () {
  const streak = calculateStreak([], '2026-07-30');
  assert.equal(streak, 0);
});

test('an unbroken streak counts every day', function () {
  const streak = calculateStreak(['2026-07-30', '2026-07-29', '2026-07-28'], '2026-07-30');
  assert.equal(streak, 3);
});

test('not yet logged today does not break the streak', function () {
  const streak = calculateStreak(['2026-07-29', '2026-07-28'], '2026-07-30');
  assert.equal(streak, 2);
});
