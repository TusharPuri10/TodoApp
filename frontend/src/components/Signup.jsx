import './styles/Card.css'
import { Button, Typography,TextField } from "@mui/material";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { useState } from 'react';
import axios from 'axios';

function Signup()
{
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    
    return <div className='main'>
        <Card sx={{ minWidth: 280 }}>
      <CardContent>
        <Typography sx={{ fontSize: 18 }} color="text.secondary" gutterBottom>
          Welcome to TodoApp. Signup below.
        </Typography>
        <br />
        <TextField
          onChange={(e)=>{
            setEmail(e.target.value);
          }}
          label="username or email"
          size="small" fullWidth={true}/>
        <br /><br />
        <TextField
          onChange={(e)=>{
            setPassword(e.target.value);
          }}
          label="password"
          type="password"
          size="small" fullWidth={true}/>
        <br /><br />
      </CardContent>
      <CardActions>
        <Button size="small" variant="contained" onClick={async ()=>{

const res = await axios.post("http://localhost:3000/authentication/signup",{
  username: email,
  password: password
});
localStorage.setItem("token",res.data.token);
window.location = "/todos";

        }}>Signup</Button>
      </CardActions>
    </Card>
    </div>
}

export default Signup;