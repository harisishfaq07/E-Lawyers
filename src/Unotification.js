import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import { db } from "./components/firebase";
import Unav from "./Unav";
import "./Userdash.css";

export default function Unotification() {
  const [notif, setnotif] = useState();

  const getdata = async () => {
    let result = [];
    let resp = await db
      .collection("notification")
      .doc(localStorage.getItem("user_uid"))
      .collection("mynotifs")
      .get();
    resp.forEach((data) => {
      result.push({ ...data.data(), docid: data.id });
    });
    setnotif(result);
  };
  useEffect(() => {
    console.log(localStorage.getItem("user_uid"), "UID LOCAL");
    if (localStorage.getItem("user_uid")) {
      getdata();
    }
  }, []);
  useEffect(() => {
    console.log(notif, "notfi");
  }, [notif]);
  if (!localStorage.getItem("user_uid")) {
    return <Redirect to="/login" />;
  }
  return (
    <>
      <Unav />

      <div className="space"></div>
      <div className="space"></div>
      <h2 className="center">Notifications</h2>
      {/* <div scope="space"></div> */}

      {/* <div scope="space"></div> */}

      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Lawyer</th>
            <th scope="col">Email</th>
            <th scope="col">Note</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {notif ? (
            notif.map((data, i) => {
              return (
                <tr key={i}>
                  <th scope="row">{i + 1}</th>
                  <td>{data.lawyername}</td>
                  <td>{data.lawyeremail}</td>

                  <td>{data.lawyernote}</td>
                  <td>{data.status}</td>
                </tr>
              );
            })
          ) : (
            <h3>No data yet</h3>
          )}
        </tbody>
      </table>
    </>
  );
}
