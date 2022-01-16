import React, { useEffect, useState } from "react";
import Lnav from "./Lnav";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import LC from "./assets/imgs/LC.jpg";
import { db } from "./components/firebase";
import { Redirect } from "react-router-dom";

export default function Lcontact() {
  const [state, setstate] = useState({ issue: "", message: "", from: "Lawyer", email: "" });
  const [data, setdata] = useState(false);
  let history= useHistory();
  const sendmessage = () => {
    return new Promise(async (res, rej) => {
      console.log(state, "IN 2ND FN");
      await db
        .collection("messagefromlawyer")
        .add({ ...state, lawyeruid: localStorage.getItem("lawyer_uid") });
      res("sent");
    });
  };
  const main = async () => {
    await sendmessage();
    console.log(state);
    console.log("ALL DONE");
    window.alert("message sent!");
  };
  const handlesubmit = async (e) => {
    e.preventDefault();
    console.log("started");
    await sendmessage();
    console.log(state);
    console.log("ALL DONE");
    window.alert("message sent!");
    if(alert){
      history.push("/lawyer");
    }
  
    
    
  };
  useEffect(() => {
    if (localStorage.getItem("lawyer_uid")) {
      db.collection("varifiedUsers")
        .doc(localStorage.getItem("lawyer_uid"))
        .get()
        .then((res) => {
          setstate({ ...state, email: res.data().email });
          setdata(true);
        });
    }
  }, []);
  if (!localStorage.getItem("lawyer_uid")) {
    return <Redirect to="/login" />;
  }
  return (
    <>
      <Lnav />
      <div className="container mb-5">
        <div className="row margint">
          <div className="col-md-6 ">
            <form onSubmit={handlesubmit}>
              <h2>Contact us</h2>
              <br />
              <select
                required
                name="issue"
                value={state.issue}
                onChange={(e) => setstate({ ...state, [e.target.name]: e.target.value })}
                className="form-control w-50"
              >
                <option value="" selected>
                  Select Issue
                </option>
                <option value="system report">System Report</option>
                <option value="client report">Client Report</option>
                <option value="other">Other</option>
              </select>{" "}
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
                <h3 style={{ color: "black" }}>loading</h3>
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
