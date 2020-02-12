const express = require('express')
const app = express()
const PORT = process.env.PORT || 3001
const logger = require('morgan')
const routes = require('./routes')
const mongoose = require('mongoose')
const uri = 'mongodb://localhost:27017/entertainme' || process.env.ATLAS_CONNECT

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true})
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('db movie connected')
});

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(logger('dev'))
app.use('/', routes)

app.use('/', (req, res, next, err) => {
    console.log(err)
    res.status(500).json({ error: err})
})

app.listen(PORT, () => {
    console.log('app running on port ', PORT)
})