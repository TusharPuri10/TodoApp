import { Button, Typography } from "@mui/material";
import './styles/Appbar.css'
import { NavLink} from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios';
import { useRecoilState, useSetRecoilState } from "recoil";
import { userStatus } from "../states/Todos";
import BASE_URL from "../config";
import {useNavigate} from "react-router-dom";
import { todoListState } from "../states/Todos";

function Appbar()
{
    const navigate = useNavigate();
    const setTodos = useSetRecoilState(todoListState);
    const [userEmail,setUserEmail] = useState(null);
    const [status, setUserStatus] = useRecoilState(userStatus);

    useEffect( ()=>{
        async function fetchUsername()
        {
            const res = await axios.get(BASE_URL+"/authentication/username", {
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

    }, [status]);

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
                        setUserStatus({
                            isLoggedIn: false,
                            isSignedIn: false,
                            isLoggedOut: true
                          });
                          setUserEmail(null);
                          setTodos([]);
                        navigate("/signup");
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