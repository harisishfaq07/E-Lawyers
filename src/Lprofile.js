import react, { useEffect, useState } from "react";
import { useHistory, NavLink, Redirect } from "react-router-dom";
import Lnav from "./Lnav";
// import LC from "../assets/imgs/LC.jpg";
// import Landnav from "./components/Navbar/Landnav";
import "./lawyerdash.css";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { auth, db, storage } from "./components/firebase";
import { logIn } from "./redux/actions/Actions";
import { AiFillCamera } from "react-icons/ai";
import Loading from "./components/Loading";

const Lprofile = () => {
  let history = useHistory();
  const userId = useSelector(({ UserLogIn }) => {
    return UserLogIn.userId;
  });
  const userData = useSelector(({ UserLogIn }) => {
    return UserLogIn.UserData;
  });
  const [updateUser, setupdateUser] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const [matchPass, setmatchPass] = useState("");
  const dispatch = useDispatch();
  const [userImage, setuserImage] = useState("");
  const [previewImg, setpreviewImg] = useState("");
  const [loading, setloading] = useState(false);
  const [lawyerdata, setlawyerdata] = useState({
    bio: "",
    city: "",
    cnic: "",
    email: "",
    lisencenum: "",
    name: "",
    password: "",
    piurl: "",
    speciality: "",
    usertype: "",
    lawyeruid: "",
    phone: "",
    dob: "",
    paddress: "",
  });
  const [load, setload] = useState(true);
  const [valid, setisvalid] = useState(true);

  useEffect(() => {
    if (localStorage.getItem("lawyer_uid")) {
      getlawyerdata();
      auth.onAuthStateChanged((user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          var uid = user.uid;
          // ...
          let docRef = db.collection("lawyersignup").doc(uid);
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
  const getlawyerdata = async () => {
    try {
      let result = await db
        .collection("lawyersignup")
        .doc(localStorage.getItem("lawyer_uid"))
        .get();
      console.log(result.data(), "LAWYER DATA");
      setlawyerdata({
        bio: result.data().bio,
        city: result.data().city,
        cnic: result.data().cnic,
        email: result.data().email,
        lisencenum: result.data().lisencenum,
        name: result.data().name,
        piurl: result.data().piurl,
        speciality: result.data().speciality,
        usertype: result.data().usertype,
        password: result.data().password,
        lawyeruid: result.data().lawyeruid,
        phone: result.data().phone,
        dob: result.data().dob,
        paddress: result.data().paddress,
      });
      setload(false);
    } catch (error) {
      setload(false);
      window.alert("error");
    }
  };
  const uploadimg = async (e) => {
    setloading(true);
    setisvalid(false);
    const file = e.target.files[0];
    let storageref = storage.ref("lawyerImages");
    let fileref = storageref.child(lawyerdata.email).child(file.name);
    await fileref
      .put(file)
      .then((res) => {
        // console.log(res, "uploaded");
      })
      .catch((er) => {
        console.log(er, "error");
      });
    await fileref
      .getDownloadURL()
      .then((url) => {
        // window.alert("image uploaded");
        setisvalid(true);
        setlawyerdata({ ...lawyerdata, piurl: url });
        setloading(false);
        // console.log(url, "url");
      })
      .catch((er) => {
        setloading(false);
        setisvalid(false);
        window.alert("failed to uploaded");
        console.log(er, "error url");
      });
  };
  useEffect(() => {
    console.log(lawyerdata, "STATE");
  }, [lawyerdata]);
  const save = async (e) => {
    e.preventDefault();
    try {
      await db.collection("lawyersignup").doc(localStorage.getItem("lawyer_uid")).set(lawyerdata);
      dispatch(logIn(lawyerdata ,localStorage.getItem("lawyer_uid") ));
      window.alert("saved");
    } catch (error) {
      window.alert("error occured");
    }
  };
  if (!localStorage.getItem("lawyer_uid")) {
    return <Redirect to="/login" />;
  }
  if (load) {
    return  <div className=" d-flex justify-content-center align-items-center" style={{height:"100vh" , width:"100%"  }}> <h3>Loading Profile...</h3></div>;
  }
  return (
    <>
      <Lnav />
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
                              <img
                                // src={userData.userProfile && userData.userProfile}
                                src={lawyerdata.piurl}
                                style={{ width: "100%", height: "100%" }}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col d-flex flex-column flex-sm-row justify-content-between mb-3">
                          <div className="text-center text-sm-left mb-2 mb-sm-0">
                            <h4 className="pt-sm-2 pb-1 mb-0 text-nowrap">
                             {userData.name ? userData.name : "Lawyer.n"}
                            
                            </h4>
                            <p className="mb-0">
                              @ {userData.name ? userData.name : "Lawyer.n"}{" "}
                              {/* {lawyerdata.name ? lawyerdata.name : "Lawyer.n"} */}
                            </p>

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
                          <form onSubmit={save}>
                            <div className="row">

                              {/* <div className="col"> */}
                                {/* <div className="row"> */}
                                  <div className="col-md-4">
                                    <div className="mb-3">
                                      <label className="form-label">Full Name</label>
                                      <input
                                        className="form-control"
                                        type="text"
                                        placeholder="ABCD"
                                        // {...register("name")}
                                        value={lawyerdata.name}
                                        onChange={(e) =>
                                          setlawyerdata({ ...lawyerdata, name: e.target.value })
                                        }
                                      />
                                    </div>
                                  </div>
                                  <div className="col-md-4">
                                  <div className="mb-3">
                                      <label className="form-label">DOB</label>
                                      <input
                                        className="form-control"
                                        type="date"
                                        value={lawyerdata.dob}
                                        onChange={(e) =>
                                          setlawyerdata({ ...lawyerdata, dob: e.target.value })
                                        }
                                      />
                                    </div>
                                  </div>
                                  <div className="col-md-4">
                                  <div className="mb-3">
                                      <label className="form-label">
                                      Speciality 
                                      </label>
                                      <input
                                        value={lawyerdata.speciality}
                                        name="sp"
                                        className="form-control "
                                      />
                                    </div>
                                  </div>
                                {/* </div> */}
                                <br />
                                <div className="row">
                                  <div className="col-6">
                                  <div className="mb-3">
                                      <label className="form-label">CNIC N0.</label>
                                      <input
                                      disabled
                                        className="form-control"
                                        type="text"
                                        placeholder="35000-0000000-0"
                                        value={lawyerdata.cnic}
                                      />
                                    </div>
                                  </div>

                                  <div className="col-6">
                                  <div className="mb-3">
                                      <label className="form-label">
                                        City
                                      </label>
                                      <input
                                        className="form-control"

                                        value={lawyerdata.city}
                                        onChange={(e) =>
                                          setlawyerdata({ ...lawyerdata, city: e.target.value })
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
                                        value={lawyerdata.paddress}
                                        onChange={(e) =>
                                          setlawyerdata({ ...lawyerdata, paddress: e.target.value })
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
                                        {...register("email")}
                                        disabled
                                      />
                                    </div>
                                  </div>
                                  <div className="col">
                                  <div className="mb-3">
                                      <label className="form-label">Phone No.</label>
                                      
                                      <input
                                        className="form-control"
                                        name="phone"
                                        id="phone"
                                        value={lawyerdata.phone}
                                        onChange={(e) =>
                                          setlawyerdata({ ...lawyerdata, phone: e.target.value })
                                        }
                                      />
                                    </div>
                                  </div>
                                </div>
                                <br />
                                <div className="row">
                                 
                                  <div className="col mb-3">
                                    <div className="form-group">
                                      <label>About</label>
                                      <textarea
                                        className="form-control"
                                        rows="5"
                                        placeholder="My Bio"
                                        value={lawyerdata.bio}
                                        onChange={(e) =>
                                          setlawyerdata({ ...lawyerdata, bio: e.target.value })
                                        }
                                      ></textarea>
                                      
                                    </div>
                                  </div>
                                </div>
                                <br />
                              {/* </div> */}
                            </div>
                            <div className="row d-none">
                              <div className="col-12 col-sm-6 mb-3">
                                <div className="mb-2">
                                  <b>Change Password</b>
                                </div>
                                <div className="row">
                                  <div className="col">
                                    <div>{matchPass}</div>
                                    <div className="form-group">
                                      <label>Current Password</label>
                                      <input
                                        className="form-control"
                                        type="password"
                                        placeholder="••••••"
                                        {...register("current_pass")}
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col">
                                    <div className="form-group">
                                      <label>New Password</label>
                                      <input
                                        className="form-control"
                                        type="password"
                                        placeholder="••••••"
                                        {...register("new_pass")}
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col">
                                    <div className="form-group">
                                      <label>
                                        Confirm <span className="d-none d-xl-inline">Password</span>
                                      </label>
                                      <input
                                        className="form-control"
                                        type="password"
                                        placeholder="••••••"
                                        {...register("confirm_pass")}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                    
                            </div>
                            <div className="row">
                              <div className="col d-flex justify-content-end">
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
                <div className="card mb-3">
                  <div className="card-body">
                    <div className="px-xl-3">
                      <button className="btn btn-block btn-secondary">
                        <i className="fa fa-sign-out"></i>
                        <span>Privacy Policy</span>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-body">
                    <h6 className="card-title font-weight-bold">Support</h6>
                    <p className="card-text">Get fast, free help from Admin</p>
                    <button type="button" className="btn btn-primary" onClick={()=>{history.push("/Lcontact")}}>
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

export default Lprofile;
