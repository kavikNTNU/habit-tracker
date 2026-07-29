const test = require('node:test');
const assert = require('node:assert/strict');

test('GET /api/habits without login returns 401', async function () {
  const response = await fetch('http://localhost:3001/api/habits');
  assert.equal(response.status, 401);
});

test('POST /api/signup rejects an empty username', async function () {
  const response = await fetch('http://localhost:3001/api/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: '   ', password: 'testpass123' })
  });

  assert.equal(response.status, 400);
});

test('POST /api/signup rejects a short password', async function () {
  const response = await fetch('http://localhost:3001/api/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: 'testrunner_' + Date.now(), password: '123' })
  });

  assert.equal(response.status, 400);
});
