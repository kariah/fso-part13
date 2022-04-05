const router = require('express').Router()
const { Blog, User, UserBlogs } = require('../models')
require('express-async-errors');
const jwt = require('jsonwebtoken')
const { SECRET } = require('../utils/config')

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
        ]
    }) 

    next()
}


router.post('/', tokenExtractor, async (req, res, next) => {
    console.log('post ', req.body)

    try { 
        const userBlog = await UserBlogs.create({ ...req.body }) 

        return res.json(userBlog)
    } catch (error) {
        if (error.message !== null) {
            next(error.message)
        }
        else {
            next("Post failed")
        }
    }
})

router.put('/:id',  tokenExtractor, userFinder, async (req, res, next) => {
    console.log('put ', req.body.read, req.user.username)   
    
    if (req.user) { 
        const userBlog =  await UserBlogs.findByPk(req.params.id) 
         
        userBlog.read = req.body.read 

        await userBlog.save() 
        res.json(userBlog)
    } else {
        
        next('Invalid data');
    }
})



module.exports = router
