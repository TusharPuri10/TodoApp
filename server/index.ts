import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
const port = 3000;
import cors from 'cors';
import authenticationRouter from './routes/authentication';
import todoRouter from './routes/todo';


const app = express();
app.use(cors({
  origin: "*",
  credentials: true,
}));//backend allows request from everywhere (not for production ready backend, just for testing)
app.use(bodyParser.json());

app.use('/authentication', authenticationRouter);
app.use('/todos', todoRouter);

mongoose.connect('mongodb+srv://iamtusharpuri:BKdwitaMP711lt56@todoapp.nrvjyzj.mongodb.net/');

app.get('/', (req, res) => {
  res.send('Hello, this is the default route!');
}); 

app.listen(port,()=>{
  console.log(`App listening on port ${port}`);
})

//All route handlers

module.exports = app;