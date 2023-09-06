import Signup from "./components/Signup";
import Appbar from "./components/Appbar";
import TodoPage from "./components/TodoPage";
import "./App.css";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import Login from "./components/Login";
import { useState, forwardRef, useEffect } from "react";
import { Grow } from "@mui/material";
import { TodoUpdate } from "./components/TodoUpdate";
import { isShownState } from "./states/Todos";
import { useRecoilState } from "recoil";
import Home from "./components/Home";
import OutsideClickHandler from "react-outside-click-handler";

function App() {
  const [isCardShown, setCardShown] = useRecoilState(isShownState);

  const UpdateCard = forwardRef(function (props, ref) {
    if (isCardShown != null) {
      return (
        <div ref={ref} {...props}>
          <OutsideClickHandler
            onOutsideClick={() => {
              setCardShown(null);
            }}
          >
            <TodoUpdate />
          </OutsideClickHandler>
        </div>
      );
    } else {
      return <div ref={ref} {...props}></div>;
    }
  });

  return (
    <div>
      <div className={isCardShown ? "overlay" : "underlay"}>
        <Grow in={isCardShown ? true : false}>
          <div>
            <UpdateCard />
          </div>
        </Grow>
      </div>
      <div className={isCardShown ? "app-main blur-page" : "app-main"}>
        <BrowserRouter basename="/">
          <Appbar />
          <div className="scroll">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/todos" element={<TodoPage />} />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
