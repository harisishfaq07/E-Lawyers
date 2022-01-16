import React, { useState } from 'react'
import { auth } from './firebase';

const ResetPassword = () => {
    const [inputEmail , setInputEmail ] = useState("");
    const [Errors , setErrors] = useState("");
    const [loading , setloading ] = useState(false);
    const style  = {
        height:"100vh",
        width:"100%"
    }

    const sendEmail = (e)=>{
        e.preventDefault();
        if(inputEmail === ""){
            setErrors("Email is required");
        }else {
            setloading(true);
            auth
            .sendPasswordResetEmail(inputEmail)
            .then((res) => {
            setloading(false);

              window.alert("Password reset Email has been sent");
              setInputEmail("");
            
            })
            .catch((er) => {
            setloading(false);
                setInputEmail("");
                window.alert("error");
              console.log(er);
            });
        }
    }
    return (
        <div className='reset__password d-flex justify-content-center align-items-center ' style={style} >
            <div className="card" style={{width:"40rem"}} >
  <div className="card-body" style={{padding:"2rem" ,}}>
    <h5 className="card-title text-center" style={{fontWeight:"bold"}}>Reset Password </h5>
    
    <form style={{ marginTop:"3rem", marginBottom:"0.2rem"}}>
    <div className="mb-3">
  <label for="exampleFormControlInput1" className="form-label">Email address</label>
  <input type="email" className="form-control p-2" id="exampleFormControlInput1" placeholder="name@example.com" value={inputEmail} onChange={(e)=>setInputEmail(e.target.value)} />
   {Errors &&  <div className='text-danger text-capitalize' > {Errors}</div>}
</div>
<button type='submit' className="btn btn-primary" disabled={loading} onClick={sendEmail}> {loading ? "Loading..." :"Send Email"}</button>

</form>

  </div>
</div>
        </div>
    )
}

export default ResetPassword
