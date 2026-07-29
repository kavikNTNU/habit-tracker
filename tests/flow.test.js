const test = require('node:test');
const assert = require('node:assert/strict');
const { signUpAndGetCookie } = require('./helpers');

test('create -> log -> toggle flow updates done_today correctly', async function () {
  const cookie = await signUpAndGetCookie();

  const createResponse = await fetch('http://localhost:3001/api/habits', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Cookie: cookie },
    body: JSON.stringify({ name: 'Test habit' })
  });
  const habit = await createResponse.json();

  await fetch('http://localhost:3001/api/log', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Cookie: cookie },
    body: JSON.stringify({ habit: habit.name })
  });

  const afterFirstLog = await fetch('http://localhost:3001/api/habits', { headers: { Cookie: cookie } });
  const habitsAfterFirst = await afterFirstLog.json();
  const foundAfterFirst = habitsAfterFirst.find(function (h) { return h.id === habit.id; });
  assert.equal(foundAfterFirst.done_today, 1);

  await fetch('http://localhost:3001/api/log', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Cookie: cookie },
    body: JSON.stringify({ habit: habit.name })
  });

  const afterSecondLog = await fetch('http://localhost:3001/api/habits', { headers: { Cookie: cookie } });
  const habitsAfterSecond = await afterSecondLog.json();
  const foundAfterSecond = habitsAfterSecond.find(function (h) { return h.id === habit.id; });
  assert.equal(foundAfterSecond.done_today, 0);
});
