// const jwt = require('jsonwebtoken')
// const router = require('express').Router()

// const { SECRET } = require('../utils/config')
// const User = require('../models/user')

// router.post('/', async (request, response) => {
//   const body = request.body

//   const user = await User.findOne({
//     where: {
//       username: body.username
//     }
//   })

//   const passwordCorrect = body.password === 'salainen'

//   if (!(user && passwordCorrect)) {
//     return response.status(401).json({
//       error: 'invalid username or password'
//     })
//   }

//   const userForToken = {
//     username: user.username,
//     id: user.id,
//   }

//   const token = jwt.sign(userForToken, SECRET)

//   response
//     .status(200)
//     .send({ token, username: user.username, name: user.name })
// })

const { User, Blog } = require('../models') 

const jwt = require('jsonwebtoken')
const { SECRET } = require('../utils/config')
const router = require('express').Router()

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

router.post('/', tokenExtractor, async (req, res) => {
    try {
        const user = await User.findByPk(req.decodedToken.id)
        const note = await Blog.create({ ...req.body, userId: user.id, date: new Date() })
        res.json(note)
    } catch (error) {
        return res.status(400).json({ error })
    }
})

module.exports = router