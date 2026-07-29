async function signUpAndGetCookie() {
  const response = await fetch('http://localhost:3001/api/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: 'testrunner_' + Date.now(), password: 'testpass123' })
  });

  return response.headers.get('set-cookie');
}

module.exports = { signUpAndGetCookie };
