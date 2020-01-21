const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
mongoose.set('useFindAndModify', false)

const blogSchema = mongoose.Schema({
  title: {
    type: String,
    unique: true
  },
  author: String,
  url: String,
  likes: Number
})

blogSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Blog', blogSchema)
