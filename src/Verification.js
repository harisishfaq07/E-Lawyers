import react, { useEffect, useState } from "react";
import { useHistory, NavLink, Redirect } from "react-router-dom";
import { auth, db, storage } from "./components/firebase";

const Verification = () => {
  // const [uid, setuid] = localStorage.getItem("uid");
  const [data, setData] = useState({
    cnic: "",
    cnic_pic_url: "",
    lisence_pic_url: "",
    lisence: "",
    email: "",
    uid: localStorage.getItem("lawyer_uid"),
  });
  const [isuploading, setisuploading] = useState(false);
  const [varifiedusers, setverifiedusers] = useState();
  const [valid, setisvalid] = useState(false);
  let history = useHistory();
  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const updateDb = () => {
    let uid = localStorage.getItem("lawyer_uid");
    let varifyRef = db.collection("varification");
    varifyRef
      .doc(uid)
      .set({
        cnic: data.cnic,
        lisence: data.lisence,
        cnic_pic_url: data.cnic_pic_url,
        lisence_pic_url: data.lisence_pic_url,
        email: data.email,
        uid: data.uid,
      })
      .then((res) => {
        console.log(res, "res");
      })
      .catch((er) => {
        console.log(er, "error");
      })
      .finally(() => {
        alert("Wait until Admin Approve your documents.");
        if(alert){
          history.replace("/login");
        }
        
      });
  };
  const handleChange = async (e) => {
    try {
      let uid = localStorage.getItem("lawyer_uid");
      setisuploading(true);
      const file = e.target.files[0];
      console.log(file.name);
      let storageref = storage.ref("varificationImages");
      let fileref = storageref.child(uid).child(file.name);
      await fileref.put(file);
      setData({ ...data, [e.target.name]: await fileref.getDownloadURL() });
      setisuploading(false);
      window.alert("image uploaded");
    } catch (error) {
      setisuploading(false);
      window.alert("error");
    }
  };
  const getvarifiedusers = () => {
    let varified = [];
    db.collection("varifiedUsers")
      .get()
      .then((doc) => {
        doc.forEach((doc) => {
          console.log(doc.data(), "docc");
          varified.push(doc.data());
        });
        setverifiedusers(varified);
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  };
  const getdata = (uid) => {
    let docRef = db.collection("lawyersignup").doc(uid);
    docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          let dataa = doc.data();
          setData({ ...data, email: dataa.email });
          console.log(dataa.email, "data");
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  };
  useEffect(() => {
    let uid = localStorage.getItem("lawyer_uid");
    console.log(uid, "uid");
    console.log(auth.currentUser, "user");
    if (localStorage.getItem("lawyer_uid")) {
      getdata(uid);
      getvarifiedusers();
    }
  }, []);
  useEffect(() => {
    if (varifiedusers) {
      varifiedusers.forEach((user) => {
        console.log(user.uid);
        if (user.uid == localStorage.getItem("lawyer_uid")) {
          console.log(user.uid, "VERIFIED USER");
          setisvalid(true);
        }
      });
    }
  }, [varifiedusers]);
  if (!localStorage.getItem("lawyer_uid")) {
    return <Redirect to="/login" />;
  } else if (valid) {
    return <Redirect to="/dash" />;
  }
  return (
    <>
      <div>
        <nav className="navbar fixed-top navbar-expand-lg navbar-light bg">
          <div className="container-fluid">
            <NavLink className="navbar-brand clr" to="/lawyer">
              Back
            </NavLink>
            {/* <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button> */}
            <div className="collapse navbar-collapse" id="navbarSupportedContent"></div>
          </div>
        </nav>
      </div>

      <br />
      <br />
      <br />
      <div className="center">
        <h1>Verify yourSelf</h1>
      </div>
      <form className="verify">
        <input
          disabled={isuploading ? true : false}
          name="cnic"
          value={data.cnic}
          onChange={(e) => setData({ ...data, cnic: e.target.value })}
          className="form-control w-50 center margin"
          type="text"
          placeholder="CNIC no."
        />
        <br />
        <input
          disabled={isuploading ? true : false}
          name="cnic_pic_url"
          onChange={handleChange}
          className="form-control w-50 center margin"
          type="file"
          placeholder="Upload CNIC Photo"
        />
        <br />
        <input
          disabled={isuploading ? true : false}
          name="lisence"
          value={data.lisence}
          onChange={(e) => setData({ ...data, lisence: e.target.value })}
          className="form-control w-50 center margin"
          type="tel"
          placeholder="Enter your Lisence no"
        />
        <br />
        <input
          disabled={isuploading ? true : false}
          name="lisence_pic_url"
          onChange={handleChange}
          className="form-control w-50 center margin "
          type="file"
          placeholder="Uplaod your Lisence"
        />
        <br />
        <br />

        <button type="button" className="loginbtn" onClick={updateDb}>
          Verify
        </button>
      </form>
      <br />
      <br />
      {/* <button className="loginbtn" onClick={()=>{history.push("./lawyer")}}>Back</button> */}
    </>
  );
};

export default Verification;
