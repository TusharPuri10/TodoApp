import { useState,useEffect } from "react";

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
            console.log(data.todos);
          setTodos(data.todos);
            })
        })
  
    setInterval(()=>{
      fetch("http://localhost:3000/todos", {
        method: "GET",
        headers: {
            "authorization" : "Bearer " + localStorage.getItem("token")
        }
    }).then((res) => {
        res.json().then((data)=> {
          setTodos(data.todos);
            })
        });
    },1000)
  },[])
  
    return todos;
}

function TodoPage()
{
    const todos = useGetTodo();
    return <div>
        {todos.map(todo=><Todo title={todo.title} description={todo.description}></Todo>)}
        </div>
}

// a component
// function Heading()
// {
//   return <div>
//     Todo title
//     <input type="text" id="title"></input>
//     <br />
//     Todo description
//     <input type="text" id="description"></input>
//     <br />
//     {/* <button onClick="postTodo()">send todo</button> */}
//   </div>
// }
function Todo(props)
{
  return <div>
    <h3>{props.title}</h3>
    <span>{props.description}</span>
    <br />
    <button>Delete</button>
    <br />
  </div>
}

export default TodoPage;