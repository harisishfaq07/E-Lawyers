import React from 'react'
// import about1 from "../assets/imgs/about1.png";
import about2 from "../assets/imgs/about2.png";
import "../CSS/About.css"
import Landnav from '../components/Navbar/Landnav';
import Landfooter from '../components/Footer/Landfooter';
import "../Main.css"

const About = () => {
    return (
        <>
            
            <Landnav/>
           {/* Section Two in about */}
        
           <div className="aboutsection2 container-fluid mt-5">
            <div className="row">
            <div className="col-md-4">
                <img src={about2} className="imgabout2"/> 
                </div>
                <div className="col-md-8 ">
                <h4 className="padtop">About Us</h4>
                <p className="p-3">E-Lawyer is Private Limited Platrform and an initiative by innovative 
Barristers who also happen to love IT and are committed to the idea 
of integrating law with technology. It is a tech startup, run by legal
 professionals who believe that legal services should be affordable, 
simple and available to more people than ever before. Every day, at Ask
 Wakeel we spend our time and resources making it easier for people to
 get the legal help they need, so they can focus on what's really 
important—taking care of their families and building strong businesses.
 We combine free legal documents and free legal information with access
 to affordable representation by licensed lawyers. Our commitment to 
affordable and accessible legal services is at the heart of everything 
we do. We provide opportunity to potential clients to connect with 
Expert Askwakeel team members who not only give them excellent customer
 satisfaction experience but help them in their legal matters. 
We ensure that our Expert Askwakeel team members are all Pakistan Bar 
Council verified lawyers who adhere to our ethos of client satisfaction
 and provide client satisfaction oriented services. We also undertake 
strict scrutiny of their credentials. At Askwakeel, you can be assured 
that the advice you receive is advice which is being dispensed by a 
qualified barrister or lawyer. We welcome complaints and are happy to
 refund fee where the client is not happy with the services received.</p>
                </div>  
            </div>
           </div>
           <div className="aboutsection1 container">
            <div className="row ">
                <div className="col-md-6">
                <h4 data-text="Mission" className="h9">Mission</h4>
                <p>”E-Lawyers mission is to given quality services 24/7 with the help of those who are expert in their field”</p>
                </div>
                <div className="col-md-6">
                <h4 data-text="Vision" className="h9">Vision</h4>
                <p>”We believe in bridging the gap between legal experts and members of general public who seek professional advice.”</p>
                </div>
            </div>
           </div>
            <Landfooter/>
        </>
    )
}

export default About
