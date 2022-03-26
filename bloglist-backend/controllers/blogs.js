const router = require('express').Router() 
const { Blog, User } = require('../models')
require('express-async-errors');
const jwt = require('jsonwebtoken')
const { SECRET } = require('../utils/config')

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      console.log(authorization.substring(7))
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
    } catch (error){
      console.log(error)
      return res.status(401).json({ error: 'token invalid' })
    }
  } else {
    return res.status(401).json({ error: 'token missing' })
  }
  next()
}

const blogFinder = async (req, res, next) => {
    req.blog = await Blog.findByPk(req.params.id)
    next()
}

router.get('/', async (req, res) => {
    // console.log('blog ', Blog)
    // const blogs = await Blog.findAll()

    const blogs = await Blog.findAll({
        attributes: { exclude: ['userId'] },
        include: {
          model: User,
          attributes: ['name']
        }
      })

    res.json(blogs.map(blog => blog.toJSON()))
})

router.get('/:id', blogFinder, async (req, res, next) => {
    console.log('get ', req.params.id)

    if (req.blog) {
        res.json(req.blog.toJSON())
    } else {
        next('Not found');
        // res.status(404).end()
    }
})

router.post('/', tokenExtractor, async (req, res, next) => {
    console.log('post ', req.body) 
    try { 
        const user = await User.findByPk(req.decodedToken.id) 
        const blog = await Blog.create({...req.body, userId: user.id, date: new Date()})
   
        //console.log('blog ', blog)

        return res.json(blog)
    } catch (error) {
        // return res.status(400).json({ error })
        next('Post failed');
    }
})

router.delete('/:id', blogFinder, async (req, res, next) => {
    console.log('delete ', req.params.id)
    if (req.blog) {
        await req.blog.destroy()
    }
    else
    {
        next('Not found');
    }
    // res.status(204).end()
})


router.put('/:id', blogFinder, async (req, res, next) => {  
    if (req.blog) {
        console.log('put')

        req.blog.likes = req.body.likes
        await req.blog.save()
        res.json(req.blog)
    } else {
        // res.status(404).end()
        // return res.status(404).json({
        //     error: 'invalid data'
        // }) 
        next('Invalid data');
    }
})


module.exports = router
