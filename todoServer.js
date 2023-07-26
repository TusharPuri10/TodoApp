/**
  You need to create an express HTTP server in Node.js which will handle the logic of a todo list app.
  - Don't use any database, just store all the data in an array to store the todo list data (in-memory)
  - Hard todo: Try to save responses in files, so that even if u exit the app and run it again, the data remains (similar to databases)

  Each todo has a title and a description. The title is a string and the description is a string.
  Each todo should also get an unique autogenerated id every time it is created
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

    - For any other route not defined in the server return 404

  Testing the server - run `npm run test-todoServer` command in terminal
 */
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const port = 3001;
const {v1 : uuidv1} = require('uuid')
const path = require('path');
const cors = require('cors');
app.use(cors());//backend allows request from everywhere (not for production ready backend, just for testing)
// let todo_list = [];

//testing how to make 2d array
// console.log(todo);
// todo.push([id,"todo1","get bath"]);
// ++id;
// todo.push([id,"todo2","dry clean"]);
// ++id;
// todo.push([id,"todo3","code java"]);
// ++id;
// console.log(todo);

app.use(bodyParser.json());

//All route handlers
// 1.GET /todos - Retrieve all todo items
app.get("/todos",(req,res) => {
  fs.readFile("todos.json","utf-8",(err, data) => {
    if(err) console.log(err);
    else res.json(JSON.parse(data));//When using the JSON.parse() on a JSON derived from an array,
    // the method will return a JavaScript array, instead of a JavaScript object.
  });
});

app.get("/todos/:id",(req,res) => {
  fs.readFile("todos.json","utf-8",(err, data) => {
    let todos_list = JSON.parse(data);

  let flag=0;
  todos_list.forEach((todo) => {
    if(todo.id == req.params.id)
    {
        flag=1;
        res.status(200).send(todo);
    }
  })
  if(flag==0)
  {
    res.status(404).send("Not Found");
  }

});
});

app.post("/todos",(req, res) => {
  let todo = {};
  const id = uuidv1();
  todo.id = id;
  todo.title = req.body.title;
  // todo.completed = req.body.completed;
  todo.description = req.body.description;
  fs.readFile("todos.json","utf-8",(err, data) => {
    if(err) throw err;
    else
    {
      let todos_list = JSON.parse(data);
      todos_list.push(todo);
      fs.writeFile("todos.json",JSON.stringify(todos_list), (err) => {
          if(err) throw err;
          res.status(201).send({"id" : id});
      });
    }
  });
});//3


app.put("/todos/:id",(req,res) => {
  let flag=0;
  fs.readFile("todos.json","utf-8",(err,data) => {
    if(err) throw err;
    let todos_list = JSON.parse(data);
    todos_list.forEach((todo) => {
    if(todo.id == req.params.id)
    {
        flag=1;
        // todo.completed = req.body.completed;
        todo.description = req.body.description;
    }
    });
    if(flag==1)
    {
      fs.writeFile("todos.json",JSON.stringify(todos_list), (err) => {
        if(err) throw err;
        res.status(200).send("OK");
      });
    }
    else
    {
      res.status(404).send("Not Found");
    }
  });
});//4

app.delete("/todos/:id",(req ,res) =>{
  fs.readFile("todos.json","utf-8",(err,data) => {
    if(err) throw err;
    todos_list = JSON.parse(data);
    let flag=0;
    let i=0;
    while(i < todos_list.length)
    {
      if(todos_list[i].id == req.params.id)
      {
        flag=1;
        todos_list.splice(i,1);
      }
      else
      {
        ++i;
      }
    }
    if(flag==1)
    {
      fs.writeFile("todos.json",JSON.stringify(todos_list), (err) => {
        if(err) throw err;
        res.status(200).send("OK");
      });
    }
    else
    {
      res.status(404).send("Not Found");
    }
  });
});//5


// frontend and backend at same page
// app.get("/",(req,res)=>{
//   res.sendFile(path.join(__dirname,"index.html"));
// })

app.listen(port,(err)=>{
  if(err){ console.log(err)}
  console.log(`App listening on port ${port}`);
})

module.exports = app;
