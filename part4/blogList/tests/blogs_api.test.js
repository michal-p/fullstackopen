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
  }
  console.log('done')
})

describe('when there is initially some notes saved', () => {
  test('notes are returned as json', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body.length).toBe(helper.listOfBlogs.length)
    expect(200)
    expect('json')
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
})

describe('Check Blog correct properties', () => {
  test('verifies that the unique identifier property is id', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
  })

  test('check default number for likes is zero', async () => {
    const newBlog = {
      title: 'new blog without likes', 
      author: 'Michael Chan', 
      url: 'https://reactpatterns.com/', 
    }
  
    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    
      const blog = await Blog.findById(response.body.id)
      expect(blog.likes).toBe(0)
  })

  test('missing url and title', async () => {
    const newBlog = {
      title: '', 
      author: 'Michael Chan', 
      url: '', 
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })
})

describe('CRUD operations', () => {
  test('delete', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]
    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length).toBe(helper.listOfBlogs.length - 1)
  })

  test('update', async () => {
    let updatingBlog = new Blog( { ...helper.listOfBlogs[0], likes: 50 } ).toJSON()
    const updated = await api
      .put(`/api/blogs/${updatingBlog.id}`)//toJSON
      .send(updatingBlog)
      .expect(200)

    expect(updated.body).toEqual(updatingBlog)
  })

})

afterAll(() => {
  mongoose.connection.close()
})
