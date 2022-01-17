import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, NavLink, Redirect } from "react-router-dom";
import { auth, db, storage } from "./components/firebase";
import Loading from "./components/Loading";
import "./lawyerdash.css";
import { logIn } from "./redux/actions/Actions";
import Unav from "./Unav";
import { AiFillCamera } from "react-icons/ai";

const Uprofile = () => {
  let history = useHistory();
  const { register, handleSubmit, reset } = useForm();
  const [matchPass, setmatchPass] = useState("");
  const [userImage, setuserImage] = useState("");
  const [previewImg, setpreviewImg] = useState("");
  const [loading, setloading] = useState(false);
  const [valid, setisvalid] = useState(true);
  const userData = useSelector(({ UserLogIn }) => {
    return UserLogIn.UserData;
  });

  const dispatch = useDispatch();
  const [userdata, setuserdata] = useState({
    city: "",
    cnic: "",
    email: "",
    name: "",
    password: "",
    piurl: "",
    usertype: "",
    useruid: "",
    phone: "",
    dob: "",
    paddress: "",
  });
  const [load, setload] = useState(true);
  const save = async (e) => {
    e.preventDefault();
    try {
      await db.collection("usersignup").doc(localStorage.getItem("user_uid")).set(userdata);
      dispatch(logIn(userdata ,localStorage.getItem("user_uid") ));
      window.alert("saved");
    } catch (error) {
      window.alert("error occured");
    }
  };
  const uploadimg = async (e) => {
    setisvalid(false);
    const file = e.target.files[0];
    let storageref = storage.ref("userImages");
    let fileref = storageref.child(userdata.email).child(file.name);
    await fileref
      .put(file)
      .then((res) => {
        console.log(res, "uploaded");
      })
      .catch((er) => {
        console.log(er, "error");
      });
    await fileref
      .getDownloadURL()
      .then((res) => {
        window.alert("image uploaded");
        setisvalid(true);
        setuserdata({ ...userdata, piurl: res });
        console.log(res, "url");
      })
      .catch((er) => {
        setisvalid(false);
        window.alert("failed to uploaded");
        console.log(er, "error url");
      });
  };

  const getuserdata = async () => {
    try {
      let result = await db.collection("usersignup").doc(localStorage.getItem("user_uid")).get();
      console.log(result.data(), "USER DATA");
      setuserdata({
        city: result.data().city,
        cnic: result.data().cnic,
        email: result.data().email,
        name: result.data().name,
        piurl: result.data().piurl,
        usertype: result.data().usertype,
        password: result.data().password,
        useruid: result.data().useruid,
        phone: result.data().phone,
        dob: result.data().dob,
      });
      console.log(result, "db");
      setload(false);
    } catch (error) {
      console.log(error);
      setload(false);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("user_uid")) {
      getuserdata();
      auth.onAuthStateChanged((user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          var uid = user.uid;
          // ...
          let docRef = db.collection("usersignup").doc(uid);
          docRef
            .get()
            .then((doc) => {
              if (doc.exists) {
                let data = doc.data();
                reset(data);
                dispatch(logIn(data, uid));
              } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
              }
            })
            .catch((error) => {
              console.log("Error getting document:", error);
            });
        } else {
          // User is signed out
          // ...
        }
      });
    }
  }, []);
  // useEffect(() => {
  //   console.log(userdata, "STATE");
  // }, [userdata]);
  if (!localStorage.getItem("user_uid")) {
    return <Redirect to="/login" />;
  }
  if (load) {
    return  <div className=" d-flex justify-content-center align-items-center" style={{height:"100vh" , width:"100%"  }}> <h3>Loading Profile...</h3></div>;
  }
  return (
    <>
      <Unav />
      <div className="space"></div>
      <div className="container">
        <div className="row flex-lg-nowrap">
          <div className="col">
            <div className="row">
              <div className="col mb-3">
                <div className="card">
                  <div className="card-body">
                    <div className="e-profile">
                      <div className="row">
                        <div className="col-12 col-sm-auto mb-3">
                          {/* style1={"width: 140px;"} */}
                          <div className="mx-auto style1">
                            {/* style2={"height: 140px; background-color: rgb(233, 236, 239);"} */}
                            <div
                              className="d-flex justify-content-center border border-primary align-items-center rounded style2"
                              style={{ width: "150px", height: "150px" }}
                            >
                              {/* style3={"color: rgb(166, 168, 170); font: bold 8pt Arial;"} */}
                              <img src={userdata.piurl} style={{ width: "100%", height: "100%" }} />
                            </div>
                          </div>
                        </div>
                        <div className="col d-flex flex-column flex-sm-row justify-content-between mb-3">
                          <div className="text-center text-sm-left mb-2 mb-sm-0">
                            <h4 className="pt-sm-2 pb-1 mb-0 text-nowrap">{userData.name}</h4>
                            <p className="mb-0">@ {userData.name}</p>
                            <div className="mt-2">
                                        <label
                                          for="formFile"
                                          className="form-label  upload__img--btn"

                                        >
                                          {" "}
                                          <h6> Upload Photo</h6>{" "}
                                        </label>

                                        <input
                                          class="form-control"
                                          type="file"
                                          id="formFile"
                                          accept="image/*"
                                          // onChange={handleChangeImg}
                                          onChange={uploadimg}
                                          style={{ display: "none" }}
                                        />
                                        </div>
                          </div>
                           <div className="text-center text-sm-right">
                             
                          </div> 
                        </div>
                      </div>
                      <ul className="nav nav-tabs">
                        <li className="nav-item">
                          <a href="" className="active nav-link">
                            Make Profile
                          </a>
                        </li>
                      </ul>
                      <div className="tab-content pt-3">
                        <div className="tab-pane active">
                          <form
                            //  onSubmit={handleSubmit(onSubmit)}
                            onSubmit={save}
                          >
                            {/* <div className="row"> */}
                              {/* <div className="col"> */}
                                <div className="row">
                                  
                                  
                                {/* </div> */}
                                <div className="row">
                                <div className="col-md-6">
                                  <div className="mb-3">
                                      <label className="form-label">Full Name</label>
                                      <input
                                        className="form-control"
                                        type="text"
                                        name="name"
                                        placeholder="ABCD"
                                        value={userdata.name}
                                        onChange={(e) =>
                                          setuserdata({ ...userdata, name: e.target.value })
                                        }
                                      />
                                    </div>
                                  </div>
                                <div className="col-md-6">
                                  <div className="mb-3">
                                      <label className="form-label">DOB</label>
                                      <input
                                        className="form-control"
                                        type="date"
                                        value={userdata.dob}
                                        onChange={(e) =>
                                          setuserdata({ ...userdata, dob: e.target.value })
                                        }
                                      />
                                    </div>
                                  </div>
                                  <div className="col-md-6">
                                  <div className="mb-3">
                                      <label className="form-label">CNIC N0.</label>
                                    <input
                                      className="form-control"
                                      type="tel"
                                      placeholder="35000-0000000-0"
                                      value={userdata.cnic}
                                      
                                    />
                                    </div>

                                  </div>
                                  
                                  <div className="col-md-6">
                                  <div className="mb-3">
                                      <label className="form-label">
                                      City
                                      </label>
                                      <input
                                        className="form-control"
                                        value={userdata.city}
                                        onChange={(e) =>
                                          setuserdata({ ...userdata, city: e.target.value })
                                        }
                                      />
                                    </div>
                                  </div>
                                </div>
                                <br />
                                <div className="row">
                                  
                                  <div className="col">
                                    <div className="mb-3">
                                      <label className="form-label">Permanent Address</label>
                                      <input
                                        className="form-control"
                                        type="text"
                                        placeholder="Your Permanent Address."
                                        value={userdata.paddress}
                                        onChange={(e) =>
                                          setuserdata({ ...userdata, paddress: e.target.value })
                                        }
                                      />
                                    </div>
                                  </div>
                                </div>
                                <br />
                                <div className="row">
                                  <div className="col">
                                  <div className="mb-3">
                                      <label className="form-label">Email</label>
                                      <input
                                        className="form-control"
                                        type="text"
                                        placeholder="user@example.com"
                                        value={userdata.email}
                                        disabled
                                      />
                                    </div>
                                  </div>
                                  <div className="col">
                                  <div className="mb-3">
                                      <label className="form-label">Phone No.</label>
                                      <input
                                        autoComplete={false}
                                        className="form-control"
                                        type="text"
                                        placeholder="0300-0000000"
                                        value={userdata.phone}
                                        onChange={(e) =>
                                          setuserdata({ ...userdata, phone: e.target.value })
                                        }
                                      />
                                    </div>
                                  </div>
                                </div>
                                <br />
                                
                                <br />
                              {/* </div> */}
                            </div>
                           
                            <div className="row" style={{paddingRight:"1.5rem"}}>
                              <div className="col mt-3 d-flex justify-content-end ">

                                <button disabled={!valid} className="btn btn-primary" type="submit">
                                  Save Changes
                                </button>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-12 col-md-3 mb-3">
                {/* <div className="card mb-3">
                  <div className="card-body">
                    <div className="px-xl-3">
                      <button className="btn btn-block btn-secondary">
                        <i className="fa fa-sign-out"></i>
                        <span>Privacy Policy</span>
                      </button>
                    </div>
                  </div>
                </div> */}
                <div className="card">
                  <div className="card-body">
                    <h6 className="card-title font-weight-bold">Support</h6>
                    <p className="card-text">Get fast, free help from our friendly assistants.</p>
                    <button type="button" className="btn btn-primary" onClick={()=>history.push("/Ucontact")}>
                      Need Help?
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {loading && <Loading />}
    </>
  );
};

export default Uprofile;
