function calculateStreak(dates, referenceDate) {
  if (dates.length === 0) {
    return 0;
  }

  let streak = 0;
  let expected = referenceDate ? new Date(referenceDate) : new Date();

  const today = expected.toISOString().slice(0, 10);
  if (dates[0] !== today) {
    expected.setDate(expected.getDate() - 1);
  }

  for (let i = 0; i < dates.length; i++) {
    const expectedStr = expected.toISOString().slice(0, 10);

    if (dates[i] === expectedStr) {
      streak = streak + 1;
      expected.setDate(expected.getDate() - 1);
    } else {
      break;
    }
  }

  return streak;
}

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

module.exports = { calculateStreak, longestStreakEver };
