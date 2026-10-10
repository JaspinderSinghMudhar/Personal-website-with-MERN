// Express Req
const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Ejs Req
app.set('view engine', 'ejs');

// Public folder
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
  res.render('home');
});
app.get('/projects', (req, res) => {
  res.render('projects');
});
app.get('/about', (req, res) => {
  res.render('about');
});
app.get('/contact', (req, res) => {
  res.render('contact');
});
app.post('/contact', (req, res) => {
  res.render('/thanks');
});

app.use((req, res, next) => {
  res.status(404).render("404");
});


app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});