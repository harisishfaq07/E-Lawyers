import React, { useEffect, useState } from "react";
import LC from "./assets/imgs/LC.jpg";
import { db } from "./components/firebase";
import Unav from "./Unav";
import { Redirect } from "react-router-dom";
export default function Ucontact() {
  const [state, setstate] = useState({
    issue: "",
    message: "",
    from: "User",
    email: "",
  });
  const [data, setdata] = useState(false);
  const handlesubmit = async (e) => {
    e.preventDefault();
    console.log(state);
    console.log("getting user");
    console.log("sending user msg");
    let addtodb = new Promise(async (res, rej) => {
      let res1 = await db
        .collection("messagefromuser")
        .add({ ...state, useruid: localStorage.getItem("user_uid") });
      res(res1);
    })
      .then(() => {
        window.alert("message sent!");
      })
      .catch((er) => {
        window.alert("error");
      });
  };
  useEffect(() => {
    if (localStorage.getItem("user_uid")) {
      db.collection("usersignup")
        .doc(localStorage.getItem("user_uid"))
        .get()
        .then((res) => {
          // console.log(res.data());
          setstate({ ...state, email: res.data().email });
          setdata(true);
        });
    }
  }, []);
  useEffect(() => {
    console.log(state, "STAET");
  }, [state]);
  if (!localStorage.getItem("user_uid")) {
    return <Redirect to="/login" />;
  }
  return (
    <>
      <Unav />
      <div className="container mb-5">
        <div className="row margint">
          <div className="col-md-6 ">
            <form onSubmit={handlesubmit}>
              <h2>Contact us</h2>
              <br />
              <select
                value={state.issue}
                required
                name="issue"
                onChange={(e) => setstate({ ...state, [e.target.name]: e.target.value })}
                className="form-control w-50"
              >
                <option value="" selected>
                  Select Issue
                </option>
                <option value="system report">System Report</option>
                <option value="lawyer report">Lawyer Report</option>
                <option value="other">Other</option>
              </select>
              <br />
              <textarea
                required
                value={state.message}
                name="message"
                onChange={(e) => setstate({ ...state, [e.target.name]: e.target.value })}
                type="text"
                className="form-control w-75 height"
                placeholder=" Enter Your message..."
              />
              <br />
              <br />
              {data ? (
                <button type="submit" className="btnset">
                  Send
                </button>
              ) : (
                <h3 style={{ color: "black" }}>Loading</h3>
              )}
            </form>
          </div>

          <div className="col-md-6">
            <img src={LC} className="w-100 imgborder" />
          </div>
        </div>
      </div>
    </>
  );
}
