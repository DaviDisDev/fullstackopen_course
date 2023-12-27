const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('idChecker', async () => {
const result=  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
  
      result.body.forEach(blog => {
        expect(blog.id).toBeDefined();
      }); 
  

}, 100000)

afterAll(() => {
  mongoose.connection.close()
})