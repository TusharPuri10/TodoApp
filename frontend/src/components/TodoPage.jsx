import { useState,useEffect } from "react";
import './styles/TodoPage.css'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { Button, Typography,TextField, IconButton } from "@mui/material";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';

function useGetTodo(){
    const [todos,setTodos] = useState([])
    useEffect(()=>{
      fetch("http://localhost:3000/todos", {
        method: "GET",
        headers: {
            "authorization" : "Bearer " + localStorage.getItem("token")
        }
    }).then((res) => {
        res.json().then((data)=> {
            console.log(data.todos);
          setTodos(data.todos);
            })
        })
  
    setInterval(()=>{
      fetch("http://localhost:3000/todos", {
        method: "GET",
        headers: {
            "authorization" : "Bearer " + localStorage.getItem("token")
        }
    }).then((res) => {
        res.json().then((data)=> {
          setTodos(data.todos);
            })
        });
    },1000)
  },[])
  
    return todos;
}

function TodoPage()
{
    const todos = useGetTodo();
    return <div className="main-page">
        <Heading/>
        {todos.map(todo=><Todo key={todo._id} title={todo.title} description={todo.description}></Todo>)}
        </div>
}


function Heading()
{

  const [title,setTitle] = useState("");
  const [description,setDescription] = useState("");

  return <div className="card">
      <CardContent>
        <Typography variant="overline" display="block" color="text.secondary">
          Add new todo
        </Typography> 
        <TextField
          onChange={(e)=>{
            setTitle(e.target.value);
          }}
          id="standard-basic"
          label="Title"
          variant="standard"
          value={title}
           />
        <br />
        <TextField
          onChange={(e)=>{
            setDescription(e.target.value);
          }}
          id="standard-multiline-flexible"
          label="Description"
          multiline
          maxRows={10}
          variant="standard"
          value={description}
        />
    </CardContent>
    <CardActions>
      <Fab variant="extended" className="add-icon" onClick={()=>{
    fetch("http://localhost:3000/todos",{
        method: "POST",
        body: JSON.stringify({
            title: title,
            description: description,
            completed: false
        }),
        headers:{
          "authorization" : "Bearer " + localStorage.getItem("token"),
          "Content-type": "application/json"
        }
    }).then((res)=>{
    res.json().then((data)=>{ 
          console.log(data.todoId);
      })
    });
    setTitle("");
    setDescription("");
}}>
        <AddIcon fontSize="small" /> 
        add
      </Fab>
    </CardActions>
  </div>
}

function Todo(props)
{
  return <div className="card todo" key={props.key}>
  <CardContent>
    <Typography sx={{ mb: 1.5 }} variant="body1" color="text.primary">
      {props.title}
    </Typography> 
    <Typography  variant="body2" color="text.secondary">
      {props.description}
    </Typography>
  </CardContent>

  <CardActions className="button-group">
      {/* TODO: add 1. Update 2. Complete 3. Delete */}
      <Fab color="primary" aria-label="add">
        <CheckIcon fontSize="small" />
      </Fab>
      <Fab color="primary" aria-label="add">
        <EditIcon fontSize="small" />
      </Fab>
      <Fab color="primary" aria-label="add">
        <DeleteIcon fontSize="small" />
      </Fab>
  </CardActions>
</div>
}

export default TodoPage;