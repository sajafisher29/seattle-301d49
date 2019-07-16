'use strict'

require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');

const PORT = process.env.PORT || 3000;

app.use(cors());
app.get('/location', (request, response) => {
  try {
    const geoData = require('./data/geo.json');
    const location = new Location(request.query.data, geoData);
    response.send(location);
  } catch (error) {
    response.status(400).send({ 'error': error });
  }
});

app.get('/weather', (request, response) => {
  const searchQuery = request.query.data;
  const weatherData = require('./data/darksky.json');
  const weather = `${searchQuery} weather data goes here`
  response.send(weather);
});

function Location(query, geoData) {
  this.search_query = query;
  this.latitude = geoData.results[0].geometry.location.lat;
  this.longitude = geoData.results[0].geometry.location.lat;
}

app.listen(PORT, () => {
  console.log('Listening on port: ' + PORT);
})
