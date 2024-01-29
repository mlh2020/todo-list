const express = require('express');
const router = express.Router();

// Todo Model
const Todo = require('../models/Todo');

// @route GET api/todos
// @desc Get All Todos
router.get('/', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route POST api/todos
// @desc Create a Todo
router.post('/', async (req, res) => {
  const newTodo = new Todo({
    title: req.body.title
  });

  try {
    const todo = await newTodo.save();
    res.json(todo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// @route PUT api/todos/:id
// @desc Update a Todo
router.put('/:id', async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) return res.status(404).json({ message: 'Todo not found' });

    todo.title = req.body.title || todo.title;
    todo.isCompleted = req.body.isCompleted !== undefined ? req.body.isCompleted : todo.isCompleted;

    const updatedTodo = await todo.save();
    res.json(updatedTodo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// @route DELETE api/todos/:id
// @desc Delete a Todo
router.delete('/:id', async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) return res.status(404).json({ message: 'Todo not found' });

    await todo.remove();
    res.json({ message: 'Todo deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
