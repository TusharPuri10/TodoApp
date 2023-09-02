import { useState,useEffect } from "react";
import './styles/TodoPage.css'
import { Heading } from "./Heading";
import { Todo } from "./Todo";

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
          setTodos(data.todos);
            })
        })
  
    // setInterval(()=>{
    //   fetch("http://localhost:3000/todos", {
    //     method: "GET",
    //     headers: {
    //         "authorization" : "Bearer " + localStorage.getItem("token")
    //     }
    // }).then((res) => {
    //     res.json().then((data)=> {
    //       setTodos(data.todos);
    //         })
    //     });
    // },1000)
  },[])
  
    return todos;
}

function TodoPage(props)
{
    const todos = useGetTodo();

    return <div className="main-page">
        <Heading/>
        {todos.map(todo=><Todo setId={props.setId} isShown={props.isShown} setShown={props.setShown} isCardShown={props.isCardShown} setCardShown={props.setCardShown}key={todo._id} id={todo._id} title={todo.title} description={todo.description} completed={todo.completed} setTitle={props.setTitle} setDescription={props.setDescription} setCompleted={props.setCompleted}></Todo>)}
        </div>
}


export default TodoPage;