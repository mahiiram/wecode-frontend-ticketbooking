import { Box, Typography, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Movieitems from './Movies/Movieitems';
import { Link } from 'react-router-dom';
import { getallmovies } from '../api-helpers/api-helpers';
import './Homepage.css';



const Homepage = () => {

    const [movies, setMovies] = useState([]);
    useEffect(() => {
        getallmovies().then((data) => setMovies(data.movies)).catch((err) => console.log(err))
    }, [])
    return (
        <div className='homepage'>
            <Box width={'100%'} height={'100%'} margin="auto" marginTop={2}>
            <Box margin={'auto'} width="80%" height={'60vh'} padding={2}>
                <img src='https://i.ytimg.com/vi/iLuoIen1ep0/maxresdefault.jpg' alt='leo' width={'100%'} height={'100%'} />
            </Box>
            <Box display="flex" flexDirection={'column'} padding={2} margin="auto">
                <Typography variant='h4' textAlign={'center'}>
                    Latest Releases
                </Typography>
                <Typography variant="p" textAlign={'center'}>Userid:mahiiram@gmail.com password:12345678</Typography>
                <Typography variant="p" textAlign={'center'}>Adminid:test1@test.com password:12345678</Typography>
            </Box>
            <Box display='flex' width="80%" justifyContent={'center'} flexWrap={'wrap'} margin="auto" >
                {movies && movies.slice(0, 4).map((movie, index) => (
                    <Movieitems id={movie._id} title={movie.title} posterurl={movie.posterurl} releasedate={movie.releasedate} key={index} />
                ))}
            </Box>
            <Box display="flex" padding={5} margin="auto">
                <Button LinkComponent={Link} to="/movies" variant="contained" sx={{ margin: 'auto', color: 'white' }} > View All Movies</Button>
            </Box>
        </Box>
        </div>
    )
}

export default Homepage;