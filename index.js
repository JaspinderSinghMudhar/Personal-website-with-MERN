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


// Converting Post Data into Json
app.use(express.json()); // Parse incoming requests with JSON payloads.
app.use(express.urlencoded({ extended: true }));

// Adding IP Getting Package
const requestIp = require('request-ip');
// Enable the request-ip middleware globally
app.use(requestIp.mw());

// Getting GEO Deta
const geoip = require('geoip-lite');
// Temp variable
const ip = "223.233.72.113";

// Build the data needed by the 404 page for the current visitor.
const getRequestGeo = (req) => {
  // A local/private IP may not have a geolocation entry, so check the result first.
  const geo = req.clientIp ? geoip.lookup(req.clientIp) : null;

  // The 404 page reads these fields; use placeholders if lookup returned no location.
  return {
    geo: geo || { ll: ['-', '-'], city: '-', country: '-' },
    ip: req.clientIp || '-'
  };
};

app.get('/', (req, res) => {
  // const geo = geoip.lookup(req.clientIp);
  const geo = geoip.lookup(ip);
  res.render('home', { geo, ip: req.clientIp });
});


app.get('/projects', async (req, res) => {
  await client.connect();
  const db = client.db('Portfolio_recreated');
  const post_data = db.collection('projects');
  const projects = (await post_data.find({}, { _id: 0, image: 1, slug: 1 }).toArray());
  const geo = geoip.lookup(ip);
  res.render('projects', { projects,geo, ip: req.clientIp });
});


app.get('/about', (req, res) => {
  const geo = geoip.lookup(ip);
  res.render('about', { geo, ip: req.clientIp });
});


app.get('/contact', (req, res) => {
  const geo = geoip.lookup(ip);
  res.render('contact', { geo, ip: req.clientIp });
});


// Dynamic project post page using a slug parameter
app.get('/:slug', async (req, res) => {
  await client.connect();
  const db = client.db('Portfolio_recreated');
  const post_data = db.collection('projects');
  const post_slug = await post_data.find({}, { _id: 0, slug: 1 }).toArray();
  const { slug } = req.params;
  const post = post_slug.find(p => p.slug === slug);
  if (!post) {
    // Unknown project slugs are handled here, so pass the 404 page its expected data.
    return res.status(404).render('404', getRequestGeo(req));
  } else {
    const project = await post_data.findOne({ slug: slug });
    const geo = geoip.lookup(ip);
    return res.render('project', {project, geo, ip: req.clientIp });
  }
})



app.post('/contact', async (req, res) => {
  await client.connect(); // Connect to the MongoDB server.
  const db = client.db('Portfolio_recreated'); // Select the Portfolio_recreated database.
  const post_data = db.collection('form'); // Select the form collection.
  await post_data.insertOne(req.body); // Insert the submitted form data into the collection.
  const geo = geoip.lookup(ip);
  res.render('thanks', { UserName: req.body.name, geo, ip: req.clientIp }); // Render the thank-you page.
});

// Catch any other URL that did not match a route and pass the same data to the 404 page.
app.use((req, res) => {
  res.status(404).render('404', getRequestGeo(req));
});


app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});