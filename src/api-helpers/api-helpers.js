import axios from "axios";

export const getallmovies = async()=>{
       const res =await axios.get("https://ticketbooking-backend-2rg6.onrender.com/").catch((err)=>console.log(err));

       console.log(res)
       if(res.status !== 200){
        return console.log("No data")
       }
       const resdata = await res.data;
       return resdata

}; 

export const sendUserAuthReq = async(data,signup)=>{
    const res = await axios.post(`https://ticketbooking-backend-2rg6.onrender.com/user/${signup?"signup":"login"}`,{
         name: signup? data.name : "",
         email:data.email,
         password:data.password
      }).catch((err)=>console.log(err))  
      console.log(res)
      const resdata = await res.data;
       return resdata

}

export const sendAdminAuthReq = async (data) =>{
     const res =await axios.post("https://ticketbooking-backend-2rg6.onrender.com/admin/login",{
      email:data.email,
      password:data.password,
   }).catch((err)=>console.log(err))
   console.log(res)

   
   const resdata = await res.data;
   return resdata
}

export const getallmoviedetails = async (id)=>{
   const res = await axios.get(`https://ticketbooking-backend-2rg6.onrender.com/movie/${id}`).catch((err)=>console.log(err))
    
   const resdata = await res.data;
   return resdata
}

export const newbooking = async (data)=>{
    const res = await axios.post('https://ticketbooking-backend-2rg6.onrender.com/booking/create',{
        movie:data.movie,
        date:data.date,
        seatnumber:data.seatnumber,
        user:localStorage.getItem('userid')
    }).catch((err)=>console.log(err))
    if(res.status!==201 && res.status!==200 ){
      return console.log("unexpected error occured")
   } 
    const resdata = await res.data;
    return resdata
}

export const getbookings = async ()=>{

   let id= localStorage.getItem('userid')
   const res = await axios.get(`https://ticketbooking-backend-2rg6.onrender.com/user/getusersbooking/${id}`).catch((err)=>console.log(err))
    
   if(res.status!==201){
      return console.log("unexpected error occured")
   }
     
      const resdata = await res.data;
      return resdata
};

export const deletebooking = async(id)=>{
       
       const res = await axios.delete(`https://ticketbooking-backend-2rg6.onrender.com/booking/delete/${id}`).catch((err)=>console.log(err))
       
       if(res.status!==200 && res.status!==201){
         return console.log("unexpected err")
       }
       const resdata = await res.data;
       return resdata
}

export const getUserDetails = async () =>{
   const id = localStorage.getItem('userid');
   const res = await axios.get(`https://ticketbooking-backend-2rg6.onrender.com/user/${id}`).catch((err)=>console.log(err))

    const resdata = await res.data;
    return resdata

}

export const addmovie = async (data)=>{
       
   const res = await axios.post('https://ticketbooking-backend-2rg6.onrender.com/movie/create',{
      title: data.title,
      description: data.description,
      releasedate: data.releasedate ,
      posterurl: data.posterurl,
      featured:data.feautured,
      actors:data.actors,
      admin: localStorage.getItem('adminId')
   },{
      headers:{
         Authorization:`Bearer ${localStorage.getItem('token')}`
      } 
   }).catch((err)=>console.log(err))
     
   const resData = await res.data;
   return resData
}

export const getAdminbyId = async ()=>{
const adminId = localStorage.getItem('adminId')
   const res = await axios.get(`https://ticketbooking-backend-2rg6.onrender.com/admin/${adminId}`).catch((err)=>console.log(err))
   console.log(res)
    const resdata = await res.data
    return resdata;
};