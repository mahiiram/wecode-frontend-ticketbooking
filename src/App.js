import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Homepage from "./components/Homepage";
import Movies from "./components/Movies/Movies";
import Admin from "./components/Admin/Admin";
import Auth from "./components/Auth/Auth";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { adminAction, userAction } from "./store";
import Booking from "./components/Bookings/Booking";
import UserProfile from "./profile/UserProfile";
import Addmovies from "./components/Movies/Addmovies";
import AdminProfile from "./profile/AdminProfile";
import { Toaster } from "react-hot-toast";

function App() {
  const dispatch = useDispatch();
  const isAdminLoggedIn = useSelector((state) => state.admin.isLoggedIn);
  const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);
  console.log("isadminLoggedin", isAdminLoggedIn);
  console.log("isUserLoggedIn", isUserLoggedIn);

  useEffect(() => {
    if (localStorage.getItem("userid")) {
      dispatch(userAction.login());
    } else if (localStorage.getItem("adminId")) {
      dispatch(adminAction.login());
    }
  }, []);
  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />
      <Header />
      <section>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/movies" element={<Movies />} />
          {!isUserLoggedIn && !isAdminLoggedIn && (
            <>
              {" "}
              <Route path="/admin" element={<Admin />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/movie-booking/:id" element={<Booking />} />
            </>
          )}
          {isUserLoggedIn && !isAdminLoggedIn && (
            <>
              {" "}
              <Route path="/user" element={<UserProfile />} />
              <Route path="/movie-booking/:id" element={<Booking />} />
            </>
          )}
          {!isUserLoggedIn && isAdminLoggedIn && (
            <>
              {" "}
              <Route path="/add" element={<Addmovies />} />
              <Route path="/adminprofile" element={<AdminProfile />} />
            </>
          )}
        </Routes>
      </section>
    </div>
  );
}

export default App;
