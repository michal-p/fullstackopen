const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

//methods provided by supertest for verifying the status code and headers

test('notes are returned as json', async () => {
  await api
    .get('/api/notes')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})
//inspecting the response data stored in response.body property. Our tests verify the format and content of the response data with the expect method of Jest.
test('there are four notes', async () => {
	// execution gets here only after the HTTP request is complete
	// the result of HTTP request is saved in variable result
  const response = await api.get('/api/notes')
  expect(response.body.length).toBe(4)
})
//inspecting the response data stored in response.body property. Our tests verify the format and content of the response data with the expect method of Jest.
test('the first note is about HTTP methods', async () => {
  const response = await api.get('/api/notes')
  expect(response.body[0].content).toBe('HTML is easy')
})

afterAll(() => {
  mongoose.connection.close()
})