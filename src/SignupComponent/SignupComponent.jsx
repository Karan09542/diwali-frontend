import React, { useEffect, useState } from "react";
import {
  Stack,
  TextField,
  Button,
  Paper,
  Typography,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignupComponent = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
    })
    const [loading, setLoading] = useState(false)
  function handleChange(name,value){
    setUser(prev => ({...prev, [name]: value}));
  }
  function handleOnSubmit(e){
    e.preventDefault();
    setLoading(true);
    
    if(!user.firstName.trim() || !user.lastName.trim() || !user.password){  
        alert("Please fill all required fields")
        return;
    }
    if(user.password !== user.confirmPassword) return alert("Password not matched with Confirm Password")
    const userData = {...user};
    delete userData["confirmPassword"];
    axios.post("/api/v1/user/createUser", userData)
    .then(res => {
        console.log(res)
        if(res.statusText === "Created" && res.status === 201){
            navigate("/login")
        }
    })
    .catch(err => console.log(err))
    .finally(()=> setLoading(false))
  }
  useEffect(()=>{
    document.body.style.overflowY = "hidden"
  },[])
  return (
    <Box
      sx={{
        background: "url('https://png.pngtree.com/thumb_back/fh260/background/20231110/pngtree-happy-diwali-deepawali-festival-poster-postcard-colourful-abstract-vivid-background-wallpaper-image_14004810.jpg')" ,
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper
        elevation={4}
        sx={{
          p: 4,
          width: "100%",
          maxWidth: 420,
          borderRadius: 3,
          boxShadow: "0px 6px 18px rgba(0,0,0,0.1)",
        }}
      >
        <Stack spacing={3} height={"90vh"} component="form" onSubmit={handleOnSubmit}>
          <Typography
            variant="h4"
            fontWeight="600"
            textAlign="center"
            color="primary"
          >
            Create Account
          </Typography>

          <Typography variant="body2" textAlign="center" color="text.secondary">
            卐 <img style={{width: "40px"}} src="https://www.svgimages.com/svg-image/s10/colorful-diwali-diya.svg" alt="diya"/> Happy Dipawali <img style={{width: "40px"}} src="https://www.svgimages.com/svg-image/s10/colorful-diwali-diya.svg" alt="diya"/> 卐
          </Typography>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <TextField
              label="First Name"
              variant="outlined"
              fullWidth
              required
              value={user.firstName}
              onChange={(e) => handleChange("firstName", e.target.value)}
            />
            <TextField
              label="Last Name"
              variant="outlined"
              fullWidth
              required
              value={user.lastName}
              onChange={(e) => handleChange("lastName", e.target.value)}
            />
          </Stack>

          <TextField
            label="Email"
            variant="outlined"
            type="email"
            fullWidth
            required
            value={user.email}
            onChange={(e) => handleChange("email", e.target.value)}
          />

          <TextField
            label="Password"
            variant="outlined"
            type="password"
            fullWidth
            required
            value={user.password}
            onChange={(e) => handleChange("password", e.target.value)}
          />
          <TextField
            label="Confirm Password"
            variant="outlined"
            type="password"
            fullWidth
            required
            value={user.confirmPassword}
            onChange={(e) => handleChange("confirmPassword", e.target.value)}
          />
          
          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            size="large"
            sx={{
              borderRadius: 2,
              textTransform: "none",
              fontSize: "1rem",
              fontWeight: 500,
            }}
          >
           {loading && <span className="spin">&#9692;</span>} Sign Up
          </Button>

          <Typography
            variant="body2"
            textAlign="center"
            color="text.secondary"
          >
            Already have an account?{" "}
            <Typography
              component="span"
              color="primary"
              sx={{ cursor: "pointer", fontWeight: 500 }}
              onClick={() =>  navigate("/")}
            >
              Login
            </Typography>
          </Typography>
        </Stack>
      </Paper>
    </Box>
  );
};

export default SignupComponent;
