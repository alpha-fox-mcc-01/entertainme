const mongoDBConnection = require('./configs/mongoDBConnection')
const router = require('./routes/')
const errorHandler = require('./middlewares/errorHandlers')
const morgan = require('morgan')
const express = require('express')
const app = express()
app.use(morgan('dev'))
mongoDBConnection()

const PORT = process.env.PORT || 3002
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/', router)

app.use(errorHandler)
app.listen(PORT, () => {
  console.log('TVSeries Services running at port:', PORT)
})
