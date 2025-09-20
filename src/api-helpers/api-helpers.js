import axios from "axios";

const URL = `https://ticketbooking-backend-2rg6.onrender.com/`; //`http://localhost:8080/`; // ; //
export const getallmovies = async () => {
  const res = await axios.get(`${URL}movies`).catch((err) => console.log(err));

  console.log(res);
  if (res.status !== 200) {
    return console.log("No data");
  }
  const resdata = await res.data;
  return resdata;
};

export const sendUserAuthReq = async (data, signup) => {
  try {
    const res = await axios.post(`${URL}user/${signup ? "signup" : "login"}`, {
      name: signup ? data.name : "",
      email: data.email,
      password: data.password,
    });
    return res.data; // ✅ only return on success
  } catch (err) {
    // ✅ throw error so .catch() in component works
    throw err.response?.data || { message: "User auth failed" };
  }
};
export const UserUpdate = async (payload) => {
  try {
    console.log("update", payload);
    const { id, ...data } = payload;
    const res = await axios.put(`${URL}user/${id}`, {
      ...data,
    });
    return res.data; // ✅ only return on success
  } catch (err) {
    // ✅ throw error so .catch() in component works
    throw err.response?.data || { message: "User auth failed" };
  }
};

export const sendAdminAuthReq = async (data) => {
  try {
    const res = await axios.post(`${URL}admin/login`, {
      email: data.email,
      password: data.password,
    });
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Admin auth failed" };
  }
};

export const getallmoviedetails = async (id) => {
  const res = await axios.get(`${URL}movie/${id}`).catch((err) => console.log(err));
  const resdata = await res.data;
  console.log("moviedetails", res.data.movies);
  return resdata;
};

export const newbooking = async (data) => {
  console.log(data);
  const res = await axios
    .post(`${URL}booking/create`, {
      ...data,
      user: localStorage.getItem("userid"),
    })
    .catch((err) => console.log(err));
  if (res.status !== 201 && res.status !== 200) {
    return console.log("unexpected error occured");
  }
  const resdata = await res.data;
  return resdata;
};

export const getbookings = async () => {
  let id = localStorage.getItem("userid");
  const res = await axios.get(`${URL}user/getusersbooking/${id}`).catch((err) => console.log(err));

  if (res.status !== 201) {
    return console.log("unexpected error occured");
  }

  const resdata = await res.data;
  return resdata;
};

export const deletebooking = async (id) => {
  const res = await axios.delete(`${URL}booking/delete/${id}`).catch((err) => console.log(err));

  if (res.status !== 200 && res.status !== 201) {
    return console.log("unexpected err");
  }
  const resdata = await res.data;
  return resdata;
};

export const getUserDetails = async () => {
  const id = localStorage.getItem("userid");
  const res = await axios.get(`${URL}user/${id}`).catch((err) => console.log(err));

  const resdata = await res.data;
  return resdata;
};
export const getTheatres = async () => {
  //const id = localStorage.getItem("userid");
  const res = await axios.get(`${URL}theatres/`).catch((err) => console.log(err));
  const resdata = await res.data;
  return resdata;
};
export const addmovie = async (data) => {
  const res = await axios
    .post(
      `${URL}movie/create`,
      {
        title: data.title,
        description: data.description,
        releasedate: data.releasedate,
        posterurl: data.posterurl,
        featured: data.feautured,
        actors: data.actors,
        admin: localStorage.getItem("adminId"),
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
    .catch((err) => console.log(err));

  const resData = await res.data;
  return resData;
};

export const getAdminbyId = async () => {
  const adminId = localStorage.getItem("adminId");
  const res = await axios.get(`${URL}admin/${adminId}`).catch((err) => console.log(err));
  console.log(res);
  const resdata = await res.data;
  return resdata;
};
