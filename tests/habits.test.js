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
