const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const router = require('./routes');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/', router);

app.get('*', (req, res) => {
  res.status(404).json({
    message: '404 Page Not Found',
  });
});

app.listen(port, () => {
  console.log('Orchestra Service listening on port ' + port);
});
