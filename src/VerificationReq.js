import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import Anav from "./Anav";
import { db } from "./components/firebase";

const VerificationReq = () => {
  const [req, setReq] = useState([]);
  const [select, setselect] = useState("approve");
  const [lawyerdata, setlawyerdata] = useState(false);
  console.log(req, "REQQ");
  const writedb = async (target, data) => {
    let varifyRef = db.collection("varifiedUsers");
    await varifyRef
      .doc(target.dataset.uid)
      .set({
        cnic: data.cnic,
        bio: data.bio,
        email: data.email,
        lawyeruid: target.dataset.uid,
        licence: data.lisencenum,
        picurl: data.piurl,
        spciality: data.speciality,
        city: data.city,
        name: data.name,
      })
      .then(() => {
        console.log("success");
        window.alert("approved");
        del(target);
      })
      .catch((er) => {
        console.log(er, "error");
      });
  };
  const del = async (target) => {
    let delref = db.collection("varification").doc(target.dataset.uid);
    await delref
       .delete()
      .then(() => {
        // console.log("success");
        setlawyerdata(!lawyerdata);
        window.alert("deleted successfully");
      })
      .catch((er) => {
        window.alert("error");
        console.log(er, "error");
      });
  };
  const varify = async (target) => {
    if (select == "approve") {
      console.log( "approve");
      console.log(target.dataset.uid, "set");
      let result = await db.collection("lawyersignup").doc(target.dataset.uid).get();
      if (result.exists) {
        console.log(result.data(), "result data");
         writedb(target, result.data());
      }
    } else if (select == "reject") {
      console.log("reject");
      let varifyRef = db.collection("varification");
      varifyRef
        .doc(target.dataset.uid)
        .delete()
        .then((res) => {
          console.log(res, "deleted");
          window.alert("Rejected");
        })
        .catch((er) => {
          window.alert("error");
          console.log(er, "error");
        });
    }
  };
  useEffect(() => {
    let data = [];
    let uid = localStorage.getItem("lawyer_uid");
    db.collection("varification")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          data.push(doc.data());
          console.log(doc.id);
        });
        setReq(data);
      });
  }, [lawyerdata]);
  if (!localStorage.getItem("admin_uid")) {
    return <Redirect to="/login" />;
  }
  return (
    <>
      <Anav />
      <div className="space"></div>
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Lawyer Email</th>
            <th scope="col">CNIC no</th>
            <th scope="col">CNIC Photo</th>
            <th scope="col">Lisence no</th>
            <th scope="col">Lisence Photo</th>
            <th scope="col">Approve/Reject</th>
            <th scope="col">Submit</th>
          </tr>
        </thead>
        <tbody>
          {!req.length < 1 ? (
            req.map((request, i) => {
              return (
                <tr>
                  <th scope="row"> {i + 1} </th>
                  <td>{request.email}</td>
                  <td>{request.cnic}</td>
                  <td>
                    <span>
                      <img src={request.cnic_pic_url} width="110px" />
                    </span>
                  </td>
                  <td>{request.lisence}</td>
                  <td>
                    <span>
                      <img src={request.lisence_pic_url} width="110px" />
                    </span>
                  </td>
                  <td>
                    <select id="select1" onChange={(e) => setselect(e.target.value)} value={select}>
                      <option value="approve">Approve</option>
                      <option value="reject">Reject</option>
                    </select>
                  </td>
                  <td>
                    <button
                      type="button"
                      onClick={(e) => varify(e.target)}
                      data-uid={request.uid}
                      className="btn btn-outline-dark "
                    >
                      Submit
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            <div>
              <h3>No requests yet</h3>
            </div>
          )}
        </tbody>
      </table>
    </>
  );
};
export default VerificationReq;
