import React from "react";
import { useHistory, NavLink } from "react-router-dom";
import { useState } from "react";
import "../App.css";
import "../CSS/Signup.css";
import { auth, db, storage } from "../components/firebase";
import Landfooter from "../components/Footer/Landfooter";
import LC from "../assets/imgs/LC.jpg";
import Loading from "../components/Loading";
import { useDispatch } from "react-redux";
import { logIn } from "../redux/actions/Actions";
import { useForm } from "react-hook-form";

const Signup = () => {
  // const [email, setemail] = useState("");
  // const [password, setpassword] = useState("");
  // const [CNIC, setCNIC] = useState("");
  // const [lisencenum, setlisencenum] = useState("");
  // const [usertype, setusertype] = useState("user");
  const [loading, setloading] = useState(false);
  // const [pic, setpic] = useState();
  // const [bio, setbio] = useState("");
  // const [speciality, setspeciality] = useState("Murder");
  // const [city, setcity] = useState("");
  // const [name, setname] = useState("");
  const  {register , formState:{errors} , handleSubmit , watch } = useForm();
  // const [isvalid, setisvalid] = useState(false);
  const history = useHistory();
  const [imgurl , setimgurl ] = useState(null); 
  const watchUsertype = watch(("usertype"));
  
  
  const uploadimg = async (email,selectedImg) => {
   
    const file = selectedImg[0];
    let storageref = storage.ref("varificationImages");
    let fileref = storageref.child(email).child(selectedImg[0].name);
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
         console.log(res, " url");
         setimgurl(res);

         return res;
      })
      .catch((er) => {
        window.alert("failed to uploaded");
        console.log(er, "error url");
      });
  };
  const handlesubmit = async (data) => {
    setloading(true);
    let email = data.email;
    let password = data.password;
    let cnic = data.cnic;
    let name = data.name;
    let city = data.city;
    let lisencenum = data.lisencenum;
    let usertype = data.usertype;
    let bio = data.bio;
    let speciality = data.speciality;
    let piurl ;

    // image 
    const file = data.piurl[0];
    let storageref = storage.ref("varificationImages");
    let fileref = storageref.child(email).child(data.piurl[0].name);
    await fileref
      .put(file)
      .then((res) => {
        //  console.log(res, "uploaded");
      })
      .catch((er) => {
        console.log(er, "error");
      });
    await fileref
      .getDownloadURL()
      .then( async (res) => {
        //  window.alert("image uploaded");
        //  console.log(res, " url");
      
        piurl = res;
        try {
          let result = await auth.createUserWithEmailAndPassword(email, password);
    
          if (result.user.uid) {
            if (usertype == "lawyer") {
              db.collection("lawyersignup")
                .doc(result.user.uid)
                .set({
                  email: email,
                  password: password,
                  cnic: cnic,
                  city: city,
                  name: name,
                  lisencenum: lisencenum,
                  usertype: usertype,
                  bio: bio,
                  piurl: piurl,
                  speciality: speciality,
                  lawyeruid: result.user.uid,
                })
                .then((result) => {
                  setimgurl(null);
                  setloading(false);
                  alert("lawyer created succesfully");
                  history.push("/login");
                })
                .catch((error) => {
                  setimgurl(null);
    
                  setloading(false);
                  window.alert("error ", error.message);
                });
            } else if (usertype == "user") {
              db.collection("usersignup")
                .doc(result.user.uid)
                .set({
                  email: email,
                  password: password,
                  cnic: cnic,
                  city: city,
                  name: name,
                  usertype: usertype,
                  piurl: piurl,
                  useruid: result.user.uid,
                })
                .then((result) => {
                  setimgurl(null);
    
                  setloading(false);
                  alert("user created succesfully");
                  history.push("/login");
                })
                .catch((error) => {
                  setimgurl(null);
           
                  setloading(false);
                });
            }
          }
        } catch (error) {
          alert(error.message);
          setloading(false);
        }
    
      })
      .catch((er) => {
        window.alert("failed to uploaded");
        console.log(er, "error url");
      });

    
  };

  // let a = useHistory();
  // const go = () => {
  //   a.push("/login");
  // };

  return (
    <>
      <div>
        <nav className="navbar fixed-top navbar-expand-lg navbar-light bg">
          <div className="container-fluid">
            <NavLink className="navbar-brand clr" to="/">
              E-Lawyers
            </NavLink>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent"></div>
          </div>
        </nav>
      </div>
      <div className="space"></div>
      <div className="border-primary w-100 container mt-5">
        <div className="row">
          <div className="col-md-6">
            <br /> <h2>Signup Area</h2>
            <form onSubmit={handleSubmit(handlesubmit)}>
              {/* <label>Email</label> */}
              <input
                type="email"
                className="form-control w-75 loginpage"
                autoComplete="off"
                placeholder="example@gmail.com"
                {...register('email' ,{required: "This field is required"} )}
                  
              />
              {errors?.email?.message && <div className="input__error">{ errors.email.message }</div>  }
              <br />
              {/* <label>Password</label> */}
              <input
                
                type="password"
                className="form-control w-75 loginpage"
                autoComplete="off"
                placeholder="*********"
                {...register('password' ,{required: "This field is required"} )}
               
              />
              {errors?.password?.message && <div className="input__error">{ errors.password.message }
              </div>  }
              <br />
              <input
               
                type="text"
              
                className="form-control w-75 loginpage"
                autoComplete="off"
                placeholder="CNIC 35***-*******-*"
                {...register('cnic' ,{required: "This field is required",maxLength:{value:13,message:"maximum 13 digit allowed"},pattern:{value:/^[0-9]+$/, message :"Only digit are allowed"}} )}
              />
              {errors?.cnic?.message && <div className="input__error">{ errors.cnic.message }
              </div>  }
              <br />
              <input
                
                type="text"
                
                className="form-control w-75 loginpage"
                autoComplete="off"
                placeholder="Name"
                {...register('name' ,{required: "This field is required"} )}
              />
              {errors?.name?.message && <div className="input__error">{ errors.name.message }
              </div>  }
              <br />
              <input
                
                type="text"
              
                className="form-control w-75 loginpage"
                autoComplete="off"
                placeholder="City"
                {...register('city' ,{required: "This field is required"} )}
              />
              {errors?.city?.message && <div className="input__error">{ errors.city.message }
              </div>  }
              <br />
              {watchUsertype == 'lawyer' && (
                <div>
                  <input
                  
                    type="text"
                    className="form-control w-75 loginpage"
                    autoComplete="off"
                    placeholder="6 Digit Lisence# 23***8 (only for lawyers)"
                    {...register('lisencenum' ,{required: "This field is required", maxLength: {value:6, message:"maximun 6 digit allowed"}} )}
                    
                  />
                  {errors?.lisencenum?.message && <div className="input__error">{ errors.lisencenum.message }
              </div>  }
                  <br />
                  <input
                    
                    type="text"
                    className="form-control w-75 loginpage"
                    autoComplete="off"
                    placeholder="tell about yourself.."
                    {...register('bio' ,{required: "This field is required"} )}

                  />
                  {errors?.bio?.message && <div className="input__error">{ errors.bio.message }
              </div>  }
                  <br />
                  <select
                    required
                    className="form-select w-75"
                    {...register('speciality' ,{required: "This field is required"} )}
                    
                  >
                    <option value="Murder">Murder</option>
                    <option value="Rape">Rape</option>
                    <option value="Crime">Crime</option>
                    <option value="Theft">Theft</option>
                  </select>
                  {errors?.speciality?.message && <div className="input__error">{ errors.speciality.message }
                    </div> }
                  <br />
                </div>
              ) }
              <input
                type="file"
                className="form-control w-75 loginpage"
                autoComplete="off"
                {...register('piurl' ,{required: "This field is required"} )}
                accept="image/*"
              />
                  {errors?.piurl?.message && <div className="input__error">{ errors.piurl.message }
                    </div> }
              <br />
              {/* Radio Button Section */}
              <h4>I am a?</h4>
              <div className="displayline">
                <div className="form-check">
                  <input
                    value="lawyer"
                    className="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault1"
                    {...register('usertype' ,{required: "This field is required"} )}
                  
                  />
                  <label className="form-check-label" htmlFor="flexRadioDefault1">
                    Lawyer
                  </label>
                </div>
                <div className="form-check mrgnleft">
                  <input
                    
                    value="user"
                    className="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault1"
                    {...register('usertype' ,{required: "This field is required"} )}
                  
                  />

                  <label className="form-check-label" htmlFor="flexRadioDefault2">
                    User
                  </label>
                                  </div>
                                  

              </div>
              {errors?.usertype?.message && <div className="input__error">{ errors.usertype.message }
                    </div> }
              {/* Outer div of radio buttons */}
              <br />
              <br />
              <button  type="submit" className="loginbtn">
                Signup
              </button>
              <br />
              <h5 className="mt-2">OR Already Member</h5>
              <button  className="loginbtn">
                Login
              </button>
              <br />
              <br />
            </form>
          </div>
          <div className="col-md-6">
            <img src={LC} className="w-100 imgborder" />
          </div>
        </div>
      </div>
      <Landfooter />
      {loading && <Loading />}
    </>
  );
};
export default Signup;
