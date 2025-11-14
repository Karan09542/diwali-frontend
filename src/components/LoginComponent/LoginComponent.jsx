import {Button, Paper, Stack, TextField, Typography, Box} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginComponent() {
  // const apiUrl = import.meta.env.VITE_API_BASE_URL;
  // const apiVersion = import.meta.env.VITE_APP_API_VERSION;
  const [value, setValue] = useState({
    email: "",
    password: "",
  });
  const handleChange = (prop) => (event) => {
    setValue({ ...value, [prop]: event.target.value });
  };
  const navigate = useNavigate();
  useEffect(()=> {
    document.body.style.overflowY = "hidden";
  },[])
  const handleOnSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        `/api/v1/user/login`,
        {
          email: value.email,
          password: value.password,
        },
        { withCredentials: true },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        if(response.statusText === "OK" && response.status === 200){
          navigate("/")
        }
      });
  };
  return (
     <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "url('https://dm0qx8t0i9gc9.cloudfront.net/thumbnails/video/ruefkyi-il8e5psf4/videoblocks-diwali-2024_1a_bvfnt6bqkl_thumbnail-1080_15.png')", // soft natural gradient
          backgroundSize: "100%"
      }}
    >
      <Paper
        elevation={4}
        sx={{
          p: 4,
          width: "100%",
          maxWidth: 400,
          borderRadius: 3,
          boxShadow: "0px 6px 18px rgba(0,0,0,0.1)",
          margin: "auto",
        }}
      >
        <Stack spacing={3} component="form" onSubmit={handleOnSubmit}>
          <Typography
            variant="h4"
            fontWeight="600"
            textAlign="center"
            color="primary"
          >
            Subh Deepawali 👋
          </Typography>

          <Typography variant="body2" textAlign="center" color="text.secondary">
            Login to continue your journey
          </Typography>

          <TextField
            label="Email"
            variant="outlined"
            type="email"
            fullWidth
            required
            onChange={handleChange("email")}
          />
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            fullWidth
            required
            onChange={handleChange("password")}
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
            Login
          </Button>

          <Typography
            variant="body2"
            textAlign="center"
            color="text.secondary"
          >
            Don’t have an account?{" "}
            <Typography
              component="span"
              color="primary"
              sx={{ cursor: "pointer", fontWeight: 500 }}
              onClick={() => navigate("/signup")}
            >
              Sign up
            </Typography>
          </Typography>
        </Stack>
      </Paper>
      </Box>

  );
}
export default LoginComponent;
