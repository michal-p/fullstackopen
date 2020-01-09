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

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog
}
