// Express Req
const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Ejs Req
app.set('view engine', 'ejs');

// Public folder
app.use(express.static(path.join(__dirname, 'public')));

// Mongo DB
const { MongoClient } = require('mongodb');
const { features } = require('process');
const db_url = 'mongodb://localhost:27017'; // Set the local MongoDB connection URL.
const client = new MongoClient(db_url);

app.use(express.json()); // Parse incoming requests with JSON payloads.
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
  res.render('home');
});
app.get('/projects', async (req, res) => {
  await client.connect();
  const db = client.db('Portfolio_recreated');
  const post_data = db.collection('projects');
  // get all the data and then map all the images and create new array of image
  // const result = await post_data.find().toArray();
  //   const image_list = result.map(element => {
  //   return element['image']
  // });

  // Getting only image for fast result
  // const image_list = await post_data.find({}, {projection: {_id: 0,image: 1}}).toArray();
  const image_list = await post_data.find({}, {_id: 0,image: 1}).toArray();
    const result = image_list.map(element => {
    return element['image']
  });
  res.render('projects', { feature_img: result });
});
app.get('/about', (req, res) => {
  res.render('about');
});
app.get('/contact', (req, res) => {
  res.render('contact');
});

// Use this if you need a direct visit from the user.
// app.get('/thanks', (req, res) => {
//   res.render('thanks', { UserName: '' });
// });

app.post('/contact', async (req, res) => {
  await client.connect(); // Connect to the MongoDB server.
  const db = client.db('Portfolio_recreated'); // Select the Portfolio_recreated database.
  const post_data = db.collection('form'); // Select the form collection.
  await post_data.insertOne(req.body); // Insert the submitted form data into the collection.
  res.render('thanks', { UserName: req.body.name }); // Render the thank-you page.
});

app.use((req, res, next) => {
  res.status(404).render("404");
});


app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});