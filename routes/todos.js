const express = require("express"),
  router = express.Router();

const Todo = require("../models/Todo");

router.get("/", (req, res) => {
  const { date: lowerBound } = req.query;
  const upperBound = new Date(lowerBound);
  upperBound.setDate(upperBound.getDate() + 1);
  if (req.user) {
    Todo.find()
      .where("createdAt")
      .gt(lowerBound)
      .lt(upperBound)
      .then(todos => {
        res.json(todos);
      })
      .catch(e => console.log(e));
  } else {
    res.send([]);
  }
});

router.get("/edit/:id", (req, res) => {
  Todo.findById(req.params.id)
    .then(todo => {
      res.json(todo);
    })
    .catch(e => console.log(e));
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

router.put("/edit/:id", (req, res) => {
  const { params: { id: _id }, body: { name, duration } } = req;
  Todo.findOneAndUpdate({ _id }, { $set: { name, duration } }, { new: true })
    .then(updatedTodo => {
      res.json(updatedTodo);
    })
    .catch(e => console.log(e));
});

module.exports = router;
