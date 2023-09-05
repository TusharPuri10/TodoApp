import { useState, useEffect } from "react";
import "./styles/TodoPage.css";
import { Heading } from "./Heading";
import { Todo } from "./Todo";
import axios from "axios";
import { newTodoId, todoListState,todoItem } from "../states/Todos";
import { useRecoilState, useSetRecoilState } from "recoil";
import BASE_URL from "../config";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { forwardRef } from "react";
import { userStatus } from "../states/Todos";
import { useRecoilValue } from "recoil";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function TodoPage() {

  const newId = useRecoilValue(newTodoId);
  const status = useRecoilValue(userStatus);
  const [open,setOpen] = useState(false);
  const [todos, setTodos] = useRecoilState(todoListState);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  async function getTodos() {
    const res = await axios.get(BASE_URL + "/todos", {
      headers: {
        authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    setTodos(res.data.todos);
  }

  useEffect(() => {
    getTodos();
    if(status.isLoggedIn || status.isSignedIn){
      setOpen(true);
    }
  }, [setTodos]);

  const message = (status.isLoggedIn ? "Logged in successfully!" : "Signed in successfully");

  return (
    <div className="main-page">
      <Snackbar open={open} autoHideDuration={2500} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
      <Heading />
      {todos.map((todo) => {
        if(todo._id===null && newId!==null)
        {
          return <Todo key={newId} id={newId}></Todo>
        }
        return <Todo key={todo._id} id={todo._id}></Todo>
      }
      )}
    </div>
  );
}

export default TodoPage;
