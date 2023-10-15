import express from 'express';
import { User, Todo } from '../db';
import  authorization  from '../middleware/auth';
import { Router } from 'express';
import mongoose from 'mongoose';
import { Request, Response } from 'express';
import {z} from 'zod';

const router = Router();

// interface CreateTodoRequest<id> {
//   _id: id,
//   title: string,
//   description: string,
//   completed: boolean
// }

const CreateTodoRequest = z.object({
  title: z.string().max(20),
  description: z.string().max(100),
  completed: z.boolean()
});

// 1. Retrieve all todo items ( according to user )
router.get("/",authorization, async (req: Request,res: Response) => {
    // logic to view todo of particular user
    const user = await User.findOne({ _id: req.headers["userId"] }).populate('todos');
    if (user) {
      res.json({ todos: user.todos});
    } else {
      res.status(403).json({ message: 'User not found' });
    }
});

// 2. Get a todo item
router.get("/:id",authorization, async(req: Request,res: Response) => {
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
router.post("/", authorization, async (req: Request, res: Response) => {
  
  // the as keyword is used to cast the type of the object
  // as keyword in not considered type safe in typescript because it can be used to cast any type to any other type

  // const todo = new Todo(req.body) as mongoose.Document & {
  //   _id: mongoose.Types.ObjectId;
  // };

  // const inputs: CreateTodoRequest<mongoose.Types.ObjectId> = req.body;

  const inputs = CreateTodoRequest.safeParse(req.body);
  if(!inputs.success)
  {
    const errorMessage = JSON.parse(inputs.error.message);
    // console.log(errorMessage[0].message);
    return res.status(411).json({message: errorMessage[0].message});
  }
  const todo = new Todo({title: inputs.data.title, description: inputs.data.description, completed: inputs.data.completed});
  await todo.save();
  const user = await User.findOne({ _id: req.headers["userId"] }); 
    if (user) {
        user.todos.push(todo._id);
        await user.save();
        res.json({ message: 'Todo created successfully', todoId: todo.id });
    } else {
      res.status(403).json({ message: 'User not found' });
    }
});

// 4. Update a todo item
router.put("/:id",authorization, async (req: Request, res: Response) => {

  const inputs = CreateTodoRequest.safeParse(req.body);
  if(!inputs.success)
  {
    const errorMessage = JSON.parse(inputs.error.message);
    // console.log(errorMessage[0].message);
    return res.status(411).json({message: errorMessage[0].message});
  }

  const todo = await Todo.findByIdAndUpdate(req.params.id, inputs.data, { new: true });
  if (todo) {
    res.json({ message: 'todo updated successfully' });
  } else {
    res.status(404).json({ message: 'todo not found' });
  }
});

//5. Delete a todo item
router.delete("/:id",authorization, async(req: Request ,res: Response) =>{
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

export default router;