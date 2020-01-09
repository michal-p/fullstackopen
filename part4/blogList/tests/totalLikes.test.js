const listHelper = require('../utils/list_helper')

const listOfBlogs = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5e1710181c9d440000a139df',
    title: 'Fufu',
    author: 'Ferdinant',
    url: 'www.fufu.sk',
    likes: 99,
    __v: 0
  },
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  }
]

describe('total likes', () => {

  test('of empty list is zero', () => {
    const result = listHelper.totalLikes([])
    expect(result).toBe(0)
  })

  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes([listOfBlogs[0]])
    expect(result).toBe(5)
  })

  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(listOfBlogs)
    expect(result).toBe(128)
  })
})

describe('the favouritest blog', () => {
  const fav = {
    title: 'Fufu',
    author: 'Ferdinant',
    likes: 99
  }
  test('is right', () => {
    const result = listHelper.favouriteBlog(listOfBlogs)
    expect(result).toEqual(fav)
  })

  const initObj = {
    title: 'initTitle',
    author: 'initAuthor',
    likes: -1
  }
  test('of empty list is initObj', () => {
    const result = listHelper.favouriteBlog([])
    expect(result).toEqual(initObj)
  })

  const first = {
    title: listOfBlogs[0].title,
    author: listOfBlogs[0].author,
    likes: listOfBlogs[0].likes
  }
  test('when list has only one blog the favourite one is that', () => {
    const result = listHelper.favouriteBlog([listOfBlogs[0]])
    expect(result).toEqual(first)
  })
})

describe('the most active blogger', () => {
  const activeBlogger = { author: 'Edsger W. Dijkstra', blogs: 3 }
  test('is', () => {
    const result = listHelper.mostBlogs(listOfBlogs)
    expect(result).toEqual(activeBlogger)
  })
})

describe('the most liked blogger', () => {
  const likedBlogger = { author: 'Ferdinant', likes: 99 }
  test('is', () => {
    const result = listHelper.mostLikes(listOfBlogs)
    expect(result).toEqual(likedBlogger)
  })
})
// Tutorial how to run only one test
// https://jestjs.io/docs/en/api.html#testonlyname-fn-timeout
