import { useState, useRef } from "react";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { Typography, TextField } from "@mui/material";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  newTodoId,
  todoListState,
  todoItem,
  snackbarState,
} from "../states/Todos";
import BASE_URL from "../config";

export function Heading() {
  const [todos, setTodos] = useRecoilState(todoListState);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const input1Ref = useRef(null);
  const input2Ref = useRef(null);
  const setTodoId = useSetRecoilState(newTodoId);
  const updateTodo = useSetRecoilState(todoItem("pending"));
  const setOpen = useSetRecoilState(snackbarState);

  // Add todo function
  async function addTodo() {
    const newTitle = title.trim();
    const newDescription = description.trim();
    setTitle("");
    setDescription("");
    if (newTitle.length === 0 || newDescription.length === 0) {
      setOpen({
        open: true,
        message: "Please fill all the fields",
        severity: "error",
      });
      return;
    }
    setOpen({
      open: true,
      message: "Todo added succesfully",
      severity: "success",
    });
    const newTodos = [...todos];
    newTodos.push({
      // _id: res.data.todoId,
      _id: "pending",
      title: newTitle,
      description: newDescription,
      completed: false,
      __v: 0,
    });
    setTodos(newTodos);
    try{
      const res = await axios.post(
        BASE_URL + "/todos",
        {
          title: newTitle,
          description: newDescription,
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
    catch(err){
      const errorMessage = err.response.data.message;
      setOpen({
        open: true,
        message: errorMessage,
        severity: "error",
      });
      const newTodoList = todos.filter((todo)=>todo._id !== "pending");
      setTodos(newTodoList);
      return;
    }
    input1Ref.current.focus();
  }

  return (
    <div className="card">
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
          inputRef={input1Ref}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              input2Ref.current.focus();
            }
          }}
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
            }
          }}
        />
      </CardContent>
      <CardActions>
        <Fab variant="extended" className="add-icon" onClick={addTodo}>
          <AddIcon fontSize="small" />
          add
        </Fab>
      </CardActions>
    </div>
  );
}
