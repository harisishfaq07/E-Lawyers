import React,{useState} from 'react'
import { db } from './firebase';
import "../CSS/Email.css";
import { useHistory } from 'react-router';

export const Email = () => {
    const [email, setemail] = useState("");
    const history=useHistory();

const handlesubmit=(e)=>{
    e.preventDefault();
    console.log(email);
    db.collection("subscribe").add({
        email: email
    })
    alert("Subscribed Successfully");
    if(alert){
        setemail("");
    }

}

    return (
        <>
        <h2 className="emailupdatelabel">Subscribe E-Lawyers For Updates</h2>
        <div className="setmail">
            <form onSubmit={handlesubmit}>
            <input type="email" value={email} placeholder="   Enter your Email" className=" setmailinput" onChange={(e)=>{setemail(e.target.value)}}></input> <br/><br/>
            <button type="submit" className="Emailsubscribe ">Subscribe</button>
            </form>
        </div>
        </>
    )
}
