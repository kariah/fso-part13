const jwt = require('jsonwebtoken')
const router = require('express').Router()

const { SECRET } = require('../utils/config') 
const { User, Session } = require('../models')

router.post('/', async (req, res) => {
  const body = req.body
 
  const user = await User.findOne({
    where: {
      username: body.username
    }
  }) 

  // console.log('user ', user)

  const passwordCorrect = body.password === 'salainen'

  if (!(user && passwordCorrect)) {
    return res.status(401).json({
      error: 'invalid username or password'
    })
  }

  const userForToken = {
    username: user.username,
    id: user.id,
  }

  const token = jwt.sign(userForToken, SECRET)

  console.log('user.id ', user.id)
  console.log('token ', token)

  let session = await Session.create(
    {
      userId: user.id,
      token: token
    }
  );

  console.log('session ', session) 

  res
    .status(200)
    .send({ token, username: user.username, name: user.name })
})

module.exports = router