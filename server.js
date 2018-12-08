'use strict'
// Dependencies
const express = require('express')
const cors = require('cors')
require('dotenv').config()

// Store App in const
const app = express()
app.use(cors())

// PORT
const PORT = process.env.PORT || 3000

// ******************************************

// get() Location Data
app.get('/location', (request, response) => {
  const locationData = searchToLatLong(request.query.data || 'Lynnwood, WA')
  response.send(locationData)
})

// get() Weather Data
app.get('/weather', (request, response) => {
  const weatherData = searchWeather(request.query.data || 'Lynwood, WA')
  response.send(weatherData)
})

// ******************************************

// LAT LONG function (called in get())
function searchToLatLong (query) {
  const geoData = require('./geo.json')
  const location = new Location(geoData.results[0])
  console.log(location)
  return location
}

// LOCATION CONSTRUCTOR

/* displayMap() front-end function requires:
  formatted_query
  latitude
  longitude
*/

function Location (location) {
  this.searchQuery = location.address_components[0].long_name
  this.formatted_query = location.formatted_address
  this.latitude = location.geometry.location.lat
  this.longitude = location.geometry.location.lng
}
searchToLatLong('Lynwood, WA, USA')

// *******************************************

// WEATHER function (called in get())
function searchWeather (query) {
  const weatherData = require('./darksky.json')
  const weather = new Weather(weatherData.daily)
  console.log(weather)
  return weather
}

function Weather (weather) {
  this.forecast = weather.summary
  console.log(weather.summary)
  this.time = weather.data[0].time
  console.log(weather.data[0].time)
}
searchWeather('Lynwood, WA, USA')

// *******************************************

// Error Message
app.get('/*', (request, response) => {
  response.status(404).send('You Have Landed On The Wrong Page')
})

// Listener
app.listen(PORT, () => console.log(`listening on port ${PORT}`))

// *******************************************
