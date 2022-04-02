const router = require('express').Router()
const { Reading } = require('../models')
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

// const blogFinder = async (req, res, next) => {
//     req.blog = await Blog.findByPk(req.params.id)
//     next()
// }

 
router.post('/', tokenExtractor, async (req, res, next) => {
    console.log('post ', req.body)

    try {
        //const user = await User.findByPk(req.decodedToken.id) 
        // console.log('user ', user)

        const reading = await Reading.create({ ...req.body })

        // console.log('blog ', blog)
 
        return res.json(reading)
    } catch (error) { 
        if (error.message !== null) {
            next(error.message)
        }
        else {
            next("Post failed")
        }
    }
})
 

module.exports = router