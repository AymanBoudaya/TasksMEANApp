const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config();

//local imports
const connectDb = require('./db.js')
const taskRoutes = require('./controllers/task.controller')
const { errorHandler } = require('./middlewares')

const app = express()
//middleware
app.use(bodyParser.json())
app.use(cors({origin:'http://localhost:4200'}))
app.use('/api/tasks', taskRoutes)
app.use(errorHandler)


connectDb()
    .then(() => {
        console.log('db connection succeeded.')
        app.listen(3000,
            () => console.log('server started at 3000.'))
    })
    .catch(err => console.log(err))