const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const { register, login, getUsers } = require("./controllers/user");
const mapUser = require("./helpers/mapUser");
const authenticated = require("./moddlewares/authenticated");
const ROLES = require("./constants/roles");
const hasRole = require("./moddlewares/hasRole");
const port = 3001;
const app = express();

app.use(cookieParser());
app.use(express.json());

app.post("/register", async (req, res) => {
  try {
    const user = await register(req.body.login, req.body.password);
    res
      .cookie("token", token, { httpOnly: true })
      .send({ error: null, user: mapUser(user) });
  } catch (e) {
    res.send({ error: e.message || "Unknown error" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { user, token } = await login(req.body.login, req.body.password);
    res
      .cookie("token", token, { httpOnly: true })
      .send({ error: null, user: mapUser(user) });
  } catch (e) {
    res.send({ error: e.message || "Unknown error" });
  }
});

app.post("/logout", (req, res) => {
  res.cookie("token", "", { httpOnly: true }).send({});
});

app.use(authenticated);

app.get("/users", hasRole([ROLES.ADMIN]), async (req, res) => {
  const users = await getUsers();

  res.send({ data: users });
});

mongoose.connect("mongodb://user:mongopass@localhost:27017/").then(() =>
  app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  })
);
