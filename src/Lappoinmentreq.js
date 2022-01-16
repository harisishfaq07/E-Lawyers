import React, { useEffect, useState } from "react";
import { NavLink, Redirect } from "react-router-dom";
import { db } from "./components/firebase";
import Lnav from "./Lnav";

const Lappoinmentreq = () => {
  const [notif, setnotif] = useState({});
  const [reqs, setreqs] = useState();
  const getlawyer = async () => {
    let res = await db.collection("lawyersignup").doc(localStorage.getItem("lawyer_uid")).get();
    console.log(res.data());
  };
  const getreq = async () => {
    console.log(localStorage.getItem("lawyer_uid"), "LOOCAL");
    let data = [];
    let res = await db
      .collection("Appointments")
      .doc(localStorage.getItem("lawyer_uid"))
      .collection("requests")
      .get();
    res.forEach((resp) => {
      console.log(resp.data(), "data");
      data.push({ ...resp.data(), docid: resp.id });
    });
    setreqs(data);
    console.log(reqs, "reqqq");
  };
  const send = async (target) => {
    console.log(localStorage.getItem("lawyer_uid"));
    let doc = await db
      .collection("Appointments")
      .doc(localStorage.getItem("lawyer_uid"))
      .collection("requests")
      .doc(target.dataset.docid)
      .get();
    setnotif({ ...doc.data() });
    console.log(doc.data(), "Appointments");
    if (doc.exists) {
      let newdata = {
        ...doc.data(),
        ["status"]: document.getElementById(target.dataset.select).value,
        ["lawyernote"]: document.getElementById(target.dataset.textarea).value,
      };
      await db
        .collection("notification")
        .doc(doc.data().userid)
        .collection("mynotifs")
        .add(newdata);
      console.log("done");
      window.alert("success");
      document.getElementById(target.dataset.textarea).value="";
    }
  };
  const manage = async (target) => {
    //create notification in db here
    console.log(target.dataset.docid);
    console.log(target.dataset.userid);
    console.log(document.getElementById(target.dataset.select).value);
    console.log(document.getElementById(target.dataset.textarea).value);
    send(target);
  };
  useEffect(() => {
    console.log(localStorage.getItem("lawyer_uid"), " admin uid LOCAL ");
    console.log(localStorage.getItem("user_uid"), "user uid LOCAL");
    if (localStorage.getItem("lawyer_uid")) {
      getreq();
      getlawyer();
    }
  }, []);
  if (!localStorage.getItem("lawyer_uid")) {
    return <Redirect to="/login" />;
  }
  return (
    <>
      <Lnav />
      <div className="space"></div>
      <h2 className="center mt-5">Appointment Requests</h2>
      <br />
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Time</th>
            <th scope="col">Date</th>
            <th scope="col">Note</th>
            <th scope="col">Approve/Reject</th>
            <th scope="col">Comment</th>
            <th scope="col">Submit</th>
          </tr>
        </thead>
        <tbody>
          {reqs ? (
            reqs.map((data, i) => {
              return (
                <tr key={i}>
                  <th scope="row">1</th>
                  <td>{data.name}</td>
                  <td>{data.time}</td>
                  <td>{data.date}</td>
                  <td>{data.note}</td>
                  <td>
                    <select id={`${i}select`}>
                      <option value="approve">Approve</option>
                      <option value="reject">Reject</option>
                    </select>
                  </td>
                  <td>
                    <textarea id={`${i}textarea`} type="text"></textarea>
                  </td>
                  <td>
                    <button
                      data-select={`${i}select`}
                      data-userid={data.userid}
                      data-textarea={`${i}textarea`}
                      data-docid={data.docid}
                      type="button"
                      onClick={(e) => manage(e.target)}
                      className="btn btn-outline-dark "
                    >
                      Submit
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            <h3>No data yet!</h3>
          )}
        </tbody>
      </table>
    </>
  );
};

export default Lappoinmentreq;
