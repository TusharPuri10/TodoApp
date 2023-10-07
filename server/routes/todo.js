const express = require('express');
const { User, Todo } = require('../db');
const authorization = require('../middleware/auth').authorization;

const router = express.Router();

// 1. Retrieve all todo items ( according to user )
router.get("/",authorization, async (req,res) => {
    // logic to view todo of particular user
    const user = await User.findOne({ _id: req.userId }).populate('todos');
    if (user) {
      res.json({ todos: user.todos});
    } else {
      res.status(403).json({ message: 'User not found' });
    }
});

// 2. Get a todo item
router.get("/:id",authorization, async(req,res) => {
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

// 3. Create a todo item ( according to user )
router.post("/", authorization, async (req, res) => {
  const todo = new Todo(req.body);
  await todo.save();
  const user = await User.findOne({ _id: req.userId }); 
    if (user) {
        user.todos.push(todo);
        await user.save();
        res.json({ message: 'Todo created successfully', todoId: todo.id });
    } else {
      res.status(403).json({ message: 'User not found' });
    }
});

// 4. Update a todo item
router.put("/:id",authorization, async (req,res) => {

  const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (todo) {
    res.json({ message: 'todo updated successfully' });
  } else {
    res.status(404).json({ message: 'todo not found' });
  }
});

//5. Delete a todo item
router.delete("/:id",authorization, async(req ,res) =>{
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

module.exports = router;