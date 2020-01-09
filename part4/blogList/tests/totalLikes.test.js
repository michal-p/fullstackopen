const listHelper = require('../utils/list_helper')

describe('total likes', () => {
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
    }
  ]

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
    expect(result).toBe(104)
  })
})

// Tutorial how to run only one test
// https://jestjs.io/docs/en/api.html#testonlyname-fn-timeout
