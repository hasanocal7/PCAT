// Modules
const express = require('express');
const ejs = require('ejs');
const path = require('path');
const Photo = require('./models/Photo');
const mongoose = require('mongoose');

// Create a App
const app = express();

// Connect DB
mongoose.connect('mongodb://localhost/pcat-test-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Template Engine
app.set('view engine', 'ejs');

// MiddleWare
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.get('/', async (req, res) => {
  const photos = await Photo.find({});
  res.render('index', { photos });
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/add', (req, res) => {
  res.render('add');
});

// Action
app.post('/photos', async (req, res) => {
  Photo.create(req.body);
  await res.redirect('/');
});

// Port
const port = 3000;

app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı...`);
});
