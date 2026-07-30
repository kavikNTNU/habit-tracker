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

module.exports = { calculateStreak };
