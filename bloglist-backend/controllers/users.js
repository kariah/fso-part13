const router = require('express').Router()
const { Blog, User } = require('../models')
require('express-async-errors');

// const paramMiddleware = (myParam) => {
//     return (req, res, next) => {
//         // implement your business logic using 'myParam'
//         // ...
//         next();
//     }
// }

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
    // const where = {};

    // if (req.query.read === 'true') {
    //     where.read = true;
    // }
    // else if (req.query.read === 'false') {
    //     where.read = false
    // }

    // req.user = await User.findByPk(req.params.id, {
    //     attributes: { exclude: ['id', 'createdAt', 'updatedAt'] },
    //     include: [{
    //         model: Blog,
    //         as: 'readings',
    //         attributes: { exclude: ['userId', 'createdAt', 'updatedAt'] },
    //         through: {
    //             attributes: ['id', 'read'], where
    //         },
    //     },
    //     ]
    // })


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
        // res.status(404).end()
        // return res.status(404).json({
        //     error: 'invalid data'
        // })  
        next('Invalid data');
    }
})


module.exports = router