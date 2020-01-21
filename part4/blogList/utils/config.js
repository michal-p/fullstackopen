require('dotenv').config()

const PORT = process.env.PORT
let MONGODB_URI = process.env.MONGODB_URI

//The convention in Node is to define the execution mode of the application with the NODE_ENV environment variable. Check: package.json -> scripts
if (process.env.NODE_ENV === 'test') {
  MONGODB_URI = process.env.TEST_MONGODB_URI
}

module.exports = {
  MONGODB_URI,
  PORT
}
