const test = require('node:test');
const assert = require('node:assert/strict');
const { calculateStreak, longestStreakEver } = require('../streak');

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
