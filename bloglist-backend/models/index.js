const Blog = require('./blog')
const User = require('./user')
const Reading = require('./reading')

User.hasMany(Blog)
Blog.belongsTo(User)  

User.belongsToMany(Blog, { through: Reading })   
//User.belongsToMany(Blog, { through: Reading, as: 'readings' })

module.exports = { Blog, User, Reading }    