const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const port = 3000;
const cors = require('cors');
const authenticationRouter = require('./routes/authentication');
const todoRouter = require('./routes/todo');


const app = express();
app.use(cors());//backend allows request from everywhere (not for production ready backend, just for testing)
app.use(bodyParser.json());

app.use('/authentication', authenticationRouter);
app.use('/todos', todoRouter);

mongoose.connect('mongodb+srv://iamtusharpuri:BKdwitaMP711lt56@todoapp.nrvjyzj.mongodb.net/');

app.listen(port,(err)=>{
  if(err){ console.log(err)}
  console.log(`App listening on port ${port}`);
})

//All route handlers

module.exports = app;