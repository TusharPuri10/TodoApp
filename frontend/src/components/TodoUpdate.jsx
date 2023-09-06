import { useState, forwardRef, useRef } from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { Button, Typography,TextField, IconButton } from "@mui/material";
import Fab from '@mui/material/Fab';
import './styles/TodoPage.css'
import axios from 'axios';
import { useRecoilState,useSetRecoilState } from "recoil";
import { isShownState, todoItem, snackbarState  } from "../states/Todos";
import BASE_URL from "../config";

export function TodoUpdate(){

    const input2Ref = useRef(null);
    const [isCardShown,setCardShown] = useRecoilState(isShownState);
    const [todo, updateTodo] = useRecoilState(todoItem(isCardShown));
    const [title,setTitle] = useState(todo.title);
    const [description,setDescription] = useState(todo.description);
    const setOpen = useSetRecoilState(snackbarState);

    async function updatetodo(){
      if(title.length===0 || description.length===0)
      {
        setOpen({
          open: true,
          message: "Please fill all the fields",
          severity: "error"
        });
        return;
      }
      setCardShown(null);
      updateTodo({ title: title, description: description });
      setOpen({
        open: true,
        message: "Todo updated succesfully",
        severity: "success"
      });
      const res = await axios.put(BASE_URL+"/todos/"+todo._id , {
        title: title,
        description: description,
        completed: todo.completed
      }, {
        headers: {
          "authorization": "Bearer " + localStorage.getItem("token"),
        }
      });
      console.log(res.data.message);
  }

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
          onKeyDown={(e) => {
            if (e.key === "Enter") {
            e.preventDefault();
            input2Ref.current.focus();
          }}}
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
          inputRef={input2Ref}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
              e.preventDefault();
              updatetodo();
            }}}
        />
    </CardContent>
    <CardActions>
      <Fab color="primary" variant="extended" className="add-icon" onClick={updatetodo}>
        Save
      </Fab>
    </CardActions>
    </div>
}