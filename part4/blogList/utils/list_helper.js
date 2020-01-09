const dummy = (blogs) => {
  return 1
}

 const totalLikes = (blogPosts) => {
   const likes = blogPosts.reduce((prev, cur) => {
     return prev + cur.likes
   }, 0)
   return likes
 }

module.exports = {
  dummy,
  totalLikes
}
