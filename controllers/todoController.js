const express = require('express');
const Todo = require('../models/Todo');

const router = express.Router();

// Get all todos for logged-in user
router.get('/', async (req, res) => {
  try {
    const todos = await Todo.find({ owner: req.user._id });
    res.send(todos);
  } catch (error) {
    res.status(500).send();
  }
});

// Get unassigned todos
router.get('/unassigned', async (req, res) => {
  try {
    const todos = await Todo.find({ owner: null });
    res.send(todos);
  } catch (error) {
    res.status(500).send();
  }
});

// Create a new todo
router.post('/', async (req, res) => {
  const todo = new Todo({
    ...req.body,
    owner: req.user._id
  });

  try {
    await todo.save();
    res.status(201).send(todo);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Update a todo
router.put('/:id', async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['description', 'done', 'owner'];
  const isValidOperation = updates.every(update => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }

  try {
    const todo = await Todo.findOne({ _id: req.params.id, owner: req.user._id });
    if (!todo) {
      return res.status(404).send();
    }

    updates.forEach(update => todo[update] = req.body[update]);
    await todo.save();
    res.send(todo);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete a todo
router.delete('/:id', async (req, res) => {
  try {
    const todo = await Todo.findOneAndDelete({ _id: req.params.id, owner: req.user._id });
    if (!todo) {
      return res.status(404).send();
    }
    res.send(todo);
  } catch (error) {
    res.status(500).send();
  }
});

// Assign a user to a todo
router.put('/:id/assign', async (req, res) => {
  const { ownerId } = req.body;

  try {
    const todo = await Todo.findOne({ _id: req.params.id, owner: null });
    if (!todo) {
      return res.status(404).send({ error: 'Todo not found or already assigned' });
    }

    todo.owner = ownerId;
    await todo.save();
    res.send(todo);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
