const express = require('express');
const app = express();
const port = 3001;

app.use(express.static(__dirname));
app.use(express.json());

app.post('/api/log', function (req, res) {
  console.log('Received:', req.body);
  res.json({ status: 'ok' });
});

app.listen(port, function () {
  console.log(`Server running at http://localhost:${port}`);
});
