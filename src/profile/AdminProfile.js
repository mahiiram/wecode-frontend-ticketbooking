import React, { Fragment, useEffect, useState } from 'react'
import {  getAdminbyId } from '../api-helpers/api-helpers'
import { Box,  List, ListItem, ListItemText, Typography } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const AdminProfile = () => {
  const [admin,setAdmin] = useState()
   const [movies,setMovies] = useState()
  useEffect(()=>{
    getAdminbyId().then((res)=>setAdmin(res.movies)).catch((err)=>console.log(err))
    getAdminbyId().then((res)=>setMovies(res.movies.Addedmovies)).catch((err)=>console.log(err))
     
  },[]) 
  return (
    <Box width={"100%"} display="flex">
      <Fragment>
          {" "}
     {admin &&    (<Box 
          flexDirection={'column'} 
          justifyContent={'center'} 
          alignItems={'center'} 
          width={"30%"}
          padding={3} >
          <AccountCircleIcon sx={{fontSize:"10rem", textAlign:"center", ml:5}} />
          <Typography 
          padding={1}
          width={'80%'} 
          textAlign={'center'} 
          border={'1px solid #ccc'} borderRadius={6}>
          Email : {admin.email}
          </Typography>
         </Box>)}
     
         {movies && movies.length > 0 && (  <Box width={"70%"} display="flex" flexDirection={'column'} >
           <Typography variant="h4" width="50%" marginTop={1} textAlign={'start'} sx={{bgcolor:"black",color:'white'}} padding={2}>
                      ADDED MOVIES
           </Typography>
           <Box display={'flex'} textAlign={'center'} flexDirection={"coloumn"} width="80%" > 
           <List>{movies && movies.map((movies)=>(
                    <ListItem sx={{bgcolor:"#00d386",marginBottom:'10px', color:"white" ,textAlign:'center' , margin:'1'}}>
                    <ListItemText sx={{margin:1 , width:"auto", textAlign:'center'}}>
                    Movie:{movies.title}
                    </ListItemText>
                   </ListItem>
                  ))} 
                  </List> 
           </Box>
      </Box>)}
      </Fragment>
    </Box>
  )
}

export default AdminProfile