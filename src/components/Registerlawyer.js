import React from 'react'
import LC from "../assets/imgs/LC.jpg";
import "../CSS/registerlawyer.css";
import { useHistory } from 'react-router';

export const Registerlawyer = () => {
    const history= useHistory();

   
    return (
        <>
        {/* <div className='register__underline'></div> */}
        <div className="container mb-5 ">
            <div className="row " style={{marginTop:"-4rem"}}>
            <div className="col-md-6 pdng ">
              <div style={{display:'flex'}}>  <h4 data-text="Register" className="h9 ">Register</h4>
              <p style={{whiteSpace:"pre"}}>     </p>
              <h4 data-text="Yourself" className="h9">Yourself</h4></div> <br/>
                <button className="registerbtn pt-2 pb-2" onClick={()=>{history.push("/signup")}}>Register</button>
                
                {/* Steps section */}
                <br/><br/><br/>
                <div>
                     <h6>Step 1: Register Yourself</h6>
                     <h6>Step 2: Goto Login Area</h6>
                     <h6>Step 3: Make Your Profile And Start Using Website</h6>
                </div>
            </div>
           
            <div className="col-md-6">
                <img src={LC} className="w-100 imgborder"/>
            </div>
            </div>
        </div>    
        </>
        )
}
