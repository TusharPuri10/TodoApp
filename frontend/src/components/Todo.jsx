import { useState,useEffect } from "react";
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { Typography, Grow} from "@mui/material";
import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { useRecoilValue, useRecoilState } from "recoil";
import { isShownState, todoItem, todoListState  } from "../states/Todos";

export function Todo({id})
{
    const [todos,setTodos] = useRecoilState(todoListState);
    const todo = useRecoilValue(todoItem(id));
    const [isActive, setActive] = useState(todo.completed);
    const [isCardShown,setCardShown] = useRecoilState(isShownState);

    // useEffect(()=>{
    //     if(props.isShown==false)
    //     setCardShown(false);
    // },[props.isShown])

  return <div className={isActive ? (isCardShown.isShown ? "done card todo hidden" : "done card todo")  : (isCardShown.isShown ? "card todo hidden" : "card todo")}  id={id} >
    <CardContent>
        <Typography sx={{ mb: 1.5 }} variant="body1" color="text.primary">{todo.title}</Typography> 
        <Typography  variant="body2" color="text.secondary">{todo.description}</Typography>
    </CardContent>

    <div className={isCardShown.isShown ? "cover" : ""}>
    <CardActions className="button-group">

        {/* Check Button */}
        <Fab color="primary" aria-label="add" onClick={ async()=>{
            setActive(!isActive);
            const res = await axios.put("http://localhost:3000/todos/"+id,{
                    title: todo.title,
                    description: todo.description,
                    completed: !isActive
            },{
                headers:{
                "authorization" : "Bearer " + localStorage.getItem("token"),
                }
            });
            console.log(res.data.message);
        }}>
            <CheckIcon fontSize="small" />
        </Fab>

        {/* Edit Button */}
        <Fab color="primary" aria-label="add" onClick={()=>{
            setCardShown({
                isShown: true,
                todoId: id
            });
        }}>
            <EditIcon fontSize="small" />
        </Fab>

        {/* Delete Button */}
        <Fab color="primary" aria-label="add" onClick={async ()=>{
            const res = await axios.delete("http://localhost:3000/todos/"+id,{
                headers:{
                "authorization" : "Bearer " + localStorage.getItem("token"),
                }
            });
            console.log(res.data.message);
            console.log(todos);
            const newTodoList = todos.filter((todo)=>{ 
                return todo._id !== id });
            setTodos(newTodoList);
        }} >
            <DeleteIcon fontSize="small" />
        </Fab>
    </CardActions>
    </div>
    
    </div>
}