import { Box, Button, Checkbox, FormLabel, TextField, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { addmovie, getallmovies } from "../../api-helpers/api-helpers";

const labelprops = {
  mt: 1,
  mb: 1,
};
const Addmovies = () => {
  const [movies, setMovies] = useState();
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    releasedate: Date.now(),
    posterurl: "",
    featured: false,
    actors: "",
  });
  useEffect(() => {
    getallmovies()
      .then((res) => setMovies(res.movies))
      .catch((err) => console.log(err));
  }, []);

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addmovie({ ...inputs, movies })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          width="50%"
          padding={10}
          margin="auto"
          display="flex"
          flexDirection={"Column"}
          boxShadow={"10px 10px 20px #ccc"}
        >
          <Typography textAlign={"center"} variant="h5" sx={{ color: "black" }}>
            ADD NEW MOVIES
          </Typography>
          <FormLabel sx={{ labelprops }}>Title</FormLabel>
          <TextField value={inputs.title} onChange={handleChange} name="title" variant="standard" margin="normal" />
          <FormLabel sx={{ labelprops }}>Description</FormLabel>
          <TextField
            value={inputs.description}
            onChange={handleChange}
            name="description"
            variant="standard"
            margin="normal"
          />
          <FormLabel sx={{ labelprops }}>Posterurl</FormLabel>
          <TextField
            value={inputs.posterurl}
            onChange={handleChange}
            name="posterurl"
            variant="standard"
            margin="normal"
          />
          <FormLabel sx={{ labelprops }}>Release Date</FormLabel>
          <TextField
            type={"date"}
            value={inputs.releasedate}
            onChange={handleChange}
            name="releasedate"
            variant="standard"
            margin="normal"
          />
          <FormLabel sx={{ labelprops }}>Actors</FormLabel>
          <Box display="flex">
            <TextField value={inputs.actors} onChange={handleChange} name="actors" variant="standard" margin="normal" />
            {/* <Button onClick={() => {
                            setActors([...actors, actor]);
                            setActor("")
                        }}>Add</Button> */}
          </Box>
          <FormLabel sx={{ labelprops }}>Feature</FormLabel>
          <Checkbox
            name="featured"
            checked={inputs.featured}
            onClick={(e) =>
              setInputs((prevState) => ({
                ...prevState,
                featured: e.target.checked,
              }))
            }
            sx={{ mr: "auto" }}
          />
          <Button
            type="submit"
            value={inputs}
            variant="contained"
            sx={{
              width: "30%",
              margin: "auto",
              bgcolor: "#2b2d42",
              ":hover": {
                bgcolor: "#777",
              },
            }}
          >
            Add movie
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default Addmovies;
