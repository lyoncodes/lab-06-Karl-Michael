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
  const locationData = require('./geo.json')
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
  // const formatted = new Location(geoData.results[0])
  // console.log(formatted)
  // const searchQuery = new Location(geoData.results[0])
  // console.log(searchQuery)
}

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
  // console.log(weather.summary)
}
// Error Message if Incorrect
function Weather (weather) {
  this.forecast = weather.summary
  console.log(weather.summary)
  this.time = weather.data[0].time
  console.log(weather.data[0].time)
}
searchWeather('Lynwood, WA, USA')

app.use('*', (request, response) => {
  response.send('sorry that did not work')
})

// Listener
app.listen(PORT, () => console.log(`listening on port ${PORT}`))
