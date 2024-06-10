const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

router.post('/signup', async (req, res) => {
  const { nome, email, senha, role } = req.body;
  const hashedPassword = await bcrypt.hash(senha, 8);
  const user = new User({ nome, email, senha: hashedPassword, role });
  try {
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post('/login', async (req, res) => {
  const { email, senha } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(senha, user.senha))) {
      return res.status(400).send({ error: 'Invalid login credentials' });
    }
    const token = jwt.sign({ _id: user._id, role: user.role }, 'your_jwt_secret');
    res.send({ user, token });
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get('/', async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.status(500).send();
  }
});

router.get('/count-by-role', async (req, res) => {
  try {
    const countByRole = await User.aggregate([
      { $group: { _id: '$role', count: { $sum: 1 } } }
    ]);
    res.send(countByRole);
  } catch (error) {
    res.status(500).send();
  }
});

router.put('/:id', async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['nome', 'email', 'role', 'senha'];
  const isValidOperation = updates.every(update => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }

  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send();
    }

    updates.forEach(update => user[update] = req.body[update]);
    await user.save();
    res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (error) {
    res.status(500).send();
  }
});

module.exports = router;
