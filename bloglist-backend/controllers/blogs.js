const router = require('express').Router()
const Blog = require('../models')
require('express-async-errors');

const blogFinder = async (request, response, next) => {
    request.blog = await Blog.findByPk(request.params.id)
    next()
}

router.get('/', async (request, response) => {
    console.log('blog ', Blog)
    const blogs = await Blog.findAll()

    response.json(blogs.map(blog => blog.toJSON()))
})

router.get('/:id', blogFinder, async (request, response, next) => {
    console.log('get ', request.params.id)

    if (request.blog) {
        response.json(request.blog.toJSON())
    } else {
        next('Not found');
        // response.status(404).end()
    }
})

router.post('/', async (request, response, next) => {
    console.log('post ', request.body)

    try {
        const blog = await Blog.create(request.body)
        return response.json(blog)
    } catch (error) {
        // return response.status(400).json({ error })
        next('Post failed');
    }
})

router.delete('/:id', blogFinder, async (request, response, next) => {
    console.log('delete ', request.params.id)

    if (request.blog) {
        await request.blog.destroy()
    }
    else
    {
        next('Not found');
    }
    // response.status(204).end()
})


router.put('/:id', blogFinder, async (request, response, next) => {  
    if (request.blog) {
        console.log('put1')

        request.blog.likes = request.body.likes
        await request.blog.save()
        response.json(request.blog)
    } else {
        // response.status(404).end()A
        // return response.status(404).json({
        //     error: 'invalid data'
        // }) 
        next('Invalid data');
    }
})


module.exports = router
