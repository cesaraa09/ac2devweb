const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://admin:admin@crud-app.b6hlvck.mongodb.net/?retryWrites=true&w=majority&appName=CRUD-APP', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Conectado com sucesso');
}).catch(err => {
  console.error('Falha na conexão', err);
});

const User = require('./models/User');
const Todo = require('./models/Todo');

/*const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  try {
    const decoded = jwt.verify(token, 'your_jwt_secret');
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).send({ error: 'Please authenticate.' });
  }
};*/
const authMiddleware = require('./middlewares/authMiddleware');

const userRouter = require('./controllers/userController');
const todoRouter = require('./controllers/todoController');

app.use('/auth', authRouter);
app.use('/users', authMiddleware, userRouter);
app.use('/todos', authMiddleware, todoRouter);

app.listen(port, () => {
  console.log(`Porta do servidor: ${port}`);
});
