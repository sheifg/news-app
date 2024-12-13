import { Box, AppBar, Toolbar, Typography, Button } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/authSlice";
// Here it will be checked if the user logged in or not
export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // To select something from the store, it is necesssary to use useSelector
  const { user } = useSelector((state) => state.auth);
  const handlelogout = () => {
    // dispatch is used for firing functions from the store, to get the actions() inside the store
    dispatch(logout());
    navigate("/login");
  };
  // flex grow to grow till the end
  return (
    // Using material UI components
    // flexGrow grows as possible, for the whole screen
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="secondary">
        <Toolbar>
          {/* Typography for the text */}
          {/* component="div" because it is necessary to render it in html as div and not as <h6> */}
          {/* variant="h6" -> <h6> */}
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            Serendipity News
          </Typography>
          {user?.email && user?.password && (
            <Button color="inherit" onClick={() => handlelogout()}>
              Logout
            </Button>
          )}
          {/* ? check if the user exists */}
          {!user?.email && (
            <Button color="inherit" onClick={() => navigate("/login")}>
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
