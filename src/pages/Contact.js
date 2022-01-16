import React from 'react'
import "../CSS/contact.css";
import Landnav from '../components/Navbar/Landnav'
import Landfooter from "../components/Footer/Landfooter";
import { useState } from 'react';
import { db } from '../components/firebase';
import about1 from "../assets/imgs/about1.png";
import { useHistory } from 'react-router-dom';
import LC from "../assets/imgs/LC.jpg";

const Contact = () => {
    const [name, setname] = useState("");
    const [email, setemail] = useState("");
    const [phone, setphone] = useState("");
    const [message, setmessage] = useState("");
    const history = useHistory();
    const handlesubmit=(e)=>{
        e.preventDefault();
        console.log(name,email,phone,message);
       if(true)
       { db.collection("contact").add({  
            name:name,
            email:email,
            phone:phone,
            message:message
        }
       
        ) 
    alert("Your msg send Successfully");
    if(alert){
        history.push("/")
    }else{
        console.log("error")
    }
}else{
            console.log("error");
        }
    }
    return (
        <>
        <Landnav/>   
        <div className="container mb-5">
            <div className="row margint">
            <div className="col-md-6 ">
            <form onSubmit={handlesubmit}>
              <h2>Contact us</h2>  
             <br/>
             <input type="text" className="form-control w-75" placeholder="your name" value={name} onChange={(e)=>{setname(e.target.value)}}/><br/><br/>
             {/* <label>Email</label><br/> */}
             <input type="email" className="form-control w-75" placeholder="example@gmail.com" value={email} onChange={(e)=>{setemail(e.target.value)}}/><br/><br/>
             {/* <label>Phone#</label><br/> */}
             <input type="tel" className="form-control w-75" placeholder="03000000000" value={phone} onChange={(e)=>{setphone(e.target.value)}}/><br/><br/>
             {/* <label>Message</label><br/> */}
             <textarea type="text" className="form-control w-75" placeholder="Enter Your message" value={message} onChange={(e)=>{setmessage(e.target.value)}}/><br/><br/>
             <button type="submit" className="btnset">Send</button>
            </form>
            </div>
            <div className="col-md-6">
                <img src={LC} className="w-100 imgborder"/>
            </div>
            </div>
        </div>
            <Landfooter/>
        </>
    )
}

export default Contact
