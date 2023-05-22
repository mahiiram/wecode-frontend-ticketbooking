import React, { Fragment, useEffect, useState } from 'react'
import { deletebooking, getUserDetails, getbookings } from '../api-helpers/api-helpers'
import { Box, IconButton, List, ListItem, ListItemText, Typography } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
const UserProfile = () => {
   const[bookings,setBookings] = useState();
   const [user,setUser] = useState()
  useEffect(()=>{
    getbookings().then((res)=>setBookings(res.bookings)).catch((err)=>console.log(err));

    getUserDetails().then((res)=>setUser(res.user)).catch((err)=>console.log(err))
  },[])
    
  const handleDelete = (id)=>{
      deletebooking(id).then((res)=>console.log(res)).catch((err)=>console.log(err))

  }
  return (
    <Box width={"100%"} display="flex">
      <Fragment>
          {" "}
     {user &&    (<Box 
          flexDirection={'column'} 
          justifyContent={'center'} 
          alignItems={'center'} 
          width={"30%"}
          padding={3} >
          <AccountCircleIcon sx={{fontSize:"10rem", textAlign:"center", ml:10}} />
          <Typography 
          padding={1}
          width={'80%'} 
          marginBottom={1}
          textAlign={'center'} 
          border={'1px solid #ccc'} borderRadius={6}>
          Name : {user.name}
          </Typography>
          <Typography 
          padding={1}
          width={'80%'} 
          textAlign={'center'} 
          border={'1px solid #ccc'} borderRadius={6}>
          Email : {user.email}
          </Typography>
         </Box>)}
     
         {bookings && bookings.length > 0 && (  <Box width={"70%"} display="flex" flexDirection={'column'} >
           <Typography variant="h4" width="20%" marginTop={1} textAlign={'start'} sx={{bgcolor:"black",color:'white'}} padding={2}>
                       BOOKINGS
           </Typography>
           <Box display={'flex'} textAlign={'center'} flexDirection={"coloumn"} width="80%" > 
           <List>{bookings && bookings.map((bookings,index)=>(
                    <ListItem sx={{bgcolor:"#00d386",marginBottom:'10px', color:"white" ,textAlign:'center' , margin:'1'}}>
                    <ListItemText sx={{margin:1 , width:"auto", textAlign:'center'}}>
                    Movie:{bookings.movie.title}
                    </ListItemText>
                    <ListItemText sx={{margin:1 , width:"auto", textAlign:'center'}}>
                    Seat:{bookings.seatnumber}
                    </ListItemText>
                    <ListItemText sx={{margin: 1 , width:"auto", textAlign:'center'}}>
                    Date:{new Date(bookings.date).toDateString()}
                    </ListItemText>
                     <IconButton onClick={()=>handleDelete(bookings._id)} color="error">
                      <DeleteForeverIcon />
                     </IconButton>
                   </ListItem>
                  ))} 
                  </List> 
           </Box>
      </Box>)}
      </Fragment>
    </Box>
  )
}

export default UserProfile