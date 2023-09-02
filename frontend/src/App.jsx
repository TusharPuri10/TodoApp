import Signup from "./components/Signup"
import Appbar from "./components/Appbar"
import TodoPage from "./components/TodoPage"
import './App.css'
import {BrowserRouter, Routes, Route, NavLink} from 'react-router-dom'
import Login from "./components/Login"
import { useState,forwardRef,useEffect } from "react";
import { Grow } from "@mui/material"
import { TodoUpdate } from "./components/TodoUpdate"

function App()
{
  const [isShown, setShown] = useState(false);
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);
  const [isCardShown, setCardShown] = useState(false);
  

  const UpdateCard = forwardRef(function (props, ref) {

    if(id!="")
    {
      return (
        <div ref={ref} {...props}>
          <TodoUpdate id={id} title={title} description={description} completed={completed} isShown={isShown} setShown={setShown} isCardShown={isCardShown} setCardShown={setCardShown}/>
        </div>
      );
    }
    else
    {
      return <div ref={ref} {...props}>
      </div>
    }
  });


  return <div>
      <div className={isShown ? "overlay" : "underlay"}>
        <Grow in={isShown}>
          <div>
              <UpdateCard/>
          </div>
        </Grow>
      </div>
      <div className={isShown ? "app-main blur-page" : "app-main"}>
        <BrowserRouter>
        <Appbar/>
        <div className="scroll">
          <Routes>
            <Route path="/login" element={<Login/>}/> 
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/todos" element={<TodoPage setId={setId} isShown={isShown} setShown={setShown} isCardShown={isCardShown} setCardShown={setCardShown} setTitle={setTitle} setDescription={setDescription} setCompleted={setCompleted}/>}/>
          </Routes>
        </div>
        </BrowserRouter>
      </div>
  </div>
}

export default App;