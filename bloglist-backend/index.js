const express = require('express')
const middleware = require('./utils/middleware')
const app = express()
app.use(express.json())

const { PORT } = require('./utils/config')
const { connectToDatabase } = require('./utils/db')

const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

app.use('/api/blogs', blogsRouter)  
app.use('/api/users', usersRouter)  
app.use('/api/login', loginRouter)  

const start = async () => {
    await connectToDatabase()
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
    })
}

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler) 

start()