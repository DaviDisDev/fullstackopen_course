const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/users');

const api = supertest(app);

test('createUsers', async () => {
  const newUser = {
    username:"ps",
  name: "pepe",
  password:"123456"};


  const response = await api
    .post('/api/users')
    .send(newUser) 
    .expect(400)
    .expect('Content-Type', /application\/json/);

}, 30000);

afterAll(() => {
  mongoose.connection.close();
});
