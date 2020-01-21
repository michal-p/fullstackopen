const mongoose = require('mongoose')
// Use the supertest package for writing a test that makes an HTTP GET request to the /api/blogs url. Verify that the blog list application returns the correct amount of blog posts in the JSON format.
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')

beforeEach(async () => {
  await Blog.deleteMany({})
  console.log('cleared')

  for (let blog of helper.listOfBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
    console.log('saved')
  }
  console.log('done')
})

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
  const response = await api.get('/api/blogs')
  expect(response.body.length).toBe(helper.listOfBlogs.length)
  expect(200)
  expect('json')
})


afterAll(() => {
  mongoose.connection.close()
})
