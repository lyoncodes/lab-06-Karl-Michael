'use strict'
const express = require('express')
const cors = require('cors')

require('dotenv').config()

const PORT = process.env.PORT || 3000

// Build the app

const app = express()

app.use(cors())

// Get Location Data

app.get('/location', (request, response) => {
  const locationData = searchToLatLong(request.query.data || 'Lynnwood, WA')
  response.send(locationData)
})
app.get('/weather', (request, response) => {
  const weatherData = require('./darksky.json')
  response.send(weatherData)
})
// LAT LONG
function searchToLatLong (query) {
  const geoData = require('./geo.json')
  const location = new Location(geoData.results[0])
  console.log(location)
  return location
  // const formatted = new Location(geoData.results[0])
  // console.log(formatted)
  // const searchQuery = new Location(geoData.results[0])
  // console.log(searchQuery)
}

// Write function for the displayMap() function on front-end
function Location (location) {
  this.searchQuery = location.address_components[0].long_name
  this.formatted_query = location.formatted_address
  this.latitude = location.geometry.location.lat
  this.longitude = location.geometry.location.lng
}
searchToLatLong('Lynwood, WA, USA')

// WEATHER
function searchWeather (query) {
  const weatherData = require('./darksky.json')
  const weather = new Weather(weatherData.daily)
}

function Weather (weather) {
  this.forecast = weather.summary
  console.log(weather.summary)
  this.time = weather.data[0].time
  console.log(weather.data[0].time)
}
searchWeather('Lynwood, WA, USA')

// Error Message
app.get('/*', (request, response) => {
  response.status(404).send('You Have Landed On The Wrong Page')
})

// Listener
app.listen(PORT, () => console.log(`listening on port ${PORT}`))
