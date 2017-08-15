const mongoose = require("mongoose"),
  { MONGO_URL } = require("./keys");

mongoose.Promise = global.Promise;
mongoose.set("debug", true);
mongoose.connect(MONGO_URL, { useMongoClient: true }, err => {
  if (err) {
    console.log(err);
  } else {
    console.log("Connected to PeopleGrove mlab database!");
    console.log(mongoose.modelNames());
  }
});
