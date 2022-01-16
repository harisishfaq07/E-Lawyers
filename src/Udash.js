import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import LC from "./assets/imgs/LC.jpg";
import { db } from "./components/firebase";
import "./Userdash.css";

const Udash = () => {
  const userData = useSelector(({ UserLogIn }) => {
    return UserLogIn.UserData;
  });
  return (
    <>
      <div className="container mb-5">
        <div className="row margint">
          <div className="col-md-6 color">
            <br />
            <br />
            <br />
            <br />
            <br />
            <h1 className="btn btn-dark">Welcome Mr.{userData?.name}</h1>
            {/* <p>Thankyou for Joining us. 
           We hope you find your best experience here.</p> */}
            <div>
              <br />
              <h2>Find the best lawyer According to your problem</h2>

              {/* <select className="search">
                <option selected value="All">
                  All
                </option>
                <option value="Rape">Rape</option>
                <option value="Murder">Murder</option>
                <option value="Crime">Crime</option>
                <option value="Theft">Theft</option>
              </select>
              <br />
              <br />
              <button type="button" class="btn btn-outline-dark searcbtn">
                Search
              </button> */}
            </div>
          </div>
          <div className="col-md-6">
            <br />
            <img src={LC} className="w-100 imgborder" />
          </div>
        </div>
      </div>
    </>
  );
};
export default Udash;
