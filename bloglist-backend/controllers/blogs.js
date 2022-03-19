const blogsRouter = require('express').Router()
const Blog = require('../models/blog')  

blogsRouter.get('/', async (request, response) => {  
    console.log('get')
    const blogs = await Blog.findAll()
//   const blogs = await Blog
//     .find({}).populate('user', {
//       username: 1,
//       name: 1
//     })
//   // .find({}).populate('user')

  response.json(blogs.map(note => note.toJSON()))
})

blogsRouter.get('/:id', async (request, response) => {
//   const blog = await Blog.findById(request.params.id)
//   if (blog) {
//     response.json(blog.toJSON())
//   } else {
//     response.status(404).end()
//   }
})

blogsRouter.post('/', async (request, response, next) => { 
  const body = request.body 

  // const decodedToken = jwt.verify(request.token, process.env.SECRET)

  // if (!request.token || !decodedToken.id) {
  //   return response.status(401).json({
  //     error: 'token missing or invalid'
  //   })
  // }
  // const user = await User.findById(decodedToken.id) 

  //Tehtävä 4.23
//   if (request.user === null) {
//     return response.status(401).json({
//       error: 'user missing or invalid'
//     })
//   } 

//   const blog = new Blog({
//     title: body.title,
//     author: body.author,
//     url: body.url,
//     likes: body.likes,
//     user: request.user._id
//   })

//   const savedBlog = await blog.save()
//   request.user.blogs = request.user.blogs.concat(savedBlog._id)
//   await request.user.save()

//   response.json(savedBlog.toJSON())
})

//Tehtävä 4.23
blogsRouter.delete('/:id', async (request, response) => { 
//   if (request.user === null) {
//     return response.status(401).json({
//       error: 'user missing or invalid'
//     })
//   } 

//   const blog = await Blog.findById(request.params.id)

//   console.log('blog ', blog)
//   console.log('user.id.toString() ', request.user.id.toString())

//   //  Huom! Kenttä blog.user ole tyypiltään merkkijono vaan object.  
//   //  Kannasta haettu id tulee muuttaa vertailua varten merkkijonoksi:
//   if (blog.user.toString() === request.user.id.toString()) {
//     await Blog.findByIdAndRemove(request.params.id)
//     response.status(204).end()
//   } else {
//     return response.status(401).json({
//       error: 'delete not allowed'
//     })
//   } 
})

 

module.exports = blogsRouter
