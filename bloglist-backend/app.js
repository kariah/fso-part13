const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()

//routers
const blogsRouter = require('./controllers/blogs')
const middleware = require('./utils/middleware')
// const logger = require('./utils/logger')  
 
// app.use(cors()) 
app.use(express.json())

app.use('/api/blogs', blogsRouter)

app.use(middleware.requestLogger)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app