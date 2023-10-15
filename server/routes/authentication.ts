import express from 'express';
import {User} from'../db';
import jwt from 'jsonwebtoken';
import authorization from '../middleware/auth';
import {SECRET} from '../middleware/auth';
import { Router } from 'express';
import { Request, Response } from 'express';
import {z} from 'zod';

const router = Router();

const CreateUsernameRequest = z.object({
  username: z.string().min(3).max(20),
  password: z.string().min(6).max(20)
});

//0. get username
router.get("/username", authorization, async(req: Request,res: Response)=>{
    const user = await User.findOne({ _id: req.headers["userId"] });
    if(user)
    {
      res.json({username: user.username});
    }
    else
    {
      res.status(403).json({message: 'User not found'});
    }
});

  // 1. User Signup
router.post("/signup" , async(req: Request ,res: Response)=>{

    // logic to sign up 
    const inputs = CreateUsernameRequest.safeParse(req.body);
    if(!inputs.success)
    {
      return res.status(411).json({message: 'Invalid username or password'});
    }
    // const { username, password } = req.body;
    const user = await User.findOne({ username: inputs.data.username });
    if (user) {
      res.status(403).json({ message: 'User already exists' });
    } else {
      const obj = { username: inputs.data.username, password: inputs.data.password };
      const newUser = new User(obj);
      await newUser.save();
      const token = jwt.sign({id: newUser._id}, SECRET, { expiresIn: '1h' });
      res.json({ message: 'User created successfully', token });
    }
});

// 2. User login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username, password });
  if (user) {
    const token = jwt.sign({id: user._id}, SECRET, { expiresIn: '1h' });
    res.json({ message: 'Logged in successfully', token });
  } else {
    res.status(403).json({ message: 'Invalid username or password' });
  }
});

export default router;