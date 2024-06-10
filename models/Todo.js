const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
  description: { type: String, required: true },
  done: { type: Boolean, default: false },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null }
});

module.exports = mongoose.model('Todo', TodoSchema);
