import React, { useEffect } from "react";
import { useState } from "react";
import { Redirect } from "react-router-dom";
import { db } from "./components/firebase";
import Lnav from "./Lnav";

const Lmessages = () => {
  const [state, setstate] = useState([]);
  const getmessages = async () => {
    let msg = [];
    let result = await db
      .collection("messagesbyadmin")
      .doc(localStorage.getItem("lawyer_uid"))
      .collection("messages")
      .get();
    result.forEach((data) => {
      msg.push(data.data());
    });
    setstate(msg);
    if (result.empty) {
      console.log("no data yet");
    }
  };
  useEffect(() => {
    if (localStorage.getItem("lawyer_uid")) {
      getmessages();
    }
  }, []);
  if (!localStorage.getItem("lawyer_uid")) {
    return <Redirect to="/login" />;
  }
  return (
    <div>
      <Lnav />
      <div className="mb-3">
        <table className="table table-striped mt-5">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">From</th>
              <th scope="col">Type</th>
              <th scope="col">Message</th>
            </tr>
          </thead>
          <tbody>
            {state.length > 0 ? (
              state.map((data, i) => {
                return (
                  <tr>
                    <th scope="row">{i + 1}</th>
                    <td>admin</td>
                    <td>{data.type}</td>
                    <td>{data.message}</td>
                  </tr>
                );
              })
            ) : (
              <h3>No data yet</h3>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Lmessages;
