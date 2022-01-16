import react from "react";
import Anav from "./Anav";
import "./Admin.css";
import { NavLink, Redirect, useHistory } from "react-router-dom";
import { useState } from "react";
import { db } from "./components/firebase";
import { useEffect } from "react";

const Auser = () => {
  let history = useHistory();
  const [users, setusers] = useState([]);
  const [copy, setcopy] = useState([]);
  const [search, setsearch] = useState("");
  const getusers = async () => {
    let data = [];
    let res = await db.collection("usersignup").get();
    res.forEach((resp) => {
      data.push({ ...resp.data(), docid: resp.id });
    });
    setusers(data);
    setcopy(data);
  };
  const remove = async (target) => {
    let docid = target.dataset.docid;
    try {
      await db.collection("usersignup").doc(docid).delete();
      window.alert("user deleted !");
      window.location.reload();
    } catch (error) {
      window.alert("error !");
    }
  };
  const filter = () => {
    let res = users.filter((data) => {
      if (data.name.includes(search)) return data;
    });
    setcopy(res);
  };
  useEffect(() => {
    getusers();
  }, []);
  if (!localStorage.getItem("admin_uid")) {
    return <Redirect to="/login" />;
  }
  return (
    <>
      <Anav />
      <div className="space"></div>
    
        <div className="col-12 justify-content-end">
          <input
            value={search}
            onChange={(e) => setsearch(e.target.value)}
            className=" srch"
            type="search"
            placeholder="Search by name"
          ></input>
          <button onClick={filter} className="btn btn-outline-dark w">
            Search
          </button>
        </div>
    
      <div className="col-12 justify-content-end mt-2"  >
        <span style={{ width: "fit-content" }} className="ms-auto">
          <button
            onClick={() => {
              setcopy(users);
            }}
            className="btn btn-outline-dark w" 
          >
            Reset
          </button>
        </span>
      </div>
      <div className="container-fluid">
      <div class="table-responsive">
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">User ID</th>
            <th scope="col">Name</th>
            <th scope="col">Contact</th>
            <th scope="col">Remove</th>
          </tr>
        </thead>
        <tbody>
          {copy.length > 0 ? (
            copy.map((user, i) => {
              return (
                <tr> 
                  <th scope="row">{i + 1}</th>
                  <td>{user.email}</td>
                  <td>
                    {user.name}
                    {/* <button
                      data-useruid={user.useruid}
                      data-docid={user.docid}
                      className="btn btn-dark w-50"
                    >
                      Profile
                    </button> */}
                  </td>
                  <td>
                    <button
                      data-useruid={user.useruid}
                      data-docid={user.docid}
                      className="btn btn-dark table__btn"
                      onClick={() => {
                        history.push("/AUcontact");
                      }}
                    >
                      Contact
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={(e) => remove(e.target)}
                      data-docid={user.docid}
                      className="btn btn-dark table__btn"
                    >
                      Remove
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
      </div>
      </div>

    </>
  );
};
export default Auser;
