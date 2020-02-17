const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
const movieRouter = require('./routes');
const morgan = require('morgan');

const db = require('./config/db');
db();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan('dev'));

app.use('/movies', movieRouter);

app.listen(port, () => {
  console.log('Movie Service listening on ' + port);
});
