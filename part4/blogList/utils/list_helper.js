const _ = require('lodash');

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogPosts) => {
  const likes = blogPosts.reduce((prev, curr) => {
    return prev + curr.likes
  }, 0)
  return likes
}

const favouriteBlog = (blogPosts) => {
  const initObj = {
    title: 'initTitle',
    author: 'initAuthor',
    likes: -1
  }
  return blogPosts.reduce((acc, curr) => {
    if(curr.likes > acc.likes) {
      acc.title = curr.title,
      acc.author = curr.author,
      acc.likes = curr.likes
    }
    return acc
  }, initObj)
}

const mostBlogs = (blogPosts) => {
  let group = _.groupBy(blogPosts, 'author')
  let bloggers = Object.keys(group).map(a => {
    return { 'author': a, 'blogs': group[a].length }
  })
  return _.maxBy(bloggers, o => o.blogs)
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs
}
