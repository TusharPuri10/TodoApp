import { Button, Typography } from "@mui/material";
import "./styles/Appbar.css";
import { NavLink } from "react-router-dom";
import { useEffect, useState, forwardRef } from "react";
import axios from "axios";
import { useRecoilState, useSetRecoilState, useRecoilValue } from "recoil";
import { userStatus } from "../states/Todos";
import BASE_URL from "../config";
import { useNavigate } from "react-router-dom";
import { todoListState, snackbarState } from "../states/Todos";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import TaskAltIcon from "@mui/icons-material/TaskAlt";

function Appbar() {
  const navigate = useNavigate();
  const setTodos = useSetRecoilState(todoListState);
  const [userEmail, setUserEmail] = useState(null);
  const [status, setUserStatus] = useRecoilState(userStatus);
  const [snackBar, setOpen] = useRecoilState(snackbarState);

  useEffect(() => {
    async function fetchUsername() {
      const res = await axios.get(BASE_URL + "/authentication/username", {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (res.data.username) {
        setUserEmail(res.data.username);
      }
    }
    fetchUsername();
  }, [status]);

  const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen({
      open: false,
      message: "",
      severity: "",
    });
  };

  if (status) {
    return (
      <div className="bar">
        <Snackbar
          open={snackBar.open}
          autoHideDuration={2500}
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            severity={snackBar.severity}
            sx={{ width: "100%" }}
          >
            {snackBar.message}
          </Alert>
        </Snackbar>
        <div>
          <NavLink className="logo" to="/">
            <TaskAltIcon fontSize="medium" />
            Todo
          </NavLink>
        </div>
        <div className="userbox">
          <NavLink className="username" to="/todos">
            {userEmail}
          </NavLink>
          <Button
            onClick={() => {
              localStorage.setItem("token", null);
              setUserEmail(null);
              setUserStatus(false);
              setTodos([]);
              navigate("/");
              setOpen({
                open: true,
                message: "Logged out succesfully",
                severity: "success",
              });
            }}
          >
            Logout
          </Button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="bar">
        <Snackbar
          open={snackBar.open}
          autoHideDuration={2500}
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            severity={snackBar.severity}
            sx={{ width: "100%" }}
          >
            {snackBar.message}
          </Alert>
        </Snackbar>
        <div>
          <NavLink className="logo" to="/">
            <TaskAltIcon fontSize="medium" />
            Todo
          </NavLink>
        </div>
        <div className="userbox">
          <NavLink className="navLink" to="/signup">
            Signup
          </NavLink>
          <NavLink className="navLink" to="/login">
            Login
          </NavLink>
        </div>
      </div>
    );
  }
}

export default Appbar;
