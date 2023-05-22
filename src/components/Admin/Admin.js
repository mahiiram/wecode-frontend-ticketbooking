import React from 'react'
import Authform from '../Auth/Authform'
import { sendAdminAuthReq } from '../../api-helpers/api-helpers'
import { useDispatch } from 'react-redux'
import { adminAction } from '../../store'
import { useNavigate } from 'react-router-dom'

const Admin = () => {
     const navigate = useNavigate();
    const dispatch = useDispatch();
    const onresreceived = (data)=>{
      console.log(data)
      dispatch(adminAction.login());
      localStorage.setItem('adminId',data.id);
      localStorage.setItem("token",data.token);
      navigate('/')
    }
  const getData= (data)=>{
         console.log("Admin",data)
         sendAdminAuthReq(data.inputs)
         .then(onresreceived)
         .catch((err)=>console.log(err))
  }
  return (
    <div><Authform onSubmit={getData} isAdmin={true}/></div>
  )
}

export default Admin;