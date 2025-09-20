import React, { useEffect, useState } from "react";
import { getAdminbyId } from "../api-helpers/api-helpers";
import { Box, Typography, Card, CardContent, CardMedia, Grid } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const AdminProfile = () => {
  const [admin, setAdmin] = useState();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getAdminbyId()
      .then((res) => {
        setAdmin(res);
        setMovies(res.Addedmovies || []);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Box width="100%" padding={4} display="flex" flexDirection="column" alignItems="center" gap={4}>
      {/* Admin Card */}
      {admin && (
        <Card
          sx={{
            width: "40%",
            textAlign: "center",
            padding: 2,
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "white",
            borderRadius: 4,
            boxShadow: "0 8px 16px rgba(0,0,0,0.3)",
          }}
        >
          <AccountCircleIcon sx={{ fontSize: "8rem", marginBottom: 2 }} />
          <Typography variant="h6">Admin Email</Typography>
          <Typography variant="body1" sx={{ fontWeight: "bold", mt: 1 }}>
            {admin.email}
          </Typography>
        </Card>
      )}

      {/* Movies Grid */}
      {movies.length > 0 && (
        <Box width="100%">
          <Typography
            variant="h4"
            sx={{
              bgcolor: "black",
              color: "white",
              padding: 2,
              textAlign: "center",
              borderRadius: 2,
              mb: 2,
            }}
          >
            Added Movies
          </Typography>

          <Grid container spacing={3} justifyContent="center">
            {movies.map((movie) => (
              <Grid item key={movie._id} xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    background: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)",
                    color: "#333",
                    borderRadius: 3,
                    boxShadow: "0 6px 12px rgba(0,0,0,0.2)",
                    textAlign: "center",
                  }}
                >
                  <CardMedia component="img" image={movie.posterurl} alt={movie.title} height="300" />
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                      {movie.title}
                    </Typography>
                    <Typography variant="body2">Release Date: {movie.releasedate}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Box>
  );
};

export default AdminProfile;
