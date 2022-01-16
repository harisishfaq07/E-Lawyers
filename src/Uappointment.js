import React, { useEffect, useState } from "react";
import Unav from "./Unav";
import { Redirect, useHistory } from "react-router-dom";
import { db } from "./components/firebase";

export default function Uappointment() {
  let history = useHistory();
  console.log(history.location.state, "state");
  const [appointment, setappointment] = useState({
    name: "",
    time: "",
    date: "",
    note: "",
    status: "pending",
    lawyername: "",
    lawyeremail: "",
    lawyernote: "pending",
    userid: localStorage.getItem("user_uid"),
  });
  const change = (k, v) => {
    setappointment({ ...appointment, [k]: v });
  };
  const admininfo = async () => {
    let admin = await db
      .collection("lawyersignup")
      .where("lawyeruid", "==", history.location.state);
    let d = await admin.get();
    d.forEach((e) => {
      setappointment({ ...appointment, lawyeremail: e.data().email, lawyername: e.data().name });
      //   console.log(e.data(), "lawyer");
    });
  };
  const Req = async () => {
    console.log(history.location.state);
    console.log(appointment);
    await db
      .collection("Appointments")
      .doc(history.location.state)
      .collection("requests")
      .add(appointment);
    console.log("done");
    await db
      .collection("notifications")
      .doc(localStorage.getItem("user_uid"))
      .collection("created")
      .add(appointment);
    console.log("done");
    alert("Appointment Request send");
    history.push('/dash');
  };
  useEffect(() => {
    if (localStorage.getItem("user_uid")) {
      admininfo();
    }
  }, []);
  useEffect(() => {
    console.log(localStorage.getItem("user_uid"), "user session");
    console.log(appointment, "appointment data");
  }, [appointment]);
  if (!localStorage.getItem("user_uid")) {
    return <Redirect to="/login" />;
  }
  return (
    <>
      <Unav />
      <br />
      <br />

      <br />
      <br />
      <br />
      <br />
      <h2 className="center">Make an Appointment Request</h2>
      {/* form pt-5 pb-5 */}
      <section class="b">
        <div className="row">
          <div className="col">
            <input
              name="name"
              value={appointment.name}
              onChange={(e) => change(e.target.name, e.target.value)}
              className="form-control "
              type=" text"
              placeholder="Enter Your Name"
            />
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col">
            <label>Time: </label>
            <input
              name="time"
              value={appointment.time}
              onChange={(e) => change(e.target.name, e.target.value)}
              className="form-control w-75"
              type="time"
            />
          </div>
          <div className="col">
            <label>Date: </label>
            <input
              name="date"
              value={appointment.date}
              onChange={(e) => change(e.target.name, e.target.value)}
              className="form-control w-75"
              type="date"
            />
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col">
            <textarea
              name="note"
              value={appointment.note}
              onChange={(e) => change(e.target.name, e.target.value)}
              type="text"
              placeholder="Type Your Note"
              className="form-control w-100 h"
            ></textarea>
          </div>
        </div>
        <br />
        {
          (appointment.lawyeremail,
          appointment.lawyeremail ? (
            <button className="btn btn-dark w-25" onClick={Req}>
              Request Appointment
            </button>
          ) : (
            <h3>Loading</h3>
          ))
        }
      </section>
    </>
  );
}
