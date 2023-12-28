const blogsRouter = require('express').Router()
const Blog = require('../models/blogs')

/* blogsRouter.get('/', (request, response) => {
    Blog
      .find({})
      .then(blogs => {
        response.json(blogs)
      })
}) */

blogsRouter.get('/', async (request, response) => {
    await Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
  })

blogsRouter.post('/',async (request, response) => {
    
    const blogData = request.body;

  
    const likes = blogData.likes !== undefined ? blogData.likes : 0;

    const blog = new Blog({
        title: blogData.title,
        author: blogData.author,
        url: blogData.url,
        likes: likes, 
    });
    const result = await blog.save();
    response.status(201).json(result);

})
/* 
blogsRouter.post('/', async (request, response) => {
    await Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
  }) */

/* blogsRouter.delete('/:id', (request, response, next) => {
    Blog.findByIdAndDelete(request.params.id)
    .then(() => {
        response.status(204).end()
    })
    .catch(error => next(error))
}) */
blogsRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  })
module.exports = blogsRouter