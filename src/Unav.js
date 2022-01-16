import react from "react";
import { useDispatch } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { auth } from "./components/firebase";
import { logOut } from "./redux/actions/Actions";

const Unav = () => {
  let history = useHistory();
const dispatch = useDispatch();
  return (
    <>
      <div>
        <nav className="navbar fixed-top navbar-expand-lg navbar-light bg">
          <div className="container-fluid">
            <NavLink className="navbar-brand clr" to="/dash">
              User's Dashboard
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
                  <NavLink className="nav-link active clr" aria-current="page" to="/Uprofile" exact activeClassName='active__link'>
                    Profile
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link active clr" aria-current="page" to="/Unotification" exact activeClassName='active__link'>
                    Notification
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link clr" to=" " exact activeClassName='active__link'>
                    Law Guide
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link clr" to="/Ucontact" exact activeClassName='active__link'>
                    Contact Admin
                  </NavLink>
                </li>
              </ul>
              <button
                className="loginbtn btnbgclr"
                onClick={() => {
                  localStorage.clear();
                  auth.signOut().then(
                    function () {
                      dispatch(logOut());
                      history.replace("/");
                      // Sign-out successful.
                    },
                    function (error) {
                      // An error happened.
                    })
                  history.replace("/");
                }}
              >
                Logout
              </button>
            </div>
          </div>
        </nav>
      </div>
      <div></div>
    </>
  );
};
export default Unav;
