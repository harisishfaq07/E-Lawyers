import react, { useEffect, useState } from "react";
import { get } from "react-hook-form";
import { Redirect } from "react-router-dom";
import Anav from "./Anav";
import { db } from "./components/firebase";
const Admincontacts = () => {
  const [state, setstate] = useState([]);
  const getdata = async () => {
    let lmessage = new Promise(async (res, rej) => {
      let data = [];
      let result = await db.collection("messagefromlawyer").orderBy("lawyeruid").get();
      result.forEach((ress) => {
        data.push(ress.data());
      });
      console.log(data, "ALL");
      res(data);
    });
    let umessages = new Promise(async (res, rej) => {
      let data = [];
      let result = await db.collection("messagefromuser").orderBy("useruid").get();
      result.forEach((res) => {
        data.push(res.data());
      });
      res(data);
    });
    Promise.all([lmessage, umessages])
      .then((res) => {
        console.log(res, "ALL");
        let lmessages = res[0];
        let umessages = res[1];
        let data1 = [];
        let data2 = [];
        lmessages.forEach((msg) => {
          data1.push(msg);
        });

        umessages.forEach((msg) => {
          data2.push(msg);
        });
        setstate([...data1, ...data2]);
      })
      .catch((er) => {
        console.log(er, "error");
      });
  };
  useEffect(() => {
    getdata();
  }, []);
  useEffect(() => {
    console.log(state);
  }, [state]);
  if (!localStorage.getItem("admin_uid")) {
    return <Redirect to="/login" />;
  }
  return (
    <>
      <Anav />
      <div className="space"></div>
      <div className="space"></div>
      <h2 className="center">Notifications</h2>
      {/* <div scope="space"></div> */}

      {/* <div scope="space"></div> */}

      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Person</th>
            <th scope="col">Email</th>
            <th scope="col">Message</th>
          </tr>
        </thead>
        <tbody>
          {!state.length < 1 ? (
            state.map((data, i) => {
              return (
                <tr>
                  <th scope="row">{i + 1}</th>
                  <td>{data.from}</td>
                  <td>{data.email}</td>
                  <td>{data.message}</td>
                </tr>
              );
            })
          ) : (
            <h3>No data yet!</h3>
          )}

          <tr></tr>
        </tbody>
      </table>
    </>
  );
};
export default Admincontacts;
