const blogsRouter = require('express').Router()
const Blog = require('../models/blogs')
const Users = require('../models/users')
const jwt = require('jsonwebtoken')


blogsRouter.get('/', async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  const blogs = await Blog
    .find({ user: decodedToken.id })
    .populate('user', { username: 1, name: 1 });


  response.json(blogs)
})

  blogsRouter.post('/', async (request, response) => {
    
    const decodedToken = jwt.verify(request.token, process.env.SECRET);
 
    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'Token missing or invalid' });
    }
  
    const user = await Users.findById(decodedToken.id);
  
    const blogData = request.body;
    const likes = blogData.likes !== undefined ? blogData.likes : 0;
  
    const blog = new Blog({
      title: blogData.title,
      author: blogData.author,
      url: blogData.url,
      likes: likes,
      user: user._id,
    });
  
    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();
  
    response.status(201).json(savedBlog);
  });



blogsRouter.put('/:id', async (request, response) => {
  const { likes } = request.body;

    const updatedBlog = await Blog.findByIdAndUpdate(
      request.params.id,
      { likes },
      { new: true } 
    );

    if (updatedBlog) {
      response.json(updatedBlog);
    } else {
      response.status(404).json({ error: 'Blog not found' });
    }
});


blogsRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  })
module.exports = blogsRouter