const express = require('express')
const middleware = require('./utils/middleware')
const app = express()
app.use(express.json())

const { PORT } = require('./utils/config')
const { connectToDatabase } = require('./utils/db')

const blogsRouter = require('./controllers/blogs')
const authorsRouter = require('./controllers/authors')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const logoutRouter = require('./controllers/logout')
const readingliststRouter = require('./controllers/readinglists')

app.use('/api/blogs', blogsRouter)  
app.use('/api/authors', authorsRouter)  
app.use('/api/users', usersRouter)  
app.use('/api/login', loginRouter) 
app.use('/api/logout', logoutRouter)   
app.use('/api/readinglists', readingliststRouter)  

const start = async () => {
    await connectToDatabase()
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
    })
}

//test

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler) 

start()