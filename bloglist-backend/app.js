const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
 
const middleware = require('./utils/middleware') 
  
app.use(express.json()) 

app.use(middleware.requestLogger)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app