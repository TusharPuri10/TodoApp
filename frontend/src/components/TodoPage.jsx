import { useState,useEffect } from "react";
import './styles/TodoPage.css'
import { Heading } from "./Heading";
import { Todo } from "./Todo";
import axios from 'axios';
import { todoListState } from "../states/Todos";
import { useRecoilState } from "recoil";
import BASE_URL from "../config";

function TodoPage()
{
    const [todos,setTodos] = useRecoilState(todoListState);
    

    async function getTodos(){
      const res = await axios.get(BASE_URL+"/todos",{
        headers: {
          "authorization" : "Bearer " + localStorage.getItem("token")
        }
      })
      setTodos(res.data.todos);
    }

    useEffect(()=>{
      getTodos();
  },[setTodos]);

    return <div className="main-page">
        <Heading/>
        {todos.map(todo=><Todo key={todo._id} id={todo._id}></Todo>)}
        </div>
}


export default TodoPage;