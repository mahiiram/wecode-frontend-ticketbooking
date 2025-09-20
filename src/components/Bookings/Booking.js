import React, { Fragment, useEffect, useState } from "react";
import "./Booking.css";
import { useParams } from "react-router-dom";
import { getallmoviedetails, newbooking } from "../../api-helpers/api-helpers";
import { Box, Button, FormLabel, TextField, Typography } from "@mui/material";
import TheaterSeats from "./TheaterSeats";

const Booking = () => {
  const [movies, setMovies] = useState();
  const [inputs, setInputs] = useState({ seatnumber: "", date: "" });
  const id = useParams().id;
  console.log(id);
  useEffect(() => {
    getallmoviedetails(id)
      .then((res) => setMovies(res.movies))
      .catch((err) => console.log(err));
  }, [id]);
  const handleChange = (e) => {
    setInputs((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    newbooking({ ...inputs, movie: movies._id })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  console.log("movies", movies);
  return (
    <div className="maindiv">
      <div className="firstdiv">
        {movies && (
          <Fragment>
            <Typography padding={2} variant="h5" textAlign={"start"}>
              BOOK THE MOVIE:{movies.title}
            </Typography>
            <Box>
              <img width="80%" height="100%" src={movies.posterurl} alt={movies.title} />
            </Box>
            <Box>
              <Typography variant="h6">{movies.description}</Typography>
              <Typography variant="h6">Cast:{movies.actors.map((actor) => " " + actor + ",")}</Typography>
              <Typography variant="h6">Date: {new Date(movies.releasedate).toDateString()}</Typography>
            </Box>
            <form onSubmit={handleSubmit}>
              <Box display="flex" flexDirection={"column"}>
                <FormLabel>SeatNumber</FormLabel>
                <TextField
                  name="seatnumber"
                  value={inputs.seatnumber}
                  onChange={handleChange}
                  type={"number"}
                  margin="normal"
                  variant="standard"
                />
                <FormLabel>Booking Date</FormLabel>
                <TextField
                  name="date"
                  value={inputs.date}
                  onChange={handleChange}
                  type="datetime-local"
                  margin="normal"
                  variant="standard"
                />
                <Button type="submit" variant="contained" sx={{ mt: 3 }}>
                  Book
                </Button>
              </Box>
            </form>
          </Fragment>
        )}
      </div>
      <div className="seconddiv">
        {/* <div className="movie-container">
                    <label>SELECT THEATRE</label>
                    <select id='theatre'>
                        <option>krishna</option>
                        <option>Mayajall</option>
                        <option>Rohini</option>
                        <option>Ram cinemas</option>
                    </select>
                </div>
                <ul className="showcase">
                    <li>
                        <button className="seat"></button>
                        <small>Available</small>
                    </li>
                    <li>
                        <button className="seat selected"></button>
                        <small>Selected</small>
                    </li>
                    <li>
                        <button className="seat sold"></button>
                        <small>Sold</small>
                    </li>
                </ul>
                <div className="container">
                    <div className="screen"></div>

                    <div className="row">
                        <button className="seat" >1</button>
                        <button className="seat" >2</button>
                        <button className="seat" >3</button>
                        <button className="seat" >4</button>
                        <button className="seat" >5</button>
                        <button className="seat" >6</button>
                        <button className="seat" >7</button>
                        <button className="seat" >8</button>
                    </div>

                    <div className="row">
                        <button className="seat" >9</button>
                        <button className="seat" >10</button>
                        <button className="seat" >11</button>
                        <button className="seat" >12</button>
                        <button className="seat" >13</button>
                        <button className="seat" >14</button>
                        <button className="seat" >15</button>
                        <button className="seat" >16</button>
                    </div>
                    <div className="row">
                        <div className="seat" >17</div>
                        <div className="seat" >18</div>
                        <div className="seat" >19</div>
                        <div className="seat" >20</div>
                        <div className="seat" >21</div>
                        <div className="seat" >22</div>
                        <div className="seat" >23</div>
                        <div className="seat" >24</div>
                    </div>
                    <div className="row">
                        <div className="seat" >25</div>
                        <div className="seat" >26</div>
                        <div className="seat" >27</div>
                        <div className="seat" >28</div>
                        <div className="seat" >29</div>
                        <div className="seat" >30</div>
                        <div className="seat" >31</div>
                        <div className="seat" >32</div>
                    </div>
                    <div className="row">
                        <div className="seat" >33</div>
                        <div className="seat" >34</div>
                        <div className="seat" >35</div>
                        <div className="seat" >36</div>
                        <div className="seat" >37</div>
                        <div className="seat" >38</div>
                        <div className="seat" >39</div>
                        <div className="seat" >40</div>
                    </div>
                    <div className="row">
                        <div className="seat" >41</div>
                        <div className="seat" >42</div>
                        <div className="seat" >43</div>
                        <div className="seat" >44</div>
                        <div className="seat" >45</div>
                        <div className="seat" >46</div>
                        <div className="seat" >47</div>
                        <div className="seat" >48</div>
                    </div>
                    <div className="row">
                        <div className="seat" >49</div>
                        <div className="seat" >50</div>
                        <div className="seat" >51</div>
                        <div className="seat" >52</div>
                        <div className="seat" >53</div>
                        <div className="seat" >54</div>
                        <div className="seat" >55</div>
                        <div className="seat" >56</div>
                    </div>
                    <div className="row">
                        <div className="seat" >57</div>
                        <div className="seat" >58</div>
                        <div className="seat" >59</div>
                        <div className="seat" >60</div>
                        <div className="seat" >61</div>
                        <div className="seat" >62</div>
                        <div className="seat" >63</div>
                        <div className="seat" >64</div>
                    </div>
                </div>
                <p class="text">
 new                    You have selected <span id="count">0</span> seat for a price of RS.<span
                        id="total">0</span>
                </p>

 */}
        {/* <TheaterSeats /> */}
      </div>
    </div>
  );
};

export default Booking;
