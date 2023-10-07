const express = require('express');
const User = require('../db').User;
const jwt = require('jsonwebtoken');
const { authorization, SECRET } = require('../middleware/auth');

const router = express.Router();

//0. get username
router.get("/username", authorization, async(req,res)=>{
    const user = await User.findOne({ _id: req.userId });
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
router.post("/signup" , async(req,res)=>{

    // logic to sign up 
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user) {
      res.status(403).json({ message: 'User already exists' });
    } else {
      const obj = { username: username, password: password };
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

module.exports = router;