const mongoose = require("mongoose"),
  bcrypt = require("bcrypt"),
  Todo = require("./Todo");

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
    required: true,
    default: "nopassword"
  }
});

// prior to saving a user, hash their password
userSchema.pre("save", function(next) {
  const user = this;
  bcrypt.hash(user.password, 10).then(hash => {
    user.password = hash;
    next();
  });
});

// verify user password
userSchema.methods.verifyPassword = function(plaintextPassword) {
  const user = this;
  if (user.password) {
    return bcrypt
      .compare(plaintextPassword, user.password)
      .then(isMatch => {
        return isMatch ? user : false;
      })
      .catch(e => {
        console.log(e);
        return false;
      });
  } else {
    return false;
  }
};

userSchema.methods.getTodosForDate = function(date) {
  const user = this,
    lowerBound = date,
    upperBound = new Date(lowerBound);

  upperBound.setDate(upperBound.getDate() + 1);

  return Todo.find({ user: user._id })
    .where("createdAt")
    .gt(lowerBound)
    .lt(upperBound);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
