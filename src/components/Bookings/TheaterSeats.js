// TheaterSeats.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Booking.css";

const TheaterSeats = () => {
  //   const [seats, setSeats] = useState([]);
  const seats = [
    { id: 1, name: "1" },
    { id: 2, name: "2" },
    { id: 3, name: "3" },
  ];
  const [selectedSeats, setSelectedSeats] = useState([]);

  //   useEffect(() => {
  //     const fetchData = async () => {
  //       try {
  //         const response = await axios.get('http://localhost:5000'); // Your backend API endpoint for fetching seats
  //         setSeats(response.data);
  //         console.log(response)
  //       } catch (error) {
  //         console.error('Error fetching seats:', error);
  //       }
  //     };
  //     fetchData();
  //   }, []);

  const handleSeatClick = (seatId) => {
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter((selected) => selected !== seatId));
    } else {
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  const renderSeats = () => {
    return seats.map((seat) => (
      <div
        key={seat.id}
        onClick={() => handleSeatClick(seat.id)}
        style={{
          backgroundColor: selectedSeats.includes(seat.id) ? "green" : "grey",
          margin: "5px",
          padding: "10px",
          display: "inline-block",
        }}
      >
        {seat.name}
      </div>
    ));
  };

  return <div>{renderSeats()}</div>;
};

export default TheaterSeats;
