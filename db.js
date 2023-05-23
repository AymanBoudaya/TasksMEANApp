const mongoose = require('mongoose')

const dbUri = process.env.DATABASE_URL

mongoose.set('strictQuery', false)

module.exports = () => {
    return mongoose.connect(dbUri,
        { useNewUrlParser: true, useUnifiedTopology: true })
}