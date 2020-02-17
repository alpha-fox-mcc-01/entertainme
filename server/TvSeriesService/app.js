const express = require("express");
const app = express();
const routes = require("./routes/");
const PORT = process.env.PORT || 3002;
const db = require("./config/db");

const morgan = require("morgan");
db();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(morgan("dev"));

app.use("/tv", routes);

app.listen(PORT, () => {
  console.log("Tv Series Service running on port " + PORT);
});
