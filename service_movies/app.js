const mongoDBConnection = require('./configs/mongoDBConnection')
const router = require('./routes/')
const errorHandler = require('./middlewares/errorHandlers')
const express = require('express')
const morgan = require('morgan')
const app = express()
app.use(morgan('dev'))

const PORT = process.env.PORT || 3001
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/', router)

mongoDBConnection()
app.use(errorHandler)

app.listen(PORT, () => {
  console.log('Movie Services running at port:', PORT)
})
