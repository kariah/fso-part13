const express = require('express')
const middleware = require('./utils/middleware')
const app = express()
app.use(express.json())

const { PORT } = require('./utils/config')
const { connectToDatabase } = require('./utils/db')

const blogsRouter = require('./controllers/blogs')
app.use('/api/blogs', blogsRouter)  

const start = async () => {
    await connectToDatabase()
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
    })
}

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler) 

start()