import { useState, useEffect } from "react";
import "./styles/TodoPage.css";
import { Heading } from "./Heading";
import { Todo } from "./Todo";
import axios from "axios";
import { newTodoId, todoListState, userStatus } from "../states/Todos";
import { useRecoilState } from "recoil";
import BASE_URL from "../config";
import { useRecoilValue } from "recoil";

function TodoPage() {

  const newId = useRecoilValue(newTodoId);
  const status = useRecoilValue(userStatus);
  const [todos, setTodos] = useRecoilState(todoListState);


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
  }, [status]);


  return (
    <div className="main-page">
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
