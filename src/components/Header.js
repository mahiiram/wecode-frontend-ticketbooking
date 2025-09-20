import React, { useEffect } from "react";
import { AppBar, Toolbar, Box, Autocomplete, TextField, Tabs, Tab, IconButton } from "@mui/material";

import { useState } from "react";
import { getallmovies } from "../api-helpers/api-helpers";
import { Link, useNavigate } from "react-router-dom"; // ✅ import useLocation
import { useDispatch, useSelector } from "react-redux";
import { adminAction, userAction } from "../store";
import Applogo from "../assets/Applogo.jpg";

const Header = () => {
  const navigate = useNavigate();
  // const location = useLocation(); // ✅ hook to detect current route
  const dispatch = useDispatch();
  const isAdminLoggedIn = useSelector((state) => state.admin.isLoggedIn);
  const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const [value, setValue] = useState(false);
  const [movies, setMovies] = useState([]);
  // const [activeTab, setActiveTab] = useState(false);

  useEffect(() => {
    getallmovies()
      .then((data) => setMovies(data.movies))
      .catch((err) => console.log(err));
  }, []);

  const logout = (isAdmin) => {
    // setActiveTab(false);
    dispatch(isAdmin ? adminAction.logout() : userAction.logout());
  };

  const handleChange = (e, val) => {
    // console.log("moviesHeder", movies);
    const movie = movies.find((e) => e.title === val);
    if (movie) {
      navigate(`/movie-booking/${movie._id}`);
    }
  };
  return (
    <AppBar position="sticky" sx={{ bgcolor: "#000", margin: 0 }}>
      <Toolbar>
        <Box width={"20%"}>
          <IconButton LinkComponent={Link} to="/">
            {/* / <MovieIcon sx={{ fontSize: "60px", color: "white" }} /> */}
            <img src={Applogo} alt="Logo" style={{ width: 200, height: 70 }} />
          </IconButton>
        </Box>
        <Box width={"30%"} margin={"auto"}>
          <Autocomplete
            onChange={handleChange}
            freeSolo
            options={movies && movies.map((option) => option.title)}
            renderInput={(params) => (
              <TextField
                variant="standard"
                sx={{ input: { color: "white" } }}
                {...params}
                placeholder="SEARCH THE MOVIES"
              />
            )}
          />
        </Box>
        <Box display={"flex"}>
          <Tabs textColor="inherit" indicatorColor="secondary" value={value}>
            <Tab LinkComponent={Link} to="/movies" label="Movies" />
            {!isAdminLoggedIn && !isUserLoggedIn && (
              <>
                <Tab LinkComponent={Link} to="/admin" label="Admin" />
                <Tab LinkComponent={Link} to="/auth" label="User" />
              </>
            )}
            {isUserLoggedIn && (
              <>
                <Tab LinkComponent={Link} to="/user" label="Profile" />
                <Tab onClick={() => logout(false)} LinkComponent={Link} to="/" label="Logout" />
              </>
            )}
            {isAdminLoggedIn && (
              <>
                <Tab LinkComponent={Link} to="/add" label="Add Movie" />
                <Tab LinkComponent={Link} to="/adminprofile" label="Profile" />
                <Tab onClick={() => logout(true)} LinkComponent={Link} to="/" label="Logout" />
              </>
            )}
          </Tabs>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
