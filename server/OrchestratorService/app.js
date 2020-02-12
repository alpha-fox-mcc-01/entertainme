const express = require("express");
const app = express();
const morgan = require("morgan");
const routes = require("./routes/");
const PORT = process.env.PORT || 3000;
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(morgan("dev"));

app.use("/", routes);

app.listen(PORT, () => {
  console.log("Orchestrator server is running on port " + PORT);
});
