import "./styles/Card.css";
import { Button, Typography, TextField, Snackbar } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { useState, forwardRef, useEffect, useRef } from "react";
import axios from "axios";
import BASE_URL from "../config";
import MuiAlert from "@mui/material/Alert";
import { useRecoilState } from "recoil";
import { userStatus } from "../states/Todos";
import { useNavigate } from "react-router-dom";

function Signup() {

  const input2Ref = useRef(null);
  const [open, setOpen] = useState(false);
  const [Snackbarmsg, setSnackbarmsg] = useState({
    message: "",
    severity: "",
  });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setUserStatus] = useRecoilState(userStatus);
  const navigate = useNavigate();

  const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  async function signinuser() {
    if(email.length===0 || password.length===0)
    {
      setSnackbarmsg({
        message: "Please fill all the fields",
        severity: "error",
      });
      setOpen(true);
      return;
    }
    try {
      const res = await axios.post(
        BASE_URL + "/authentication/signup",
        {
          username: email,
          password: password,
        }
      );
      setUserStatus({
        isLoggedIn: false,
        isSignedIn: true,
        isLoggedOut: false,
      });
      localStorage.setItem("token", res.data.token);
      navigate("/todos");
    } catch (e) {
      console.log(e);
      setSnackbarmsg({
        message: "User already exists!",
        severity: "warning",
      });
      setOpen(true);
    }
  }

  useEffect(() => {
    if (status.isLoggedOut) {
      setOpen(true);
      setSnackbarmsg({
        message: "Logged out successfully!",
        severity: "success",
      });
      setUserStatus({
        isLoggedIn: false,
        isSignedIn: false,
        isLoggedOut: false,
      });
    }
  }, []);

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
            Welcome to TodoApp. Signup below.
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
              signinuser();
            }}}
          />
          <br />
          <br />
        </CardContent>
        <CardActions>
          <Button
            size="small"
            variant="contained"
            onClick={signinuser}
          >
            Signup
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}

export default Signup;
