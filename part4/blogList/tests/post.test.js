const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blogs');

const api = supertest(app);

test('createBlog', async () => {
  const newBlog = {
    title: 'Nuevo Blog',
    author: 'Autor del Blog',
    url: 'https://ejemplo.com'
  };

  const blogsBeforePost = await Blog.find({});

  const likes = newBlog.likes !== undefined ? newBlog.likes : 0;

  const response = await api
    .post('/api/blogs')
    .send({ ...newBlog, likes }) 
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const blogsAfterPost = await Blog.find({});
  expect(blogsAfterPost).toHaveLength(blogsBeforePost.length + 1);
  expect(response.body.likes).toBe(likes);
}, 30000);

afterAll(() => {
  mongoose.connection.close();
});
