const express = require("express"),
  passport = require("passport"),
  router = express.Router(),
  User = require("../models/User");

// Redirect the user to Facebook for authentication. When complete,
// Facebook will redirect the user back to the application at
// /auth/facebook/callback
router.get(
  "/facebook",
  passport.authenticate("facebook", {
    scope: ["public_profile", "email", "user_friends"]
  })
);

// Facebook will redirect the user to this URL after approval. Finish the
// authentication process by attempting to obtain an access token. If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "/",
    failureRedirect: "/"
  })
);

// logout out user
router.get("/logout", function(req, res) {
  const redirectPath = req.user.admin ? "/admin" : "/";
  req.session = null;
  req.logout();
  res.redirect(redirectPath);
});

// login admin
router.post(
  "/admin",
  passport.authenticate("local", {
    failureRedirect: "/admin?login=failed",
    successRedirect: "/admin"
  })
);

// get info of current user
router.get("/userInfo", (req, res) => {
  if (req.user) {
    const { email, admin } = req.user;
    res.json({ email, admin });
  } else {
    res.json({});
  }
});

// create an test admin account
router.get("/createAdmin", (req, res) => {
  User.create({
    name: "Adam Saven",
    email: "adam@peoplegrove.com",
    password: "peoplegrove",
    admin: true
  })
    .then(user => res.json(user))
    .catch(e => res.json(e));
});

module.exports = router;
