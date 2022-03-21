const crypto = require('crypto')
const secretKey = crypto.randomBytes(8).toString('hex')
console.log(secretKey)