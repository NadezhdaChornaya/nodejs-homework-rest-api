const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

const uriDB = process.env.DB_HOST

const db = mongoose.connect(uriDB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
})

mongoose.connection.on('connected', () => {
    console.log('Database connection successful')
})

mongoose.connection.on('error', (err) => {
    console.log(`Database connection error: ${err.message}`)
})

mongoose.connection.on('disconnected', () => {
    console.log('Database disconnected')
})

// event noda, close app
process.on('SIGINT', async () => {
    console.log('Connection for DB closed and app terminated')
    mongoose.connection.close(() => {
        process.exit(1)
    })
})

module.exports = db
