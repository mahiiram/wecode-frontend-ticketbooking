import React, { useEffect, useState } from "react";
import { UserUpdate, deletebooking, getUserDetails, getallmovies, getbookings } from "../api-helpers/api-helpers";
import { Box, Typography, Card, IconButton, Grid, TextField, Button } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import toast from "react-hot-toast";

const UserProfile = () => {
  const [bookings, setBookings] = useState([]);
  const [user, setUser] = useState();

  const [MovieDetail, setMovieDetail] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });

  useEffect(() => {
    getUserDetails()
      .then((res) => {
        setUser(res.user);
        setFormData({ name: res.user.name, email: res.user.email, password: "" });
      })
      .catch((err) => console.log(err));

    getbookings()
      .then((res) => setBookings(res.bookings))
      .catch((err) => console.log(err));

    getallmovies()
      .then((res) => {
        const map = {};
        res.movies.forEach((m) => {
          map[m._id] = m;
        });
        setMovieDetail(map);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    deletebooking(id)
      .then(() => setBookings((prev) => prev.filter((b) => b._id !== id)))
      .catch((err) => console.log(err));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    UserUpdate({ id: user._id, ...formData })
      .then((res) => {
        toast.success("Profile updated successfully!");
        // Merge updated fields manually
        setUser((prev) => ({
          ...prev,
          name: formData.name,
          email: formData.email,
        }));
        setIsEditing(false);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to update profile");
      });
  };

  return (
    <Box width="100%" display="flex" gap={4} padding={4} flexWrap="wrap" justifyContent="center">
      {user && (
        <Box flex="1 1 30%" key={user._id}>
          <Card
            sx={{
              position: "relative",
              background: isEditing ? "#fff" : "linear-gradient(135deg,rgb(8, 13, 34) 0%,rgb(25, 4, 46) 100%)",
              color: isEditing ? "#000" : "white",
              textAlign: "center",
              borderRadius: 4,
              boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
              padding: 3,
            }}
          >
            {/* Edit Icon */}
            <IconButton
              sx={{ position: "absolute", top: 8, right: 8, color: "white" }}
              onClick={() => setIsEditing((prev) => !prev)}
            >
              <EditIcon />
            </IconButton>

            {!isEditing ? (
              <>
                <AccountCircleIcon sx={{ fontSize: "8rem", mb: 2 }} />
                <Typography variant="h6">Name</Typography>
                <Typography variant="body1" sx={{ fontWeight: "bold", mb: 1 }}>
                  {user.name}
                </Typography>
                <Typography variant="h6">Email</Typography>
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  {user.email}
                </Typography>
              </>
            ) : (
              <Box display="flex" flexDirection="column" gap={2}>
                <TextField
                  label="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                />
                .
                <TextField
                  label="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                />
                <TextField
                  label="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  variant="outlined"
                  type="password"
                  fullWidth
                />
                <Button variant="contained" color="primary" onClick={handleSave}>
                  Save
                </Button>
              </Box>
            )}
          </Card>
        </Box>
      )}

      <Box flex="1 1 45%">
        <Typography
          variant="h4"
          sx={{ width: "50%", color: "black", padding: 1, borderRadius: 1, textAlign: "start", mb: 2 }}
        >
          My Bookings
        </Typography>

        <Box sx={{ maxHeight: "500px", overflowY: "auto", paddingRight: 1 }}>
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
                    <Box sx={{ width: 120, height: 120, flexShrink: 0, marginLeft: 2 }}>
                      <img
                        src={MovieDetail[booking.movie._id]?.posterurl || ""}
                        alt={booking.movie.title}
                        style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 4 }}
                      />
                    </Box>
                    <Box sx={{ width: "10%", display: "flex", justifyContent: "flex-end", alignItems: "flex-start" }}>
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
