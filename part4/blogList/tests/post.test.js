const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blogs'); // Asegúrate de importar tu modelo de blog

const api = supertest(app);

test('createBlog', async () => {
  const newBlog = {
    title: 'Nuevo Blog',
    author: 'Autor del Blog',
    url: 'https://ejemplo.com',
    likes: 10,
  };
  const blogsBeforePost = await Blog.find({});
  // Realiza una solicitud HTTP POST para crear una nueva publicación de blog
  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201) // Verifica que la respuesta sea 201 (creado) o 200 (éxito)
    .expect('Content-Type', /application\/json/);

  // Verifica que el número total de blogs se haya incrementado en uno
  const blogsAfterPost = await Blog.find({});
  expect(blogsAfterPost).toHaveLength(blogsBeforePost.length + 1);
  
}, 30000);

afterAll(() => {
  mongoose.connection.close();
});
