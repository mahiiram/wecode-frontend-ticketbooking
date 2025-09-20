import React, { useState } from "react";
import { Card, CardContent, CardActions, Button, Typography, Box, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";

const MovieCard = ({ id, title, posterurl, releasedate }) => {
  const navigate = useNavigate();
  const [isFocused, setIsFocused] = useState(false);

  const handleClick = (e) => {
    e.stopPropagation();
    if (localStorage.getItem("userid")) {
      navigate(`/booking/${id}`);
    } else {
      navigate("/auth");
    }
  };

  const handleTitleClick = () => {
    setIsFocused(true); // highlight this movie name
    navigate(`/booking/${id}`);
  };

  const formattedDate = releasedate ? new Date(releasedate).toDateString() : "";

  return (
    <Card
      sx={{
        width: 250,
        height: 350,
        borderRadius: 5,
        margin: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        ":hover": {
          boxShadow: "10px 10px 20px #ccc",
          transform: "scale(1.03)",
          transition: "all 0.3s ease-in-out",
        },
      }}
    >
      {/* Poster */}
      <Box
        sx={{
          height: "40%",
          overflow: "hidden",
          cursor: "pointer",
        }}
        onClick={handleTitleClick}
      >
        <img src={posterurl} alt={title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </Box>

      {/* Content */}
      <CardContent sx={{ flexGrow: 1, textAlign: "center" }}>
        <Box
          onClick={handleTitleClick}
          sx={{
            backgroundColor: isFocused ? "#dff6ff" : "transparent",
            borderRadius: 1,
            padding: "4px 8px",
            cursor: "pointer",
          }}
        >
          <Tooltip
            title={title} // content shown on hover
            placement="top" // position of the tooltip
            arrow // shows an arrow pointing to the text
            enterDelay={200} // optional: delay before showing tooltip
            leaveDelay={100} // optional: delay before hiding
            sx={{
              "& .MuiTooltip-tooltip": {
                backgroundColor: "#dff6ff",
                color: "black",
                fontWeight: "bold",
                fontSize: "0.9rem",
              },
            }}
          >
            <Typography
              variant="h6"
              component="div"
              sx={{
                fontWeight: "bold",
                // color: isFocused ? "red" : "inherit",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                color: "gray",
                transition: "all 0.3s ease-in-out",
                "&:hover": {
                  color: "black", // text color changes on hover
                  backgroundColor: "#dff6ff", // optional background highlight
                  borderRadius: 1, // rounded corners for background
                  padding: "2px 4px", // some padding to make highlight visible
                },
              }}
            >
              {title}
            </Typography>
          </Tooltip>
        </Box>
        <Typography variant="body2" color="text.secondary">
          {formattedDate}
        </Typography>
      </CardContent>

      {/* Book Now */}
      <CardActions sx={{ justifyContent: "center", paddingBottom: 2 }}>
        <Button
          onClick={handleClick}
          variant="contained"
          sx={{
            borderRadius: 3,
            px: 3,
            background: "linear-gradient(45deg, #FF416C, #FF4B2B)",
            color: "white",
            fontWeight: "bold",
            "&:hover": {
              background: "linear-gradient(45deg, #FF4B2B, #FF416C)",
            },
          }}
        >
          Book Now
        </Button>
      </CardActions>
    </Card>
  );
};

export default MovieCard;
