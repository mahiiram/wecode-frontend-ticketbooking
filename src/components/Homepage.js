import { Box, Typography, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Movieitems from './Movies/Movieitems';
import { Link } from 'react-router-dom';
import { getallmovies } from '../api-helpers/api-helpers';
import './Homepage.css';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';



const Homepage = () => {

    const [movies, setMovies] = useState([]);
    useEffect(() => {
        getallmovies().then((data) => setMovies(data.movies)).catch((err) => console.log(err))
    }, [])
    
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 1
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };
    return (
        <div className='homepage'>
            <Box width={'100%'} height={'100%'} margin="auto" marginTop={2}>
            <Box margin={'auto'} width="80%" height={'60vh'} padding={2}>
                <Carousel responsive={responsive}>
                {movies.map((movie,index)=>{
                    return (
                        <img src={movie.posterurl} alt='leo' width={'100%'} height={'60%'} key={index}/>
                    )
                })}
                </Carousel>    
            </Box>
            <Box display="flex" flexDirection={'column'} padding={2} margin="auto" marginTop={'20px'}>
                <Typography variant='h4' textAlign={'center'}>
                    Latest Releases
                </Typography>
                <Typography variant="p" textAlign={'center'}>Userid:mahiiram@gmail.com password:12345678</Typography>
                <Typography variant="p" textAlign={'center'}>Adminid:Admin1@test.com password:12345678</Typography>
            </Box>
            <Box display='flex' width="80%" justifyContent={'center'} flexWrap={'wrap'} margin="auto" >
               {movies && movies.slice(0, 3).map((movie, index) => (
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