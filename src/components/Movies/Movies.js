import { Box, Typography } from "@mui/material";
import React from "react";
import { getallmovies } from "../../api-helpers/api-helpers";
import { useState, useEffect } from "react";
import Movieitems from "./Movieitems";
import "./movies.css";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    getallmovies()
      .then((data) => setMovies(data.movies))
      .catch((err) => console.log(err));
  }, []);
  return (
    <Box sx={{ bgcolor: "white" }}>
      <Box>
        <Box display="flex" width="80%" marginTop={5} justifyContent={"flex-start"} flexWrap={"wrap"} margin="auto">
          {movies &&
            movies.map((movie, index) => (
              <Movieitems
                id={movie._id}
                title={movie.title}
                posterurl={movie.posterurl}
                releasedate={movie.releasedate}
                key={index}
              />
            ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Movies;
