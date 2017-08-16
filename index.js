const express = require("express"),
  path = require("path"),
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
    keys: [process.env.COOKIE_KEY || "secret"],
    maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/api/todos", todos);
app.use("/auth", auth);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(process.env.PORT || 5000, err => {
  if (err) return console.log(err);
  console.log(`Successfully listening for network requests`);
});
