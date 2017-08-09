const passport = require("passport"),
  FacebookStrategy = require("passport-facebook").Strategy,
  User = require("../models/User"),
  { FACEBOOK_APP_ID, FACEBOOK_APP_SECRET } = require("./keys");

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

passport.use(
  new FacebookStrategy(
    {
      clientID: FACEBOOK_APP_ID,
      clientSecret: FACEBOOK_APP_SECRET,
      callbackURL: "/auth/facebook/callback",
      profileFields: ["id", "displayName", "email"]
    },
    function(accessToken, refreshToken, profile, done) {
      const { id: facebookId, email, name } = profile._json;
      User.findOne({ facebookId })
        .then(user => {
          if (!user) {
            User.create({ email, facebookId }).then(user => {
              return done(null, user);
            });
          } else {
            return done(null, user);
          }
        })
        .catch(e => console.log(e));
    }
  )
);
