import { Box, Button, Dialog, FormLabel, IconButton, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { Link } from "react-router-dom";
import toast from "react-hot-toast"; // ✅ import toast

const labelstyle = { mt: 1, mb: 1 };

const Authform = ({ onSubmit, isAdmin }) => {
  const [isSignup, setIsSignup] = useState(false);
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setInputs((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!inputs.email || !inputs.password || (!isAdmin && isSignup && !inputs.name)) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Show loading toast
    const toastId = toast.loading("Please wait...");

    try {
      const res = await onSubmit({ inputs, signup: isAdmin ? false : isSignup });

      if (res?.success) {
        toast.success(isSignup ? "Signed up successfully!" : "Logged in successfully!", {
          id: toastId, // replace loading with success
        });
      } else {
        toast.error(res?.message || "Authentication failed", {
          id: toastId, // replace loading with error
        });
      }
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Something went wrong", {
        id: toastId,
      });
    }

    console.log(inputs);
  };

  return (
    <Dialog open={true}>
      <Box sx={{ ml: "auto", padding: 1 }}>
        <IconButton LinkComponent={Link} to="/">
          <CloseRoundedIcon />
        </IconButton>
      </Box>
      <Typography variant="h4" textAlign={"center"}>
        {isSignup ? "Signup" : "Login"}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box
          display={"flex"}
          padding={5}
          justifyContent={"center"}
          flexDirection={"column"}
          alignContent={"center"}
          width={400}
          margin="auto"
        >
          {!isAdmin && isSignup && (
            <>
              <FormLabel sx={labelstyle}>Name</FormLabel>
              <TextField
                value={inputs.name}
                onChange={handleChange}
                margin="normal"
                variant="standard"
                type="text"
                name="name"
              />
            </>
          )}

          <FormLabel sx={labelstyle}>Email</FormLabel>
          <TextField
            value={inputs.email}
            onChange={handleChange}
            margin="normal"
            variant="standard"
            type="email"
            name="email"
          />
          <FormLabel sx={labelstyle}>Password</FormLabel>
          <TextField
            value={inputs.password}
            onChange={handleChange}
            margin="normal"
            variant="standard"
            type="password"
            name="password"
          />
          <Button
            sx={{ mt: 2, borderRadius: 10, bgcolor: "#000", color: "white" }}
            variant="contained"
            type="submit"
            fullWidth
          >
            {isSignup ? "Signup" : "Login"}
          </Button>
          {!isAdmin && (
            <Button
              onClick={() => setIsSignup(!isSignup)}
              sx={{ mt: 2, borderRadius: 10, bgcolor: "#fff", color: "black" }}
              fullWidth
              variant="contained"
            >
              Switch to {isSignup ? "Login" : "Signup"}
            </Button>
          )}
        </Box>
      </form>
    </Dialog>
  );
};

export default Authform;
