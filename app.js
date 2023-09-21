// Modules
const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const methodOverride = require('method-override');
const ejs = require('ejs');
const dotenv = require('dotenv');

const fs = require('fs');
const path = require('path');

const Photo = require('./models/Photo');
const photoController = require('./controllers/photoControllers')
const pageController = require('./controllers/pageControllers');

dotenv.config

// Create a App
const app = express();

// Connect DB
mongoose.connect('mongodb+srv://root:hasan@atlascluster.4tjfe1d.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('DB Connected!')
}).catch((err) => {
  console.log(err)
});

// Template Engine
app.set('view engine', 'ejs');

// MiddleWares
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());
app.use(methodOverride('_method', {
  methods: ['POST', 'GET']
}));

// Post Requests
app.get('/', photoController.getAllPhotos);
app.get('/photos/:id', photoController.getPhoto);
app.post('/photos', photoController.createPhoto);
app.put('/photos/:id', photoController.updatePhoto);
app.delete('/photos/:id', photoController.deletePhoto);

// Get Requests
app.get('/about', pageController.getAboutPage);
app.get('/add', pageController.getAddPage);
app.get('/photos/edit/:id', pageController.getEditPage);

app.get('/endpoint', (req, res) => {
  const paramValue = req.query.foo.toString();
  // paramValue, "paramName" adındaki sorgu parametresinin değerini içerir.
  res.send(`Value of paramName: ${paramValue}`);
});

// Server Connect
const port = 3000;

app.listen(port, () => {
  console.log(`Server is connected to ${port}...`);
});
