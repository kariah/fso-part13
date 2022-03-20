const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
 

blogsRouter.get('/', async (request, response) => {
    console.log('blog ', Blog)
    const blogs = await Blog.findAll()

    response.json(blogs.map(note => note.toJSON()))
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

blogsRouter.post('/', async (req, res) => {
    try {
        const blog = await Blog.create(req.body)
        return res.json(blog)
    } catch (error) {
        return res.status(400).json({ error })
    }
})

blogsRouter.delete('/:id', async (request, response) => {
    console.log('delete ', request.params.id)
 
    const blog = await Blog.findByPk(request.params.id)
    if (blog) { 
        await blog.delete()
        response.json(blog)
    } else {
        response.status(404).end()
    }

})



module.exports = blogsRouter
