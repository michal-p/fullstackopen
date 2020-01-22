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

/* async/await */
test('notes are returned as json', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body.length).toBe(helper.listOfBlogs.length)
  expect(200)
  expect('json')
})

test('verifies that the unique identifier property is id', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].id).toBeDefined()
})

test('create a new blog', async () => {
  const newBlog = {
    title: 'new blog', 
    author: 'Michael Chan', 
    url: 'https://reactpatterns.com/', 
    likes: 9
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAfterPostTheNewOne = await helper.blogsInDb()
  expect(blogsAfterPostTheNewOne.length).toBe(helper.listOfBlogs.length + 1)
  const blogs = blogsAfterPostTheNewOne.map(b => {
    delete b.id
    return b
  })
  //content
  expect(blogs).toContainEqual(newBlog)
})

afterAll(() => {
  mongoose.connection.close()
})
