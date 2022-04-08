const router = require('express').Router()
const { Blog, User, Session } = require('../models')
require('express-async-errors');

// const paramMiddleware = (myParam) => {
//     return (req, res, next) => {
//         // implement your business logic using 'myParam'
//         // ...
//         next();
//     }
// }

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
    const where = {};

    if (req.query.read === 'true') {
        where.read = true;
    }
    else if (req.query.read === 'false') {
        where.read = false
    }

    req.user = await User.findByPk(req.params.id, {
        attributes: { exclude: ['id', 'createdAt', 'updatedAt'] },
        include: [{
            model: Blog,
            as: 'readings',
            attributes: { exclude: ['userId', 'createdAt', 'updatedAt'] },
            through: {
                attributes: ['id', 'read'], where
            },
        },
        ]
    })

    next()
}


router.get('/', async (req, res) => {
    const users = await User.findAll({
        attributes: { exclude: ['id', 'createdAt', 'updatedAt'] },
        include: {
            model: Blog,
            attributes: { exclude: ['userId', 'createdAt', 'updatedAt'] }
        }
    })

    res.json(users)
})

router.post('/', async (req, res, next) => {
    try {
        const user = await User.create(req.body)
        res.json(user)
    } catch (error) {
        return res.status(400).json({ error })
    }
})

router.get('/:id', userFinder, async (req, res, next) => {
    if (req.user) {
        res.json(req.user)
    } else {
        res.status(404).end()
    }
})

router.put('/:id', userFinder, async (req, res, next) => {
    console.log('put ', req.body.username)

    if (req.user) {
        req.user.username = req.body.username
        await req.user.save()
        res.json(req.user)
    } else {
        next('Invalid data');
    }
})



module.exports = router