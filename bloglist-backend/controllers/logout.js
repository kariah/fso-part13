const jwt = require('jsonwebtoken')
const router = require('express').Router()
const { SECRET } = require('../utils/config')
const { Session, User } = require('../models')

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

router.delete("/", tokenExtractor, async (req, res) => {
    console.log('req.decodedToken ', req.decodedToken)
 
    const user = await User.findByPk(req.decodedToken.id)
    console.log('user ', user)

    const result = await Session.update(
        {
            active: false
        },
        {
            where: {
                userId: user.id
            }
        }
    )

    console.log('result ', result)
    // return res.status(200).end() 
});


module.exports = router