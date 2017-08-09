const express = require("express"),
  bodyParser = require("body-parser"),
  passport = require("passport"),
  cookieSession = require("cookie-session");

require("./config/mongoose");
require("./config/passport");

const todos = require("./routes/todos");
const auth = require("./routes/auth");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  cookieSession({
    keys: ["blah blah"],
    maxAge: 30 * 24 * 60 * 60 * 1000
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/api/todos", todos);
app.use("/auth", auth);

app.get("/", (req, res) => {
  res.json({ status: 200 });
});

const PORT = process.env.PORT || 5000;
app.listen(5000, err => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Successfully listening on port ${PORT}`);
  }
});
