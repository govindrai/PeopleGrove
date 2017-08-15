const mongoose = require("mongoose"),
  bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    validate: {
      validator: function uniqueEmail(email, callback) {
        User.findOne({ email })
          .then(user => {
            callback(user === null);
          })
          .catch(e => console.log(e));
      },
      message: "{VALUE} is already taken!"
    },
    required: [true, "You must provide an email"]
  },
  facebookId: {
    type: String
  },
  admin: {
    type: Boolean,
    default: false
  },
  password: {
    type: String,
    minlength: 8,
    maxlength: 128,
    required: true
  }
});

userSchema.pre("save", function(next) {
  const user = this;
  bcrypt.hash(user.password, 10).then(hash => {
    user.password = hash;
    next();
  });
});

userSchema.methods.verifyPassword = function(plaintextPassword) {
  const user = this;
  if (user.password) {
    return bcrypt
      .compare(plaintextPassword, user.password)
      .then(res => {
        return user;
      })
      .catch(e => {
        console.log(e);
        return false;
      });
  } else {
    return false;
  }
};

const User = mongoose.model("User", userSchema);

module.exports = User;
