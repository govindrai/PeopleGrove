const express = require("express"),
  router = express.Router();

const Todo = require("../models/Todo");

router.get("/", (req, res) => {
  Todo.find()
    .then(todos => {
      res.json(todos);
    })
    .catch(e => console.log(e));
});

router.get("/userInfo", (req, res) => {
  res.json(req.user);
});

router.get("/edit/:id", (req, res) => {
  Todo.findById(req.params.id)
    .then(todo => {
      console.log(todo);
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
  console.log(_id, name, duration);
  Todo.findOneAndUpdate({ _id }, { $set: { name, duration } }, { new: true })
    .then(updatedTodo => {
      console.log(updatedTodo);
      res.json(updatedTodo);
    })
    .catch(e => console.log(e));
});

module.exports = router;
