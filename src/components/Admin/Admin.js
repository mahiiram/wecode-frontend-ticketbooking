import React from "react";
import Authform from "../Auth/Authform";
import { sendAdminAuthReq } from "../../api-helpers/api-helpers";
import { useDispatch } from "react-redux";
import { adminAction } from "../../store";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onresreceived = (data) => {
    console.log(data);
    dispatch(adminAction.login());
    localStorage.setItem("adminId", data.id);
    localStorage.setItem("token", data.token);
    navigate("/");
  };
  const getData = async (data) => {
    try {
      const res = await sendAdminAuthReq(data.inputs);
      onresreceived(res);
      return { success: true, ...res };
    } catch (err) {
      return { success: false, message: err.message };
    }
  };

  return (
    <div>
      <Authform onSubmit={getData} isAdmin={true} />
    </div>
  );
};

export default Admin;
