const mongoose = require('mongoose');
const dbConnection =
  process.env.DB_CONNECTION || 'mongodb://localhost/entertainme';

module.exports = () => {
  mongoose.connect(dbConnection, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function() {
    console.log('Mongoose Tv Series connected');
  });
};
