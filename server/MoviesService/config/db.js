const mongoose = require("mongoose");

const PORT = process.env.PORT || 3001;
const uris = "mongodb://localhost/entertainme";
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

module.exports = () => {
  mongoose.connect(uris, options, err => {
    if (err) console.log(err);
    else console.log("Database connection successful for movies");
  });
};
