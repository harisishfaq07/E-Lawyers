import react from "react";
import { NavLink, useHistory } from "react-router-dom";
import { auth } from "./components/firebase";
import { logOut } from "./redux/actions/Actions";

const Anav = () => {
  let history = useHistory();
  const logout = () => {
    localStorage.clear();
    history.replace("/");
  };
  return (
    <>
      <div>
        <nav className="navbar fixed-top navbar-expand-lg navbar-light bg">
          <div className="container-fluid">
            <NavLink className="navbar-brand clr" to="/Adash">
              Admin's Dashboard
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
                  <NavLink className="nav-link clr" to="/ALawyer" activeClassName='active__link'>
                    Lawyers List
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link clr" to="/Auser" activeClassName='active__link'>
                    Users List
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link clr" to="/Admincontact" activeClassName='active__link'>
                    Queries
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link clr" to="/verificationreq" activeClassName='active__link'>
                    Verification Requests
                  </NavLink>
                </li>
              </ul>

              <button
                className="loginbtn btnbgclr"
                onClick={() => {
                  logout();
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
export default Anav;
