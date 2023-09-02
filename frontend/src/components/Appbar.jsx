import { Button, Typography } from "@mui/material";
import './styles/Appbar.css'
import { NavLink} from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios';
function Appbar()
{
    const [userEmail,setUserEmail] = useState(null);

    useEffect( ()=>{
        async function fetchUsername()
        {
            const res = await axios.get("http://localhost:3000/authentication/username", {
                headers: {
                    "authorization" : "Bearer " + localStorage.getItem("token")
                }
            });
            if(res.data.username)
            {
                setUserEmail(res.data.username);
            }
        }
        fetchUsername();
    }, []);

        //TODO: control reaches here and since userEmail is null untill the fetches complete that's why a flash of else condition is showed after reload
        if(userEmail)
        {
            return <div className="bar">
                <div>
                    <Typography>Todo</Typography>
                </div>
                <div className="userbox">
                    <div className="username">{userEmail}</div>

                    <Button onClick={()=>{
                        localStorage.setItem("token",null);
                        window.location = "/signup";
                    }}>Logout</Button>

                </div>
            </div>
        }
        else
        {
            return <div className="bar">
                <div>
                    <Typography>Todo</Typography>
                </div>
                <div className="userbox">
                    <NavLink className="navLink" to="/signup">Signup</NavLink>
                    <NavLink className="navLink" to="/login">Login</NavLink>
                </div>
            </div>
        }
}

export default Appbar;