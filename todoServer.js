/**
  The expected API endpoints are defined below,
  1.GET /todos - Retrieve all todo items
    Description: Returns a list of all todo items.
    Response: 200 OK with an array of todo items in JSON format.
    Example: GET http://localhost:3000/todos
    
  2.GET /todos/:id - Retrieve a specific todo item by ID
    Description: Returns a specific todo item identified by its ID.
    Response: 200 OK with the todo item in JSON format if found, or 404 Not Found if not found.
    Example: GET http://localhost:3000/todos/123
    
  3. POST /todos - Create a new todo item
    Description: Creates a new todo item.
    Request Body: JSON object representing the todo item.
    Response: 201 Created with the ID of the created todo item in JSON format. eg: {id: 1}
    Example: POST http://localhost:3000/todos
    Request Body: { "title": "Buy groceries", "completed": false, description: "I should buy groceries" }
    
  4. PUT /todos/:id - Update an existing todo item by ID
    Description: Updates an existing todo item identified by its ID.
    Request Body: JSON object representing the updated todo item.
    Response: 200 OK if the todo item was found and updated, or 404 Not Found if not found.
    Example: PUT http://localhost:3000/todos/123
    Request Body: { "title": "Buy groceries", "completed": true }
    
  5. DELETE /todos/:id - Delete a todo item by ID
    Description: Deletes a todo item identified by its ID.
    Response: 200 OK if the todo item was found and deleted, or 404 Not Found if not found.
    Example: DELETE http://localhost:3000/todos/123


 */
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');


app.use(cors());//backend allows request from everywhere (not for production ready backend, just for testing)
app.use(bodyParser.json());

//secret key for jsonwebtoken
const SECRET = 'fisufasfasggaewgfjasbew241qr';

//define mongoose schema
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  todos :  [{type: mongoose.Schema.Types.ObjectId, ref: 'Todo'}]
})

const todoSchema = new mongoose.Schema({
  title: String,
  description: String,
  completed: Boolean
})

//define mongoose model
const User = mongoose.model('User',userSchema);
const Todo = mongoose.model('Todo',todoSchema);

mongoose.connect('mongodb+srv://iamtusharpuri:BKdwitaMP711lt56@todoapp.nrvjyzj.mongodb.net/')//TODO: add connection string here

//Authorization
function authorization(req,res,next)
{
  const authHeader = req.headers.authorization;
  if(authHeader)
  {
    const token = authHeader.split(' ')[1];
    jwt.verify(token,SECRET,(err,user)=>{
      if(err)
      {
        res.sendStatus(403);
      }
      else
      {
        req.user = user;
        next();
      }
    })
  }
  else
  {
    res.sendStatus(401)
  }
}

//All route handlers

//0. get username
app.get("/username", authorization, async(req,res)=>{
  res.json({
    username: req.user.username
  })
});

// 1. User Signup
app.post("/signup" , async(req,res)=>{

    // logic to sign up 
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user) {
      res.status(403).json({ message: 'User already exists' });
    } else {
      const obj = { username: username, password: password };
      const newUser = new User(obj);
      await newUser.save();
      const token = jwt.sign({ username}, SECRET, { expiresIn: '1h' });
      res.json({ message: 'User created successfully', token });
    }
});

// 2. User login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username, password });
  if (user) {
    const token = jwt.sign({ username}, SECRET, { expiresIn: '1h' });
    res.json({ message: 'Logged in successfully', token });
  } else {
    res.status(403).json({ message: 'Invalid username or password' });
  }
});

// 3. Retrieve all todo items ( according to user )
app.get("/todos",authorization, async (req,res) => {
    // logic to view todo of particular user
    const user = await User.findOne({ username: req.user.username }).populate('todos');
    if (user) {
      res.json({ todos: user.todos});
    } else {
      res.status(403).json({ message: 'User not found' });
    }
});

// 4. Get a todo item
app.get("/todos/:id",authorization, async(req,res) => {
  const todo = await Todo.findById(req.params.id);
  if(todo)
  {
    res.json({todo});
  }
  else
  {
    res.status(404).json({ message: 'todo not found' });
  }
});

// 5. Create a todo item ( according to user )
app.post("/todos", authorization, async (req, res) => {
  const todo = new Todo(req.body);
  await todo.save();
  const user = await User.findOne({ username: req.user.username });
    if (user) {
        user.todos.push(todo);
        await user.save();
        res.json({ message: 'Todo created successfully', todoId: todo.id });
    } else {
      res.status(403).json({ message: 'User not found' });
    }
});

// 6. Update a todo item
app.put("/todos/:id",authorization, async (req,res) => {

  const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (todo) {
    res.json({ message: 'todo updated successfully' });
  } else {
    res.status(404).json({ message: 'todo not found' });
  }
});

//7. Delete a todo item
app.delete("/todos/:id",authorization, async(req ,res) =>{
  const todo = await Todo.findByIdAndDelete(req.params.id);
  if(todo)
  {
    res.json({ message: 'todo deleted successfully' });
  }
  else
  {
    res.status(404).json({ message: 'todo not found' });
  }
});

app.listen(port,(err)=>{
  if(err){ console.log(err)}
  console.log(`App listening on port ${port}`);
})

module.exports = app;