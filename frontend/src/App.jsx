import Signup from "./components/Signup"
import Appbar from "./components/Appbar"
import TodoPage from "./components/TodoPage"
import './App.css'
import {BrowserRouter, Routes, Route, NavLink} from 'react-router-dom'
import Login from "./components/Login"
import { useState,forwardRef,useEffect } from "react";
import { Grow } from "@mui/material"
import { TodoUpdate } from "./components/TodoUpdate"
import { isShownState } from "./states/Todos";
import { useRecoilState } from "recoil";

function App()
{
  const [isCardShown, setCardShown] = useRecoilState(isShownState);

  // const UpdateCard = forwardRef(function (props, ref) {

  //   if(id!="")
  //   {
  //     return (
  //       <div ref={ref} {...props}>
  //         {/* <TodoUpdate id={id} title={title} description={description} completed={completed} isShown={isShown} setShown={setShown} isCardShown={isCardShown} setCardShown={setCardShown}/> */}
  //       </div>
  //     );
  //   }
  //   else
  //   {
  //     return <div ref={ref} {...props}>
  //     </div>
  //   }
  // });


  return <div>
      {/* <div className={isShown ? "overlay" : "underlay"}>
        <Grow in={isCardShown.isShown}>
          <div>
              <UpdateCard/>
          </div>
        </Grow>
      </div> */}
      {/* <div className={isShown ? "app-main blur-page" : "app-main"}> */}
      <div className="app-main">
        <BrowserRouter>
        <Appbar/>
        <div className="scroll">
          <Routes>
            <Route path="/login" element={<Login/>}/> 
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/todos" element={<TodoPage/>}/>
          </Routes>
        </div>
        </BrowserRouter>
      </div>
  </div>
}

export default App;