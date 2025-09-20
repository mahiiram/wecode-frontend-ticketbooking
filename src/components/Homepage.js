import { Box, Typography, Button } from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import Movieitems from "./Movies/Movieitems";
import { Link } from "react-router-dom";
import { getallmovies } from "../api-helpers/api-helpers";
import "react-multi-carousel/lib/styles.css";
import Carousel from "react-multi-carousel";

const Homepage = () => {
  const [movies, setMovies] = useState([]);
  const carouselRef = useRef();

  useEffect(() => {
    getallmovies()
      .then((data) => setMovies(data.movies))
      .catch((err) => console.log(err));
  }, []);

  // Carousel settings for poster banner (top)
  const bannerResponsive = {
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 1 },
    tablet: { breakpoint: { max: 1024, min: 600 }, items: 1 },
    mobile: { breakpoint: { max: 600, min: 0 }, items: 1 },
  };

  // Carousel settings for movie cards
  const cardResponsive = {
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 5 },
    tablet: { breakpoint: { max: 1024, min: 600 }, items: 2 },
    mobile: { breakpoint: { max: 600, min: 0 }, items: 1 },
  };

  // Optional: Mouse wheel scroll support
  const handleWheel = (e) => {
    e.preventDefault();
    if (!carouselRef.current) return;
    e.deltaY < 0 ? carouselRef.current.previous() : carouselRef.current.next();
  };

  return (
    <div className="homepage">
      <Box width="100%" margin="auto" marginTop={2}>
        {/* Banner carousel */}
        <Box margin="auto" width="80%" height="60vh" padding={2}>
          <Carousel
            responsive={bannerResponsive}
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={3000}
            transitionDuration={700}
            showDots={false}
            draggable={true}
            swipeable={true}
          >
            {movies.map((movie) => (
              <img
                src={movie.posterurl}
                alt={movie.title}
                key={movie._id}
                style={{
                  width: "100%",
                  height: "60%",
                  objectFit: "cover",
                  borderRadius: "10px",
                }}
              />
            ))}
          </Carousel>
        </Box>

        {/* Latest releases heading */}
        <Box display="flex" flexDirection="column" padding={3}  marginTop={10}>
          <Typography variant="h4" textAlign="center">
            Latest Releases
          </Typography>
          <Typography variant="body2" textAlign="center" color="text.secondary">
            Adminid: Admin1@test.com | Password: 12345678
          </Typography>
        </Box>

        {/* Movie cards carousel */}
        <Box width="90%" margin="auto" marginTop={4} height="300px" onWheel={handleWheel}>
          <Carousel
            ref={carouselRef}
            responsive={cardResponsive}
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={2000}
            transitionDuration={500}
            keyBoardControl={true}
            showDots={false}
            draggable={true}
            swipeable={true}
            containerClass="carousel-container"
            itemClass="carousel-item"
          >
            {movies.map((movie) => (
              <Box key={movie._id} padding={1} display="flex" justifyContent="center">
                <Movieitems
                  id={movie._id}
                  title={movie.title}
                  posterurl={movie.posterurl}
                  releasedate={movie.releasedate}
                />
              </Box>
            ))}
          </Carousel>
        </Box>
      </Box>
    </div>
  );
};

export default Homepage;
