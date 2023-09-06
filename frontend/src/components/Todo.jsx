import { useState } from "react";
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { Typography, Grow} from "@mui/material";
import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { useRecoilState, useSetRecoilState } from "recoil";
import { isShownState, todoItem, todoListState, snackbarState  } from "../states/Todos";
import BASE_URL from "../config";

export function Todo({id})
{
    const [todos,setTodos] = useRecoilState(todoListState);
    const [todo, updateTodo] = useRecoilState(todoItem(id));
    const [isCardShown,setCardShown] = useRecoilState(isShownState);
    const [isActive, setActive] = useState(todo.completed);
    const setOpen = useSetRecoilState(snackbarState);

  return <div className={isActive ? (isCardShown===id ? "done card todo hidden" : "done card todo")  : (isCardShown===id ? "card todo hidden" : "card todo")}  id={id} >
    <CardContent>
        <Typography sx={{ mb: 1.5 }} variant="body1" color="text.primary">{todo.title}</Typography> 
        <Typography  variant="body2" color="text.secondary">{todo.description}</Typography>
    </CardContent>

    <div className={isCardShown===id ? "cover" : ""}>
    <CardActions className="button-group">

        {/* Check Button */}
        <Fab color="primary" aria-label="add" onClick={ async()=>{
            setActive(!isActive);
            updateTodo({ completed: !isActive });
            const res = await axios.put(BASE_URL+"/todos/"+id,{
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
            setCardShown(id);
        }}>
            <EditIcon fontSize="small" />
        </Fab>

        {/* Delete Button */}
        <Fab color="primary" aria-label="add" onClick={async ()=>{
            const newTodoList = todos.filter((todo)=>todo._id !== id);
            setTodos(newTodoList);
            setOpen({
                open: true,
                message: "Deleted successfully",
                severity: "success"
            });
            const res = await axios.delete(BASE_URL+"/todos/"+id,{
                headers:{
                "authorization" : "Bearer " + localStorage.getItem("token"),
                }
            });
            console.log(res.data.message)
        }} >
            <DeleteIcon fontSize="small" />
        </Fab>
    </CardActions>
    </div>
    
    </div>
}