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
  // (request.query.data || 'Lynnwood, WA, USA')
  response.send(locationData)
})
function searchToLatLong (query) {
  const geoData = require('./geo.json')
  const location = new Location(geoData.results[0])
  console.log(location)
}
function Location (location) {
  this.formatted_query = location.formatted_address
  this.latitude = location.geometry.location.lat
  this.longitude = location.geometry.location.lng
}
searchToLatLong('Lynwood, WA, USA')

// function searchToLatLong (query) {
//   const geoData = require('./data/geo.json')
//   const location = new Location(geoData.results[0])
//   // data required for front end in Location
// }


// Error Message if Incorrect
app.use('*', (request, response) => {
  response.send('sorry that did not work')
})

// Listener
app.listen(PORT, () => console.log(`listening on port ${PORT}`))

