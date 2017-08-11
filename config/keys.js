console.log("NODE_ENV", process.env.NODE_ENV);

module.exports =
  process.env.NODE_ENV === "production" ? require("./prod") : require("./dev");
