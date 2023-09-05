import { useState, forwardRef, useRef } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { Button, Typography, TextField, IconButton } from "@mui/material";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import { useRecoilState, useSetRecoilState } from "recoil";
import { newTodoId, todoListState,todoItem } from "../states/Todos";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from "@mui/material/Alert";

export function Heading() {
  const [open, setOpen] = useState(false);
  const [todos, setTodos] = useRecoilState(todoListState);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const input2Ref = useRef(null);
  const setTodoId = useSetRecoilState(newTodoId);
  const updateTodo = useSetRecoilState(todoItem("pending"));

  const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  async function addTodo() {
    if(title.length===0 || description.length===0)
    {
      setOpen(true);
      return;
    }
    setTitle("");
    setDescription("");
    const newTodos = [...todos];
    newTodos.push({
      // _id: res.data.todoId,
      _id: "pending",
      title: title,
      description: description,
      completed: false,
      __v: 0,
    });
    setTodos(newTodos);
    const res = await axios.post(
      "http://localhost:3000/todos",
      {
        title: title,
        description: description,
        completed: false,
      },
      {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    setTodoId(res.data.todoId);
    updateTodo({ _id: res.data.todoId });
  }

  return (
    <div className="card">
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
          Add new todo
        </Typography>
        <TextField
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          id="standard-basic"
          label="Title"
          variant="standard"
          value={title}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
            e.preventDefault();
            input2Ref.current.focus();
          }}}
        />
        <br />
        <TextField
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          id="standard-multiline-flexible"
          label="Description"
          multiline
          maxRows={10}
          variant="standard"
          value={description}
          inputRef={input2Ref}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
            e.preventDefault();
            addTodo();
          }}}
        />
      </CardContent>
      <CardActions>
        <Fab
          variant="extended"
          className="add-icon"
          onClick={addTodo}
        >
          <AddIcon fontSize="small" />
          add
        </Fab>
      </CardActions>
    </div>
  );
}
