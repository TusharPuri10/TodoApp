import { useState,useEffect } from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { Button, Typography,TextField, IconButton } from "@mui/material";
import Fab from '@mui/material/Fab';
import './styles/TodoPage.css'
import axios from 'axios';
import { useRecoilState } from "recoil";
import { isShownState, todoItem  } from "../states/Todos";

export function TodoUpdate(){

    const [isCardShown,setCardShown] = useRecoilState(isShownState);
    const [todo, updateTodo] = useRecoilState(todoItem(isCardShown));

    const [title,setTitle] = useState(todo.title);
    const [description,setDescription] = useState(todo.description);


    return <div className="update card">
        <CardContent>
        <Typography variant="overline" display="block" color="text.secondary">
          Edit the Todo
        </Typography> 
        <TextField
          id="standard-basic"
          variant="standard"
          value={title}
          onChange={(e)=>{
            setTitle(e.target.value);
          }}
           />
        <br />
        <TextField
          id="standard-multiline-flexible"
          multiline
          maxRows={10}
          variant="standard"
          value={description}
          onChange={(e)=>{
            setDescription(e.target.value);
          }}
        />
    </CardContent>
    <CardActions>
      <Fab color="primary" variant="extended" className="add-icon" onClick={async ()=>{
            const res = await axios.put("http://localhost:3000/todos/"+todo._id , {
              title: title,
              description: description,
              completed: todo.completed
            }, {
              headers: {
                "authorization": "Bearer " + localStorage.getItem("token"),
              }
            });
            setCardShown(null);
            updateTodo({ title: title, description: description });
            console.log(res.data.message);
        }}>
        Save
      </Fab>
    </CardActions>
    </div>
}