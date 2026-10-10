// Express Req
const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Ejs Req
app.set('view engine', 'ejs');

// Public folder
app.use(express.static(path.join(__dirname, 'public')));

// Home
app.get('/', (req, res) => {
  res.render('home');
});

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});