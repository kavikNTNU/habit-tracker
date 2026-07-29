const test = require('node:test');
const assert = require('node:assert/strict');

test('GET /api/habits without login returns 401', async function () {
  const response = await fetch('http://localhost:3001/api/habits');
  assert.equal(response.status, 401);
});
