import { useState,useEffect } from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { Button, Typography,TextField, IconButton } from "@mui/material";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';

export function Heading()
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
      <Fab variant="extended" className="add-icon" onClick={async ()=>{
        const res = await axios.post("http://localhost:3000/todos",{
            title: title,
            description: description,
            completed: false
        },{
          headers:{
            "authorization" : "Bearer " + localStorage.getItem("token"),
          }
        });
        console.log(res.data.todoId);
        setTitle("");
        setDescription("");
      }}>
        <AddIcon fontSize="small" /> 
        add
      </Fab>
    </CardActions>
  </div>
}