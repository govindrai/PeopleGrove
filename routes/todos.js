const express = require("express"),
  router = express.Router();

const Todo = require("../models/Todo");

router.get("/", (req, res) => {
  Todo.find().then(todos => {
    res.json(todos);
  });
});

router.get("/userInfo", (req, res) => {
  res.json(req.user);
});

router.post("/", (req, res) => {
  const { body: { name, duration }, user } = req;
  console.log(name, duration, user);
  Todo.create({ name, duration, user })
    .then(todo => {
      res.json(todo);
    })
    .catch(e => console.log(e));
});

module.exports = router;
