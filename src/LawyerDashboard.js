import React, { useEffect, useState } from "react";
import { NavLink, Redirect, useHistory } from "react-router-dom";
import Lnav from "./Lnav";
import Ldash from "./Ldash";
import "./lawyerdash.css";
import { db } from "./components/firebase";

const LawyerDashboard = () => {
  let history = useHistory();
  const [varifiedusers, setverifiedusers] = useState();
  const [valid, setisvalid] = useState(false);

  const getvarifiedusers = async () => {
    let varified = [];
    await db
      .collection("varifiedUsers")
      .get()
      .then((doc) => {
        doc.forEach((doc) => {
          console.log(doc.data(), "docc");
          varified.push(doc.data());
        });
        setverifiedusers(varified);
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
    console.log(varifiedusers, "verified");
  };
  //   const verify = async () => {
  //     await alert("Verify yourself first");
  //     history.push("/verify");
  //   };
  useEffect(() => {
    getvarifiedusers();
  }, []);
  useEffect(() => {
    console.log(localStorage.getItem("lawyer_uid"), "ADMIN UI local");
    if (varifiedusers) {
      varifiedusers.forEach((user) => {
        console.log(user.uid);
        if (user.lawyeruid == localStorage.getItem("lawyer_uid")) {
          console.log(user.uid, "valid");
          setisvalid(true);
        }
      });
    }
  }, [varifiedusers]);
  if (!localStorage.getItem("lawyer_uid")) {
    return <Redirect to="/login" />;
  }
  if (!valid) {
    return (<>
    

      <div></div>
    <div className="space"></div>
      <h2 style={{textAlign: "center", fontSize: 50}}>Prove Your Identity</h2>
      <div className="Lborder">
        <div className="space"></div>
        <div className="space"></div>
        <h2>Verify Yourself First</h2><br/>
        
        <button className="Lbtn" onClick={() => history.push("/verify")}>
          Validate
        </button><br/><br/>
       
        <p>Note: Dear Lawyer you can not access your profile untill Admin approve your identity</p>
        <p>Please Verify Yourself First</p>
        <div className="space"></div>
      </div></>
    );
  }
  return (
    <>
      <body
      //   onLoad={verify}
      >
        <Lnav />
        <div className="space"></div>
        <Ldash />
      </body>
    </>
  );
};

export default LawyerDashboard;
