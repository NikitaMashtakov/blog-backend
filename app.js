const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const routes = require("./routes");
const cors = require("cors");

const port = 3001;
const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(cors());
app.use("/", routes);

mongoose.connect("mongodb://user:mongopass@localhost:27017/").then(() =>
  app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  })
);
