import React, { useEffect } from "react";
import Footer from "../components/Footer/Landfooter";
import Navbar from "../components/Navbar/Navbar";
import Udash from "../Udash";
import Unav from "../Unav";
import View from "../View";
import { NavLink, Redirect } from "react-router-dom";
const UserDashboard = () => {
  useEffect(() => {
    console.log(localStorage.getItem("user_uid"), "USER UID local");
  }, []);
  if (!localStorage.getItem("user_uid")) {
    return <Redirect to="/login" />;
  }
  return (
    <>
      <Unav />
      <div className="space"></div>
      <Udash />

      <div className="space"></div>
      <div className="space"></div>
      <h2 className="center">Choose your Lawyer</h2>
      <hr className="width" />
      <div className="space"></div>
      {/* <h2 className="txt">Lawyers</h2> */}

      <View />
    </>
  );
};

export default UserDashboard;
