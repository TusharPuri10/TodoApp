import { useState,useEffect } from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { Button, Typography,TextField, IconButton } from "@mui/material";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import './styles/TodoPage.css'

export function TodoUpdate(){
    return <div className="update card">
        <CardContent>
        <Typography variant="overline" display="block" color="text.secondary">
          Update the todo
        </Typography> 
        <TextField
          id="standard-basic"
          label="Title"
          variant="standard"
           />
        <br />
        <TextField
          id="standard-multiline-flexible"
          label="Description"
          multiline
          maxRows={10}
          variant="standard"
        />
    </CardContent>
    <CardActions>
      <Fab variant="extended" className="add-icon">
        <AddIcon fontSize="small" /> 
        add
      </Fab>
    </CardActions>
    </div>
}