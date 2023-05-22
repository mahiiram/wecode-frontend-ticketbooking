import React from 'react'
import Authform from './Authform'
import { sendUserAuthReq } from '../../api-helpers/api-helpers';
import { useDispatch } from 'react-redux';
import { userAction } from '../../store';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const navigate = useNavigate()
  const dispatch =useDispatch();
  const onresreceived = (data)=>{
    console.log(data)
    dispatch(userAction.login());
    localStorage.setItem("userid",data.id);
    navigate('/')
  } 
  const getData= (data)=>{
         console.log(data);
         sendUserAuthReq(data.inputs,data.signup).then(onresreceived)
         .catch((err)=>console.log(err));
  }
  return (
    <div>
      <Authform onSubmit={getData} isAdmin={false}/>
    </div>
  )
}

export default Auth