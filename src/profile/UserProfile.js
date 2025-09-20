import React, { useEffect, useState } from "react";
import {
  deletebooking,
  getUserDetails,
  getallmoviedetails,
  getallmovies,
  getbookings,
} from "../api-helpers/api-helpers";
import { Box, Typography, Card, CardContent, CardActions, IconButton, Grid } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const UserProfile = () => {
  const [bookings, setBookings] = useState([]);
  const [user, setUser] = useState();
  const [MovieDetail, setMovieDetail] = useState({});

  useEffect(() => {
    getUserDetails()
      .then((res) => setUser(res.user))
      .catch((err) => console.log(err));

    getbookings()
      .then((res) => setBookings(res.bookings))
      .catch((err) => console.log(err));
    getallmovies()
      .then((res) => {
        // Create a map: { movieId: movieObject }
        const map = {};
        res.movies.forEach((m) => {
          map[m._id] = m;
        });
        setMovieDetail(map);
      })
      .catch((err) => console.log(err));
    // getallmoviedetails(id)
    //   .then((res) => setMovieDetail(res))
    //   .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    deletebooking(id)
      .then(() => {
        // Remove deleted booking from state
        setBookings((prev) => prev.filter((b) => b._id !== id));
      })
      .catch((err) => console.log(err));
  };

  return (
    <Box width="100%" display="flex" gap={4} padding={4} flexWrap="wrap" justifyContent="center">
      {/* User Info - 50% */}
      {user && (
        <Box flex="1 1 45%">
          <Card
            sx={{
              background: "linear-gradient(135deg, #f6d365 0%, #fda085 100%)",
              color: "white",
              textAlign: "center",
              borderRadius: 4,
              boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
              padding: 3,
            }}
          >
            <AccountCircleIcon sx={{ fontSize: "8rem", mb: 2 }} />
            <Typography variant="h6">Name</Typography>
            <Typography variant="body1" sx={{ fontWeight: "bold", mb: 1 }}>
              {user.name}
            </Typography>
            <Typography variant="h6">Email</Typography>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              {user.email}
            </Typography>
          </Card>
        </Box>
      )}

      {/* Bookings - 50% */}
      {/* <Box flex="1 1 45%">
        <Typography
          variant="h4"
          sx={{
            width: "50%",
            // bgcolor: "white",
            color: "black",
            padding: 1,
            borderRadius: 1,
            textAlign: "start",
            mb: 2,
          }}
        >
          My Bookings
        </Typography>
        <Grid container spacing={3}>
          {bookings.map((booking) => (
            <Grid item xs={12} sm={12} md={12} key={booking._id}>
              <Card
                sx={{
                  display: "flex",
                  width: "500px",
                  background: "linear-gradient(135deg,rgb(8, 13, 34) 0%,rgb(25, 4, 46) 100%)",
                  borderRadius: 5,
                  color: "white",
                  boxShadow: "0 6px 20px rgba(0,0,0,0.3)",
                  overflow: "hidden",
                  position: "relative",
                  padding: 2,
                  alignItems: "center",
                }}
              >
              
                <Box sx={{ display: "flex", flex: 1, alignItems: "center" }}>
                  
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                      {booking.movie.title}
                    </Typography>
                    <Typography>Seat: {booking.seatnumber}</Typography>
                    <Typography>
                      Date:{" "}
                      {new Date(booking.date).toLocaleString("en-US", {
                        weekday: "short",
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </Typography>
                  </Box>

                 
                  <Box
                    sx={{
                      width: 120,
                      height: 120,
                      flexShrink: 0,
                      marginLeft: 2,
                    }}
                  >
                    <img
                      src={MovieDetail[booking.movie._id]?.posterurl || ""}
                      alt={booking.movie.title}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: 4,
                      }}
                    />
                  </Box>

                  
                  <Box
                    sx={{
                      // display: "top",
                      justifyContent: "flex-end", // right alignment
                      alignItems: "flex-start", // top alignment
                    }}
                  >
                    <IconButton onClick={() => handleDelete(booking._id)} color="error">
                      <DeleteForeverIcon />
                    </IconButton>
                  </Box>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box> */}
      <Box flex="1 1 45%">
        <Typography
          variant="h4"
          sx={{
            width: "50%",
            color: "black",
            padding: 1,
            borderRadius: 1,
            textAlign: "start",
            mb: 2,
          }}
        >
          My Bookings
        </Typography>

        {/* Scrollable container */}
        <Box
          sx={{
            maxHeight: "500px", // adjust height as needed
            overflowY: "auto",
            paddingRight: 1, // optional: space for scrollbar
          }}
        >
          <Grid container spacing={3}>
            {bookings.map((booking) => (
              <Grid item xs={12} sm={12} md={12} key={booking._id}>
                <Card
                  sx={{
                    display: "flex",
                    width: "500px",
                    background: "linear-gradient(135deg,rgb(8, 13, 34) 0%,rgb(25, 4, 46) 100%)",
                    borderRadius: 5,
                    color: "white",
                    boxShadow: "0 6px 20px rgba(0,0,0,0.3)",
                    overflow: "hidden",
                    position: "relative",
                    padding: 2,
                    alignItems: "center",
                  }}
                >
                  {/* Content Row */}
                  <Box sx={{ display: "flex", flex: 1, alignItems: "center" }}>
                    {/* Left content */}
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                        {booking.movie.title}
                      </Typography>
                      <Typography>Seat: {booking.seatnumber}</Typography>
                      <Typography>
                        Date:{" "}
                        {new Date(booking.date).toLocaleString("en-US", {
                          weekday: "short",
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </Typography>
                    </Box>

                    {/* Poster Image */}
                    <Box
                      sx={{
                        width: 120,
                        height: 120,
                        flexShrink: 0,
                        marginLeft: 2,
                      }}
                    >
                      <img
                        src={MovieDetail[booking.movie._id]?.posterurl || ""}
                        alt={booking.movie.title}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          borderRadius: 4,
                        }}
                      />
                    </Box>

                    {/* Delete Icon */}
                    <Box
                      sx={{
                        width: "10%",
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "flex-start",
                      }}
                    >
                      <IconButton onClick={() => handleDelete(booking._id)} color="error">
                        <DeleteForeverIcon />
                      </IconButton>
                    </Box>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default UserProfile;
