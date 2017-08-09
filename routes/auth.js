const express = require("express"),
  passport = require("passport"),
  router = express.Router();

router.get("/login", (req, res) => {
  res.send(
    '<h1>YOU DONE GOOFED!</h1><a href="/auth/facebook">Login with Facebook</a>'
  );
});

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
    failureRedirect: "/login"
  })
);

module.exports = router;
