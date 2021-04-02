const app = require('../app')
const mongoose = require('mongoose')
require('dotenv').config()
// const db = require('../model/mongoDB')

const PORT = process.env.PORT || 3000
const { DB_HOST } = process.env
// app.listen(PORT, () => {
//   console.log(`Server running. Use our API on port: ${PORT}`)
// })
mongoose.Promise = global.Promise

const connection = mongoose.connect(DB_HOST, {
  promiseLibrary: global.Promise,
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
})

connection.then(() => {
  app.listen(PORT, () => {
    console.log(`Server running. Use our API on port: ${PORT}`)
  })
}).catch((err) => {
  console.log(`Server not running. Error message: ${err.message}`)
  process.exit(1)
})
