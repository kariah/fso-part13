const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
 

blogsRouter.get('/', async (request, response) => {
    console.log('blog ', Blog)
    const blogs = await Blog.findAll()

    response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.get('/:id', async (request, response) => {
    console.log('get ', request.params.id)

    const blog = await Blog.findByPk(request.params.id)
    if (blog) {
        response.json(blog.toJSON())
    } else {
        response.status(404).end()
    }
})

blogsRouter.post('/', async (request, response) => {
    console.log('post ', request.body)

    try {
        const blog = await Blog.create(request.body)
        return response.json(blog)
    } catch (error) {
        return response.status(400).json({ error })
    }
})

blogsRouter.delete('/:id', async (request, response) => {
    console.log('delete ', request.params.id)
 
    const blog = await Blog.findByPk(request.params.id)

    // console.log(blog)

    if (blog) { 
        await blog.destroy()
        response.json(blog)
    } else {
        response.status(404).end()
    }

})



module.exports = blogsRouter
