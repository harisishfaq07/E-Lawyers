import react, { useEffect, useState } from "react";
import Anav from "./Anav";
import { Redirect, useHistory } from "react-router-dom";
import "./Admin.css";
import { auth, db } from "./components/firebase";
const ALawyers = () => {
  let history = useHistory();
  const [lawyers, setlawyers] = useState([]);
  const [search, setsearch] = useState("");
  const [copy, setcopy] = useState([]);

  const getlawyers = async () => {
    let data = [];
    let res = await db.collection("lawyersignup").get();
    res.forEach((resp) => {
      data.push({ ...resp.data(), docid: resp.id });
    });
    setlawyers(data);
    setcopy(data);
  };
  const remove = async (target) => {
    let docid = target.dataset.docid;
    try {
      await db.collection("lawyersignup").doc(docid).delete();
      window.alert("user deleted !");
      window.location.reload();
    } catch (error) {
      window.alert("error !");
    }
  };
  const filter = () => {
    let res = lawyers.filter((data) => {
      if (data.name.includes(search)) return data;
    });
    setcopy(res);
  };
  useEffect(() => {
    getlawyers();
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

      
      <div className="col-12 justify-content-end mt-2" >
        <span style={{ width: "fit-content" }} className="ms-auto">
          <button
            onClick={() => {
              setcopy(lawyers);
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
            <th scope="col">Lawyer ID</th>
            <th scope="col">Specialist</th>
            <th scope="col">Name</th>
            <th scope="col">Contact</th>
            <th scope="col">Remove</th>
          </tr>
        </thead>
        <tbody>
          {copy.length > 0 ? (
            copy.map((data, i) => {
              return (
                <tr>
                  <th scope="row">{i + 1}</th>
                  <td>{data.email}</td>
                  <td>{data.speciality}</td>
                  <td>
                    {/* <button className="btn btn-dark w-50"> Profile</button> */}
                    {data.name}
                  </td>
                  <td>
                    <button
                      data-lawyerid={data.lawyeruid}
                      className="btn btn-dark table__btn"
                      onClick={() => {
                        history.push("/ALcontact", data.lawyeruid);
                      }}
                    >
                      Contact
                    </button>
                  </td>
                  <td>
                    <button
                      data-lawyeruid={data.lawyeruid}
                      data-docid={data.docid}
                      className="btn btn-dark table__btn"
                      onClick={(e) => remove(e.target)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            <h3>No data Yet </h3>
          )}
        </tbody>
      </table>
      </div>
      </div>
     
    </>
  );
};
export default ALawyers;
