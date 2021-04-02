const express = require('express')
const logger = require('morgan')
const cors = require('cors')

// create servise
const app = express()
const contactsRouter = require('./routes/api/contacts')
const usersRouter = require('./routes/api/users')

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

// intermediate handlers
app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.use('/api/contacts', contactsRouter)
app.use('/api/users', usersRouter)

app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    code: 404,
    message: 'Please, use api on routes /api/contacts or /api/users',
    data: 'Not found'
  })
})

app.use((err, req, res, next) => {
  res.status(500).json({
    status: 'error',
    code: 500,
    message: err.message,
    data: 'Internal Server Error'
  })
})

module.exports = app
