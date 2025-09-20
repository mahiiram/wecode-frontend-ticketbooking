import React, { Fragment, useEffect, useState } from "react";
import "./Booking.css";
import { useParams } from "react-router-dom";
import { getallmoviedetails, getTheatres, newbooking } from "../../api-helpers/api-helpers";
import { Box, Button, FormLabel, TextField, Typography } from "@mui/material";
import toast from "react-hot-toast";

const Booking = () => {
  const [movie, setMovie] = useState(null);
  const [inputs, setInputs] = useState({ date: "" });
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [soldSeats, setSoldSeats] = useState([]); // seats already booked
  const showTimings = ["09:00", "13:00", "17:00", "21:00"];
  const [selectedTime, setSelectedTime] = useState("");
  const [theatres, setTheatres] = useState([]);
  const [selectedTheatre, setSelectedTheatre] = useState("");

  const id = useParams().id;

  const totalSeats = 64;
  const seatPrice = 150;

  useEffect(() => {
    getallmoviedetails(id)
      .then((res) => {
        setMovie(res.movies);
        // Example: set booked seats from backend
        if (res.movies.bookedSeats) setSoldSeats(res.movies.bookedSeats);
      })
      .catch((err) => console.log(err));
  }, [id]);
  useEffect(() => {
    getTheatres()
      .then((res) => setTheatres(res.data.theatres)) // adjust based on your API response
      .catch((err) => console.log(err));
  }, []);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSeatClick = (seatNumber) => {
    if (soldSeats.includes(seatNumber)) return; // cannot select sold seat
    setSelectedSeats((prev) =>
      prev.includes(seatNumber) ? prev.filter((s) => s !== seatNumber) : [...prev, seatNumber]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputs.date) return alert("Select booking date");
    if (!selectedTime) return alert("Select show time");
    if (selectedSeats.length === 0) return alert("Select at least 1 seat");

    // Combine date + time into a single ISO datetime string
    const bookingDateTime = new Date(`${inputs.date.split("T")[0]}T${selectedTime}:00`);

    newbooking({
      movie: movie._id,
      date: bookingDateTime,
      seatnumber: selectedSeats,
      theatre: selectedTheatre,
      totalamount: selectedSeats.length * seatPrice,
    })
      .then((res) => {
        toast.success("Booking successful!");
        setSoldSeats((prev) => [...prev, ...selectedSeats]);
        setSelectedSeats([]);
        setSelectedTime("");
        setInputs({ date: "" });
        setSelectedTheatre("");
      })
      .catch((err) => console.log(err));
  };
  if (!movie) return <Typography>Loading...</Typography>;

  return (
    <Box display="flex" flexDirection={{ xs: "column", md: "row" }} padding={2} gap={4}>
      {/* Left Column: Movie Details & Booking Form */}
      <Box flex={1}>
        <Typography
          padding={2}
          variant="h5"
          textAlign="start"
          sx={{
            fontWeight: "bold",
            background: "linear-gradient(90deg, #FF416C, #FF4B2B, #FFD700, #00CFFF)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          BOOK THE MOVIE: {movie.title}
        </Typography>

        <Box my={2}>
          <img
            src={movie.posterurl}
            alt={movie.title}
            style={{ width: "100%", maxHeight: "400px", objectFit: "cover", borderRadius: "8px" }}
          />
        </Box>

        <Box my={2}>
          <Typography variant="body1" mb={1}>
            {movie.description}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Cast: {movie.actors.join(", ")}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Release Date: {new Date(movie.releasedate).toDateString()}
          </Typography>
        </Box>

        <form onSubmit={handleSubmit}>
          <Box display="flex" flexDirection="column" gap={2}>
            <FormLabel>Booking Date</FormLabel>
            <Box
              onClick={() => document.getElementById("booking-date")?.showPicker?.()}
              sx={{ display: "inline-block", cursor: "pointer" , width:"100%"}}
            >
              <TextField
                id="booking-date"
                name="date"
                value={inputs.date}
                onChange={handleChange}
                type="date"
                variant="standard"
              />
            </Box>
            <Button type="submit" variant="contained" sx={{ mt: 2 }}>
              Book
            </Button>
          </Box>
        </form>
      </Box>

      {/* Right Column: Seat Selection */}
      <Box flex={1}>
        {/* Theatre Selection */}

        <Box
          display="flex"
          gap={2}
          alignItems="center"
          sx={{
            mt: 2,
            mb: 2,
            "& select": {
              padding: "8px",
              fontSize: "16px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              transition: "all 0.2s ease",
              "&:hover": {
                borderColor: "#FF416C",
                boxShadow: "0 0 5px rgba(255,65,108,0.5)",
              },
            },
          }}
        >
          {/* Theatre Dropdown */}
          <Box display="flex" flexDirection="column">
            <FormLabel>Select Theatre</FormLabel>
            <select value={selectedTheatre} onChange={(e) => setSelectedTheatre(e.target.value)}>
              <option value="">Select theatre</option>
              {movie?.theatres?.map((theatre) => (
                <option key={theatre._id} value={theatre._id}>
                  {theatre.name}
                </option>
              ))}
            </select>
          </Box>

          {/* Show Time Dropdown */}
          <Box display="flex" flexDirection="column">
            <FormLabel>Show Time</FormLabel>
            <select name="time" value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)}>
              <option value="">Select show time</option>
              {showTimings.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </Box>
        </Box>

        {/* Seat Selection */}
        <Typography variant="h6" mb={2}>
          Select Your Seats
        </Typography>

        <Box className="container">
          <Box className="screen" mb={2} sx={{ backgroundColor: "#ccc", height: "70px", borderRadius: "1px" }} />

          <Box display="grid" gridTemplateColumns="repeat(8, 1fr)" gap={1}>
            {Array.from({ length: totalSeats }).map((_, index) => {
              const seatNumber = index + 1;
              const isSelected = selectedSeats.includes(seatNumber);
              const isSold = soldSeats.includes(seatNumber);

              return (
                <Button
                  key={seatNumber}
                  onClick={() => handleSeatClick(seatNumber)}
                  disabled={isSold || !selectedTheatre} // disable if no theatre selected
                  sx={{
                    width: "100%",
                    padding: "8px 0",
                    backgroundColor: isSold ? "#444" : isSelected ? "#FF416C" : "#eee",
                    color: isSold ? "#fff" : isSelected ? "#fff" : "#000",
                    borderRadius: "4px",
                    ":hover": {
                      backgroundColor: !isSold ? "#FF4B2B" : "#444",
                    },
                  }}
                >
                  {seatNumber}
                </Button>
              );
            })}
          </Box>

          <Typography mt={2}>
            You have selected {selectedSeats.length} seat(s) for a price of RS. {selectedSeats.length * seatPrice}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Booking;
