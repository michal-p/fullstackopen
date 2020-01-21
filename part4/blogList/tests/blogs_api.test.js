const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

// Use the supertest package for writing a test that makes an HTTP GET request to the /api/blogs url. Verify that the blog list application returns the correct amount of blog posts in the JSON format.

/* test by promise */
// test('notes are returned as json promise', () => {
//   api
//     .get('/api/blogs')
//     .then(response => {
//       console.log('promise test')
//       response.expect('Content-Type', /application\/json/)
//       response.expect(200)
//     })
//     .catch(console.error)
// })

/* async/await */
test('notes are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})


afterAll(() => {
  mongoose.connection.close()
})
