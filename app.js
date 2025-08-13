const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const port = 3001;
const app = express();

app.use(cookieParser());
app.use(express.json());

mongoose.connect("mongodb://user:mongopass@localhost:27017/").then(() =>
  app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  })
);
