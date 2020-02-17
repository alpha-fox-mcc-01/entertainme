const express = require('express');
const app = express();
const port = process.env.PORT || 3002;
const tvSeriesRouter = require('./routes');
const morgan = require('morgan');

const db = require('./config/db');
db();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan('dev'));

app.use('/tv', tvSeriesRouter);

app.listen(port, () => {
  console.log('Tv Series Service listening on ' + port);
});
