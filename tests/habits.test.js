const test = require('node:test');
const assert = require('node:assert/strict');
const { signUpAndGetCookie } = require('./helpers');

test('POST /api/habits rejects an empty/whitespace name', async function () {
  const cookie = await signUpAndGetCookie();

  const response = await fetch('http://localhost:3001/api/habits', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Cookie: cookie },
    body: JSON.stringify({ name: '   ' })
  });

  assert.equal(response.status, 400);
});

test('POST /api/habits accepts a valid name', async function () {
  const cookie = await signUpAndGetCookie();

  const response = await fetch('http://localhost:3001/api/habits', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Cookie: cookie },
    body: JSON.stringify({ name: 'Read a book' })
  });

  assert.equal(response.status, 200);
});

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
