const Blog = require('./blog')
const User = require('./user')
const UserBlog = require('./userBlog')

User.hasMany(Blog)
Blog.belongsTo(User)  

//User.belongsToMany(Blog, { through: Reading })   
User.belongsToMany(Blog, { through: UserBlog, as: 'readings' })

module.exports = { Blog, User, UserBlog }    