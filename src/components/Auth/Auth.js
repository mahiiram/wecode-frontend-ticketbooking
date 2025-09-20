import React from "react";
import Authform from "./Authform";
import { sendUserAuthReq } from "../../api-helpers/api-helpers";
import { useDispatch } from "react-redux";
import { userAction } from "../../store";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Auth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onresreceived = (data) => {
    console.log(data);
    dispatch(userAction.login());
    localStorage.setItem("userid", data.id);
    navigate("/");
  };
  const getData = async (data) => {
    try {
      const res = await sendUserAuthReq(data.inputs, data.signup);
      onresreceived(res);
      return { success: true, ...res };
    } catch (err) {
      return { success: false, message: err.message };
    }
  };
  return (
    <div>
      <Authform onSubmit={getData} isAdmin={false} />
    </div>
  );
};

export default Auth;
