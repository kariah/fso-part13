require('dotenv').config()

let PORT = process.env.PORT 
let DATABASE_URL = process.env.DATABASE_URL 
let SECRET = process.env.SECRET

module.exports = { 
  PORT,
  DATABASE_URL,
  SECRET
}