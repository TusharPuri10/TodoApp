import { useState,useEffect } from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { Button, Typography,TextField, IconButton } from "@mui/material";
import Fab from '@mui/material/Fab';
import './styles/TodoPage.css'
import axios from 'axios';

export function TodoUpdate(props){

    const [title,setTitle] = useState(props.title);
    const [description,setDescription] = useState(props.description);


    return <div className="update card">
        <CardContent>
        <Typography variant="overline" display="block" color="text.secondary">
          Edit the Todo
        </Typography> 
        <TextField
          id="standard-basic"
          variant="standard"
          value={title}
          onChange={(e)=>{
            setTitle(e.target.value);
          }}
           />
        <br />
        <TextField
          id="standard-multiline-flexible"
          multiline
          maxRows={10}
          variant="standard"
          value={description}
          onChange={(e)=>{
            setDescription(e.target.value);
          }}
        />
    </CardContent>
    <CardActions>
      <Fab color="primary" variant="extended" className="add-icon" onClick={async ()=>{
            const res = await axios.put("http://localhost:3000/todos/"+props.id , {
              title: title,
              description: description,
              completed: props.completed
            }, {
              headers: {
                "authorization": "Bearer " + localStorage.getItem("token"),
              }
            });
            const data = res.data;
            props.setShown(!props.isShown);
            console.log(data.message);
        }}>
        Save
      </Fab>
    </CardActions>
    </div>
}