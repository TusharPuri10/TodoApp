import { useState,useEffect } from "react";
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { Typography, Grow} from "@mui/material";
import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

export function Todo(props)
{
    const [isActive, setActive] = useState(props.completed);
    const [isCardShown, setCardShown] = useState(false);

    useEffect(()=>{
        if(props.isShown==false)
        setCardShown(false);
    },[props.isShown])

  return <div className={isActive ? (isCardShown ? "done card todo hidden" : "done card todo")  : (isCardShown ? "card todo hidden" : "card todo")}  id={props.id} >
    <CardContent>
        <Typography sx={{ mb: 1.5 }} variant="body1" color="text.primary">{props.title}</Typography> 
        <Typography  variant="body2" color="text.secondary">{props.description}</Typography>
    </CardContent>

    <div className={isCardShown ? "cover" : ""}>
    <CardActions className="button-group">

        <Fab color="primary" aria-label="add" onClick={ async()=>{
            const res = await axios.put("http://localhost:3000/todos/"+props.id,{
                    title: props.title,
                    description: props.description,
                    completed: !isActive
            },{
                headers:{
                "authorization" : "Bearer " + localStorage.getItem("token"),
                }
            });
            setActive(!isActive);
            console.log(res.data.message);
        }}>
            <CheckIcon fontSize="small" />
        </Fab>

        <Fab color="primary" aria-label="add" onClick={()=>{
            props.setId(props.id);
            setCardShown(!isCardShown);
            props.setShown(!props.isShown);
            props.setTitle(props.title);
            props.setDescription(props.description);
            props.setCompleted(isActive);
        }}>
            <EditIcon fontSize="small" />
        </Fab>

        <Fab color="primary" aria-label="add" onClick={async ()=>{
            const res = await axios.delete("http://localhost:3000/todos/"+props.id,{
                headers:{
                "authorization" : "Bearer " + localStorage.getItem("token"),
                }
            });
            console.log(res.data.message);
        }} >
            <DeleteIcon fontSize="small" />
        </Fab>
    </CardActions>
    </div>
    
    </div>
}