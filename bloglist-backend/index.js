// const app = require('./app') // varsinainen Express-sovellus
// const http = require('http')
// const config = require('./utils/config')
// const logger = require('./utils/logger')

// const server = http.createServer(app)

// server.listen(config.PORT, () => {
//   logger.info(`Server running on port ${config.PORT}`)
// })

const express = require('express')
// const cors = require('cors')
const app = express()

app.use(express.json())
// app.use(cors())

const blogsRouter = require('./controllers/blogs')
app.use('/api/blogs', blogsRouter)

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})