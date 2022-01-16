import react from "react";
import Anav from "./Anav";

const Addadmin =()=>{
    return(
        <>
        <div className="space"></div>
        <Anav/>
        <div  className="center"> <h1>Add Admin</h1></div>
        
        <div className="b">
            <input type="text" placeholder="Enter Name"/><br/><br/>
            <input type="Email" placeholder="example@gmail.com"/><br/><br/>
            <input type="Password" placeholder="***"/>
            <br/><br/>
            <button className="btn btn-dark w-25">Add Admin</button>


        </div>
        
        </>
    );
}

export default Addadmin;