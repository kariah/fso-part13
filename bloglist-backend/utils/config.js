require('dotenv').config()

let PORT = process.env.PORT 
let DATABASE_URL = process.env.DATABASE_URL 

module.exports = { 
  PORT,
  DATABASE_URL
}