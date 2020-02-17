const express = require("express");
const app = express();
const routes = require("./routes/");
const PORT = process.env.PORT || 3001;
const db = require("./config/db");
const morgan = require("morgan");

db();

app.use(morgan("dev"));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/movies", routes);

app.listen(PORT, () => {
  console.log("Movies Service running on port " + PORT);
});
