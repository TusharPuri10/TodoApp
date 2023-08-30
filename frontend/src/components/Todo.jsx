import { useState,useEffect } from "react";
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { Typography, Grow} from "@mui/material";
import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';

export function Todo(props)
{
    const [isActive, setActive] = useState(props.completed);
    const [isCardShown, setCardShown] = useState(false);
    

  return <div className={isActive ? (isCardShown ? "done card todo hidden" : "done card todo")  : (isCardShown ? "card todo hidden" : "card todo")}  id={props.id} >
    <CardContent>
        {/* TODO: add id to each todo card */}
        <Typography sx={{ mb: 1.5 }} variant="body1" color="text.primary">{props.title}</Typography> 
        <Typography  variant="body2" color="text.secondary">{props.description}</Typography>
    </CardContent>

    <div className={isCardShown ? "cover" : ""}>
    <CardActions className="button-group">
        {/* TODO: add 1. Update 2. Complete 3. Delete */}
        <Fab color="primary" aria-label="add" onClick={()=>{
            fetch("http://localhost:3000/todos/"+props.id,{
                method: "PUT",
                body: JSON.stringify({
                    title: props.title,
                    description: props.description,
                    completed: !isActive
                }),
                headers:{
                "authorization" : "Bearer " + localStorage.getItem("token"),
                "Content-type": "application/json"
                }
            }).then((res)=>{
            res.json().then((data)=>{ 
                setActive(!isActive);
                console.log(data.message);
            })
            });
        }}>
            <CheckIcon fontSize="small" />
        </Fab>

        <Fab color="primary" aria-label="add" onClick={()=>{
            setCardShown(!isCardShown);
            props.setShown(!props.isShown);
        }}>
            <EditIcon fontSize="small" />
        </Fab>

        <Fab color="primary" aria-label="add" onClick={()=>{
            fetch("http://localhost:3000/todos/"+props.id,{
                method: "DELETE",
                body: JSON.stringify({
                    title: props.title,
                    description: props.description,
                    completed: isActive
                }),
                headers:{
                "authorization" : "Bearer " + localStorage.getItem("token"),
                "Content-type": "application/json"
                }
            }).then((res)=>{
            res.json().then((data)=>{ 
                console.log(data.message);
            })
            });
        }} >
            <DeleteIcon fontSize="small" />
        </Fab>
    </CardActions>
    </div>
    
    </div>
}