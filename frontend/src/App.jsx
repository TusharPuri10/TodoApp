import Signup from "./components/Signup"
import Appbar from "./components/Appbar"
import TodoPage from "./components/TodoPage"
import './App.css'
import {BrowserRouter, Routes, Route, NavLink} from 'react-router-dom'
import Login from "./components/Login"
import { useState,forwardRef } from "react";
import { Grow } from "@mui/material"
import { TodoUpdate } from "./components/TodoUpdate"

function App()
{
  const [isShown, setShown] = useState(false);
  const UpdateCard = forwardRef(function (props, ref) {
    return (
      <div ref={ref} {...props}>
        <TodoUpdate/>
      </div>
    );
  });

  return <div>
      <div className={isShown ? "overlay" : "underlay"}>
        <Grow in={isShown}>
          {/* Get id of the element */}
            <UpdateCard />
        </Grow>
      </div>
      <div className={isShown ? "app-main blur-page" : "app-main"}>
        <BrowserRouter>
        <Appbar/>
        <div className="scroll">
          <Routes>
            <Route path="/login" element={<Login/>}/> 
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/todos" element={<TodoPage isShown={isShown} setShown={setShown}/>}/>
          </Routes>
        </div>
        </BrowserRouter>
      </div>
  </div>
}

export default App;