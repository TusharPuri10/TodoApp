import { useState, forwardRef, useRef } from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { Button, Typography,TextField, IconButton } from "@mui/material";
import Fab from '@mui/material/Fab';
import './styles/TodoPage.css'
import axios from 'axios';
import { useRecoilState } from "recoil";
import { isShownState, todoItem  } from "../states/Todos";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from "@mui/material/Alert";

export function TodoUpdate(){

    const input2Ref = useRef(null);
    const [isCardShown,setCardShown] = useRecoilState(isShownState);
    const [todo, updateTodo] = useRecoilState(todoItem(isCardShown));
    const [open, setOpen] = useState(false);
    const [title,setTitle] = useState(todo.title);
    const [description,setDescription] = useState(todo.description);

    const Alert = forwardRef(function Alert(props, ref) {
      return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });
  
    const handleClose = (event, reason) => {
      if (reason === "clickaway") {
        return;
      }
      setOpen(false);
    };

    async function updatetodo(){
      if(title.length===0 || description.length===0)
      {
        setOpen(true);
        return;
      }
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
  }

    return <div className="update card">
        <Snackbar open={open} autoHideDuration={2500} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="error"
            sx={{ width: "100%" }}
          >
            please fill all the fields!
          </Alert>
        </Snackbar>
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