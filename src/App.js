import React from "react";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import { useState, useEffect } from "react";
import Login from "./pages/Login";
import Signup from "./pages/Singup";
import "bootstrap/dist/css/bootstrap.min.css";
import Landingpage from "./pages/Landingpage";
import UserDashboard from "./pages/UserDashboard";
import { Registerlawyer } from "./components/Registerlawyer";
import { Email } from "./components/Email";
import { News } from "./components/News";
import LawyerDashboard from "./LawyerDashboard";
import Lprofile from "./Lprofile";
import { auth } from "./components/firebase";
import { db } from "./components/firebase";
import { logIn } from "./redux/actions/Actions";
import { useDispatch } from "react-redux";
import Loading from "./components/Loading";
import Lappoinmentreq from "./Lappoinmentreq";
import View from "./View";
import Uprofile from "./Uprofile";
import Verification from "./Verification";
import Lcontact from "./Lcontact";
import Ucontact from "./Ucontact";
import Unotification from "./Unotification";
import Widget from "./Widget";
// import { Slider } from './Slider';
import Uappointment from "./Uappointment";
import Adash from "./Adash";
import Lawyerwidget from "./Lawyerwidget";
import { Main } from "./Main";
import ALawyers from "./ALawyers";
import Auser from "./Auser";
import AUcontact from "./AUcontact";
import ALcontact from "./ALcontac";
import VerificationReq from "./VerificationReq";
import Addadmin from "./AddAdmin";
import Admincontacts from "./Admincontacts";
import Lmessages from "./Lmessages";
import Adminlogin from "./Adminlogin";
import ResetPassword from "./components/ResetPassword";
import ProtectedRoutes from "./Routes/ProtectedRoutes";
// admin imports

const App = () => {
  const dispatch = useDispatch();
  const [loading, setloading] = useState(false);

  useEffect(() => {
    auth?.onAuthStateChanged((user) => {
      if (user) {
        setloading(true);

        // User is signed in, see docs for a list of available properties
        var uid = user.uid;
        // ...
        let docRef = db.collection("lawyersignup").doc(uid);
        docRef
          .get()
          .then((doc) => {
            if (doc.exists) {
              let data = doc.data();
              setloading(false);
              dispatch(logIn(data, uid));
            } else {
              setloading(false);
              // doc.data() will be undefined in this case
              console.log("No such document!");
            }
          })
          .catch((error) => {
            setloading(false);
            console.log("Error getting document:", error);
          });
      } else {
        // User is signed out
        // ...
      }
    });
  }, []);
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/news" exact component={News} />
        <Route path="/subscribe" exact component={Email} />
        <Route path="/registerlawyer" exact component={Registerlawyer} />
        <ProtectedRoutes path="/dash" exact component={UserDashboard} />
        <ProtectedRoutes path="/lawyer" exact component={LawyerDashboard} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/login" exact component={Login} />
        <Route path="/" exact component={Landingpage} />
        <ProtectedRoutes path="/Lappoint" exact component={Lappoinmentreq} />
        <Route path="/contact" exact component={Contact} />
        <Route path="/about" exact component={About} />
        <ProtectedRoutes path="/lawyer-profile" exact component={Lprofile} />
        <ProtectedRoutes path="/Lview" exact component={View} />
        <ProtectedRoutes path="/Uprofile" exact component={Uprofile} />
        <ProtectedRoutes path="/widget" exact component={Lawyerwidget} />
        <ProtectedRoutes path="/Lappoint" exact component={Lappoinmentreq} />
        <ProtectedRoutes path="/Alogin" exact component={Adminlogin} />
        <ProtectedRoutes path="/Lmessages" exact component={Lmessages} />
        <ProtectedRoutes path="/verify" exact component={Verification} />
        <ProtectedRoutes path="/Lcontact" exact component={Lcontact} />
        <ProtectedRoutes path="/Ucontact" exact component={Ucontact} />
        <ProtectedRoutes path="/Unotification" exact component={Unotification} />
        <ProtectedRoutes path="/wid" exact component={Widget} />
        <ProtectedRoutes path="/uappointment" exact component={Uappointment} />
        <Route path="/reset-password" exact component={ResetPassword} />

        {/* admin routes */}
        
        <ProtectedRoutes path="/Adash" exact component={Adash} />
        <ProtectedRoutes path="/ALawyer" exact component={ALawyers} />
        <ProtectedRoutes path="/Auser" exact component={Auser} />
        <ProtectedRoutes path="/AUcontact" exact component={AUcontact} />
        <ProtectedRoutes path="/ALcontact" exact component={ALcontact} />
        <ProtectedRoutes path="/verificationreq" exact component={VerificationReq} />
        {/* <Route path="/addadmin" exact component={Addadmin} /> */}
        <ProtectedRoutes path="/Admincontact" exact component={Admincontacts} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
