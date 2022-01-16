import react, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import LC from "./assets/imgs/LC.jpg";
import { db } from "./components/firebase";
// import "./lawyerdash.css";
const Ldash = () => {
  const [varifiedusers, setverifiedusers] = useState();
  const [valid, setisvalid] = useState(false);
  const userData = useSelector(({ UserLogIn }) => {
    return UserLogIn.UserData;
  });
  const getvarifiedusers = () => {
    let varified = [];
    db.collection("varifiedUsers")
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
  };
  useEffect(() => {
    getvarifiedusers();
  }, []);
  useEffect(() => {
    console.log(localStorage.getItem("lawyer_uid"), "local");
    if (varifiedusers) {
      varifiedusers.forEach((user) => {
        console.log(user.uid);
        if (user.lawyeruid == localStorage.getItem("lawyer_uid")) {
          console.log(user.uid);
          setisvalid(true);
        }
      });
    }
  }, [varifiedusers]);
  if (!localStorage.getItem("lawyer_uid")) {
    return <Redirect to="/login" />;
  }
  if (!valid) {
    return <h2> user is not validated</h2>;
  }
  return (
    <div className="container mb-5">
      <div className="row margint">
        <div className="col-md-6 color">
          <br />
          <br />
          <br />
          <br />
          <br />
          <h1>Welcome Mr.{userData.name}</h1>
          <p>Thank you for Joining us. We hope you find your best experience here.</p>
          {/* 
          <h1>Steps to follow:</h1>
          <h6>Step 1: Verify Yourself</h6>
          <h6>Step 2: Make Your Profile</h6>
          <h6>Step 3: Stay Tuned With Latest Updates</h6> */}
        </div>
        <div className="col-md-6">
          <br />
          <img src={LC} className="w-100 imgborder" />
        </div>
      </div>
    </div>
  );
};
export default Ldash;
