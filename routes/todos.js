const express = require("express"),
  router = express.Router();

const Todo = require("../models/Todo");

// if admin, get all todos from database
// if nonAdmin, get all todos for reqeust date
router.get("/", (req, res) => {
  if (req.user.admin) {
    Todo.getTodos().then(todos => res.json(todos));
  }
  req.user
    .getTodosForDate(req.query.date)
    .then(todos => {
      return res.json(todos);
    })
    .catch(e => console.log(e));
});

// get todo with request param id
router.get("/edit/:id", (req, res) => {
  Todo.findById(req.params.id)
    .then(todo => {
      res.json(todo);
    })
    .catch(e => console.log(e));
});

// create new todo with request body
router.post("/", (req, res) => {
  const { body: { name, duration }, user } = req;
  Todo.create({ name, duration, user })
    .then(todo => {
      res.json(todo);
    })
    .catch(e => console.log(e));
});

// update todo with request body
router.put("/edit/:id", (req, res) => {
  const { params: { id: _id }, body: { name, duration } } = req;
  Todo.findOneAndUpdate({ _id }, { $set: { name, duration } }, { new: true })
    .then(updatedTodo => {
      res.json(updatedTodo);
    })
    .catch(e => console.log(e));
});

module.exports = router;
