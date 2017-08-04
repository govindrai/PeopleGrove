const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send({ status: 200 });
});

const PORT = process.env.PORT || 5000;
app.listen(5000, err => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Successfully listening on port ${PORT}`);
  }
});
