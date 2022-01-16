import React from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { logOut } from "./redux/actions/Actions";
import { auth } from "./components/firebase";
import { useHistory } from "react-router-dom";
import "./lawyerdash.css";


function Lnav() {
  const dispatch = useDispatch();
  const history = useHistory();
  const LogOutUser = () => {
    localStorage.clear();
    // dispatch(logOut());
    auth.signOut().then(
      function () {
        dispatch(logOut());
        history.replace("/");
        // Sign-out successful.
      },
      function (error) {
        // An error happened.
      }
    );
  };
  return (
    <>
      <div>
        <nav className="navbar fixed-top navbar-expand-lg navbar-light bg">
          <div className="container-fluid">
            <NavLink className="navbar-brand clr" to="/lawyer">
              Lawyer's Dashboard
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
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <NavLink className="nav-link active clr" exact to="/lawyer-profile" activeClassName='active__link'>
                    Profile
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link clr" to="/Lappoint" exact activeClassName='active__link'>
                    Appointment Requests
                  </NavLink>
                </li>
                
                <li>
                  <div className=" lnav-btn-container">
                    <li className="nav-item">
                      <NavLink className="nav-link clr" to="/Lcontact" exact activeClassName='active__link'>
                        Contact Admin
                      </NavLink>
                    </li>
                  </div>
                </li>
                <li>
                  <div className=" lnav-btn-container">
                    <li className="nav-item">
                      <NavLink className="nav-link clr" to="/Lmessages" exact activeClassName='active__link'>
                        Admin Messages
                      </NavLink>
                    </li>
                  </div>
                </li>
              </ul>
              <button type="button" className="loginbtn btnbgclr" onClick={LogOutUser}>
                Logout
              </button>
            </div>
          </div>
        </nav>
      </div>

      <div></div>
    </>
  );
}

export default Lnav;
