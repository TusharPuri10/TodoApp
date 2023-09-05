import "./styles/Card.css";
import { Button, Typography, TextField } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { useState, forwardRef,useRef } from "react";
import axios from "axios";
import BASE_URL from "../config";
import MuiAlert from "@mui/material/Alert";
import { userStatus } from "../states/Todos";
import { useSetRecoilState, useRecoilValue } from "recoil";
import {useNavigate} from "react-router-dom";
import Snackbar from '@mui/material/Snackbar';

function Login() {

  const input2Ref = useRef(null);
  const [open, setOpen] = useState(false);
  const [Snackbarmsg, setSnackbarmsg] = useState({
    message: "",
    severity: "",
  });

  
  const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const setUserStatus = useSetRecoilState(userStatus);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  
  async function loginuser(){
    if(email.length===0 || password.length===0)
    {
      setOpen(true);
      setSnackbarmsg({
        message: "Please fill all the fields",
        severity: "error",
      });
      return;
    }
    try{
      const res = await axios.post(
        BASE_URL+"/authentication/login",
        {
          username: email,
          password: password,
        }
      );
      setUserStatus({
        isLoggedIn: true,
        isSignedIn: false,
        isLoggedOut: false
      });
      localStorage.setItem("token", res.data.token);
      navigate("/todos");
    }
    catch(e)
    {
      setOpen(true);
      setSnackbarmsg({
        message: "Network error!",
        severity: "error",
      });
    }
  }

  return (
    <div className="main">
      <Snackbar open={open} autoHideDuration={2500} onClose={handleClose}>
        <Alert onClose={handleClose} severity={Snackbarmsg.severity} sx={{ width: "100%" }}>
          {Snackbarmsg.message}
        </Alert>
      </Snackbar>
      <Card sx={{ minWidth: 280 }}>
        <CardContent>
          <Typography sx={{ fontSize: 18 }} color="text.secondary" gutterBottom>
            Welcome back ! Login to create todo
          </Typography>
          <br />
          <TextField
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            label="username or email"
            size="small"
            fullWidth={true}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
              e.preventDefault();
              input2Ref.current.focus();
            }}}
          />
          <br />
          <br />
          <TextField
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            label="password"
            type="password"
            size="small"
            fullWidth={true}
            inputRef={input2Ref}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
              e.preventDefault();
              loginuser();
            }}}
          />
          <br />
          <br />
        </CardContent>
        <CardActions>
          <Button
            size="small"
            variant="contained"
            onClick={loginuser}
          >
            Login
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}

export default Login;
