import React, { useEffect } from "react";
import { useHistory, NavLink, Link } from "react-router-dom";
// import Dashboard from "./Dashboard";
import "../App.css";
import { auth, db } from "../components/firebase";
import { useState } from "react";
import "../CSS/Login.css";
import Landfooter from "../components/Footer/Landfooter";
import LC from "../assets/imgs/LC.jpg";
import { useDispatch } from "react-redux";
import { logIn } from "../redux/actions/Actions";
import Loading from "../components/Loading";

// import Signup from "./Signup";
// let validate=true;
const Login = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const dispatch = useDispatch();
  const [loading, setloading] = useState(false);
  const [found, setfound] = useState(false);
  let history = useHistory();
  const go = () => {
    history.push("/signup");
  };
  const checkuser = async () => {
    try {
      let result = await auth.signInWithEmailAndPassword(email, password);
      if (!result.user) {
        console.log("no user found");
        return false;
      }
      let user = await db.collection("usersignup").doc(result.user.uid).get();
      if (user.exists) {
        setfound(true);
        console.log(user.data());
        localStorage.setItem("user_uid", result.user.uid);
        localStorage.setItem("access_token", result.user.uid);
        localStorage.setItem("role", "user");

        dispatch(logIn(user.data(),result.user.uid ))
        history.replace("/dash");
        return true;
      }
      if (!user.exists) {
        console.log("no user");
        return false;
      }
    } catch (error) {
      console.log(error, "catched");

      return false;
    }
  };
  const checkadmin = async () => {
    try {
      let result = await auth.signInWithEmailAndPassword(email, password);
      if (!result.user.uid) {
        console.log("no user");

        return false;
      }
      if (result.user.uid) {
        let admin = await db.collection("admin").doc(result.user.uid).get();
        if (admin.exists) {
          console.log(admin.data());
          localStorage.setItem("admin_uid", result.user.uid);
          localStorage.setItem("access_token", result.user.uid);
          localStorage.setItem("role", "admin");

          
          setfound(true);
          history.replace("/Adash");
          return true;
        }
        if (!admin.exists) {
          console.log("no admin found");
          return false;
        }
      }
    } catch (error) {
      console.log(error, "catched");
      return false;
    }
  };
  const checklawyer = async () => {
    try {
      let result = await auth.signInWithEmailAndPassword(email, password);
      let lawyer = await db.collection("lawyersignup").doc(result.user.uid).get();
      if (lawyer.exists) {

      //  console.log(lawyer, "i am lawyer");
    //     docRef
    //       .get()
    //       .then((doc) => {
    //         if (doc.exists) {
    //           let data = doc.data();
    //           dispatch(logIn(data, result.user.uid));
    //           setloading(false);
    //           if (data.usertype === "user") {
    //             history.push("/dash");
    //             localStorage.setItem("user_uid", result.user.uid);

        setfound(true);
        console.log(lawyer.data());
        console.log(" success admin");
        localStorage.setItem("lawyer_uid", result.user.uid);
        localStorage.setItem("access_token", result.user.uid);
        localStorage.setItem("role", "lawyer");


        
        history.replace("/lawyer");
        return true;
      }
      if (!lawyer.exists) {
        console.log("no lawyer");
        return false;
      }
      if (!result.user) {
        console.log("no user");
        return false;
      }
    } catch (error) {
      console.log(error, "catched");
      return false;
    }
  };
  const handlesubmit = async (e) => {
    e.preventDefault();
    setloading(true);
    setfound(false);
    console.log("checking admin");
    let p1 = await checkadmin();
    if (p1) {
      setloading(false);
      return;
    }
    let p2 = await checkuser();
    if (p2) {
      setloading(false);
      return;
    }
    let p3 = await checklawyer();
    if (p3) {
      setloading(false);
      return;
    }
    if (!found) {
      setloading(false);
      window.alert("invalid email/password or user doesn't exist!");
    }
    // p1.then((res) => {
    //   console.log(res, "p1");
    // });
    // p2.then((res) => {
    //   console.log(res, "p2");
    // });
    // p3.then((res) => {
    //   console.log(res, "p3");
    // });
    console.log("ALL");
    // console.log(" admin checked");
    // console.log("checking user");
    // await checkuser();
    // console.log("user checked");
    // console.log("checking lawyer");
    // await checklawyer();
    // console.log(" lawyer checked");
    // try {
    //   const result = await auth.signInWithEmailAndPassword(email, password);
    //   if (result.user.uid) {
    //     setloading(true);
    //     let docRef = db.collection("lawyersignup").doc(result.user.uid);
    //     docRef
    //       .get()
    //       .then((doc) => {
    //         if (doc.exists) {
    //           let data = doc.data();
    //           dispatch(logIn(data, result.user.uid));
    //           setloading(false);
    //           if (data.usertype === "user") {
    //             history.push("/dash");
    //             localStorage.setItem("user_uid", result.user.uid);
    //           } else {
    //             localStorage.setItem("lawyer_uid", result.user.uid);
    //             history.push("/lawyer");
    //           }
    //         } else {
    //           setloading(false);
    //           signin();
    //           // doc.data() will be undefined in this case
    //           console.log("No such document!");
    //         }
    //       })
    //       .catch((error) => {
    //         setloading(false);

    //         console.log("Error getting document:", error);
    //       });
    //   }
    // } catch (error) {
    //   alert(error.message);
    // }
  };
  // const signin = async () => {
  //   let res = await auth.signInWithEmailAndPassword(email, password);
  //   // localStorage.setItem("user_uid", res.user.uid);
  //   localStorage.setItem("user_uid", res.user.uid);
  //   history.push("/dash");
  // };
  // useEffect(() => {
  //   // localStorage.clear();
  //   console.log(localStorage.getItem("user_uid"));
  //   console.log(localStorage.getItem("lawyer_uid"));
  //   console.log(localStorage.getItem("admin_uid"));
  // }, []);
  return (
    <>
      <div>
        <nav className="navbar fixed-top navbar-expand-lg navbar-light bg">
          <div className="container-fluid">
            <NavLink className="navbar-brand clr" to="/">
              E-Lawyers
            </NavLink>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent"></div>
          </div>
        </nav>
      </div>
      <div className="space"></div>
      <div className="border-primary w-100 container mt-5">
        <div className="row">
          <div className="col-md-6">
            <br /> <h2 className="purple">Login Area</h2>
            <form onSubmit={handlesubmit}>
              {/* <label>Email</label> */}
              <br />
              <input
                type="email"
                className="form-control w-75 loginpage"
                autoComplete="off"
                placeholder="abcd@gmail.com"
                value={email}
                onChange={(e) => {
                  setemail(e.target.value);
                }}
              />
              <br />
              <br />
              {/* <label>Password</label> */}

              <input
                type="password"
                className="form-control w-75 loginpage"
                autoComplete="off"
                placeholder="*********"
                value={password}
                onChange={(e) => {
                  setpassword(e.target.value);
                }}
              />
              <div className="row text-end mt-2" style={{marginRight:"9rem"}}>
          <Link
            to="reset-password"
          >
            forgot password?
          </Link>
        </div>
              <button type="submit" className="loginbtn">
                Login
              </button>
              <br />
              <br />

              <h5>OR Register Here</h5>
              <br />
              <button onClick={go} className="loginbtn">
                Signup
              </button>
              <br />
              <br />
            </form>
          </div>
          <div className="col-md-6">
            <img src={LC} className="w-100 imgborder" />
          </div>
        </div>
      </div>
      <Landfooter />
      {loading && <Loading />}
    </>
  );
};
export default Login;
