import Signup from "./components/Signup"
import Appbar from "./components/Appbar"
import TodoPage from "./components/TodoPage"
import './App.css'
import {BrowserRouter, Routes, Route, NavLink} from 'react-router-dom'
import Login from "./components/Login"

function App()
{
  return <div className="app-main">
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
}

export default App;