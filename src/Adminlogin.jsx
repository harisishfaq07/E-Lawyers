import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import { auth } from "./components/firebase";

const Adminlogin = () => {
  const [state, setstate] = useState({ email: "", password: "" });
  const history = useHistory();
  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      await auth.signInWithEmailAndPassword(state.email, state.password).then((res) => {
        if (res.user.uid == "TSw2dCP2uMgiZnB4E1rW9UesBYo2") {
          localStorage.setItem("admin_uid", res.user.uid);
          history.replace("/Adash");
        } else if (res.user.uid !== "TSw2dCP2uMgiZnB4E1rW9UesBYo2") {
          window.alert("you are not an admin");
        }
      });
    } catch (error) {
      window.alert(error.message);
    }
  };
  const forgot = () => {
    auth
      .sendPasswordResetEmail("hamidashiq37@gmail.com")
      .then((res) => {
        window.alert("Password reset Email has been sent");
      })
      .catch((er) => {
        window.alert("error");
        console.log(er);
      });
  };

  if (localStorage.getItem("admin_uid")) {
    return <Redirect to="/Adash" />;
  }
  return (
    <div className="h-100 w-100">
      <div className="container-fluid h-100">
        <div className="d-flex h-100 align-items-center justify-content-center">
          <form onSubmit={handlesubmit} className="w-100">
            <div className="col w-100 h-100 align-items-center justify-content-center">
              <div className="mx-auto w-50 row" style={{ marginTop: "30vh" }}>
                <span>
                  <h2>Admin Login</h2>
                </span>
                <label className="form-label  " htmlFor="email">
                  Email
                </label>
                <input
                  name="email"
                  onChange={(e) => setstate({ ...state, email: e.target.value })}
                  value={state.email}
                  required
                  className="form-control w-75 m-2"
                  type="email"
                  id="email"
                />
              </div>
              <div className="mx-auto w-50 row">
                <label className="form-label  " htmlFor="password">
                  Password
                </label>
                <input
                  name="password"
                  onChange={(e) => setstate({ ...state, password: e.target.value })}
                  required
                  className="form-control w-75 m-2"
                  type="password"
                  id="password"
                />
              </div>
            </div>
            <div className="mx-auto w-50 row justify-content-start ps-2">
              <button type="submit" className="btn btn-primary mt-4 w-25">
                Login
              </button>
            </div>
            <div className="mx-auto w-50 row justify-content-start ps-2"></div>
          </form>
        </div>
        <div className="row justify-content-center">
          <button
            onClick={forgot}
            style={{ width: "fit-content" }}
            type="button"
            className="btn btn-sm btn-warning p-1 mt-4"
          >
            forgot password?
          </button>
        </div>
      </div>
    </div>
  );
};

export default Adminlogin;
