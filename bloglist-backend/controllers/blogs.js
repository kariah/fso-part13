const router = require('express').Router()
const { Blog, User, Session } = require('../models')
require('express-async-errors');
const jwt = require('jsonwebtoken')
const { SECRET } = require('../utils/config')
const { Op } = require('sequelize')

const tokenExtractor = (req, res, next) => {
    const authorization = req.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        try {
            console.log(authorization.substring(7))
            req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
        } catch (error) {
            console.log(error)
            return res.status(401).json({ error: 'token invalid' })
        }
    } else {
        return res.status(401).json({ error: 'token missing' })
    }
    next()
}

const userFinder = async (req, res, next) => {
    req.user = await User.findByPk(req.decodedToken.id, {
        include: [{
            model: Blog,
            as: 'readings',
        },
        //Only users with active session
        {
            model: Session,
            attributes: [],
            where: {
                active: true
            }
        }
        ]
    })

    next()
}


const blogFinder = async (req, res, next) => {
    req.blog = await Blog.findByPk(req.params.id)
    next()
}

router.get('/', async (req, res) => {
    let where = {}
    let order = [[]]
 
    if (req.query.search) {
        where = {
            [Op.or]: [
                {
                    title: {
                        [Op.iLike]: `%${req.query.search}%`
                    }
                },
                {
                    author: {
                        [Op.iLike]: `%${req.query.search}%`
                    }
                }
            ]
        }
    }

    order = [
        ['likes', 'DESC']
    ]

    const blogs = await Blog.findAll({
        attributes: { exclude: ['userId', 'createdAt', 'updatedAt'] },
        include: {
            model: User,
            attributes: { exclude: ['username', 'createdAt', 'updatedAt'] }
        },
        where,
        order: order
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

router.post('/', tokenExtractor, userFinder, async (req, res, next) => {
    console.log('post ', req.body)

    try {
        //check if session valid
        if (!req.user) {
            return res.status(401).json({ error: 'operation not permitted' })
        }
 
        const blog = await Blog.create({ ...req.body, userId: req.user.id, date: new Date() })

        // console.log('blog ', blog)

        return res.json(blog)
    } catch (error) {
        // return res.status(400).json({ error })
        if (error.message !== null) {
            next(error.message)
        }
        else {
            next("Post failed")
        }
    }
})

router.delete('/:id', tokenExtractor, blogFinder, async (req, res, next) => {
    // console.log('delete', req.params.id)

    // const user = await User.findByPk(req.decodedToken.id)
    // console.log('user.id ', user.id)
    // console.log('user ', user)

    // if (req.user === null) {
    //     return res.status(401).json({
    //         error: 'user missing or invalid'
    //     })
    // }

    //check if session valid
    if (!req.user) {
        return res.status(401).json({ error: 'operation not permitted' })
    }

    console.log('req.blog ', req.blog)

    if (req.blog) {
        await req.blog.destroy()
        res.status(204).end()
    }
    else {
        next('Not found');
    } 
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
