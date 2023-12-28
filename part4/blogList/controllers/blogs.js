const blogsRouter = require('express').Router()
const Blog = require('../models/blogs')

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