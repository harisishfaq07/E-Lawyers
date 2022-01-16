import React from 'react'
import { Link } from 'react-router-dom';
import "./Footer.css";
import { FaFacebook , FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';


const Footer = () => {
    return (
        
	<>
	<div className="footer">
	<p className="footer-heading">
		E-Lawyers Hire Highly proffessional Lawyer for Yourself
	</p>
	<div className="container">
		<div className="row">
		<div className="col-md-6 col-sm-12 col-lg-3 ">
			<h2>About Us</h2>
			<Link to="#">Aim</Link><br/>
			<Link to="#">Vision</Link><br/>
			<Link to="#">Testimonials</Link>
		</div>
		<div className="col-md-6 col-sm-12 col-lg-3">
			<h2>Services</h2>
			<Link to="#">Writing</Link><br/>
			<Link to="#">Internships</Link> <br/>
			<Link to="#">Coding</Link> <br/>
			<Link to="#">Teaching</Link> 
		</div>
		<div className="col-md-6 col-sm-12 col-lg-3">
			<h2>Contact Us</h2>
			<Link to="#">Uttar Pradesh</Link> <br/>
			<Link to="#">Ahemdabad</Link> <br/> 
			<Link to="#">Indore</Link> <br/>
			<Link to="#">Mumbai</Link>
		</div>
		<div className="col-md-6 col-sm-12 col-lg-3">
			<h2>Social Media</h2>
			<Link to="#" className="icondecor">
			<i>	
				<FaFacebook/> 	
			</i>
			</Link>
			<Link to="#" className="icondecor">
			<i style={{ marginLeft: "15px" }}>	
				<FaInstagram/>	
			</i>
			</Link>
			<Link to="#" className="icondecor">
			<i style={{ marginLeft: "15px" }}>	
				<FaTwitter/>
			</i>
			</Link>
			<Link to="#" className="icondecor">
			<i style={{ marginLeft: "15px" }}>
				<FaYoutube/>
			</i>
			</Link>
		</div>
		</div>
		<p className="copyright">Copyright E-Lawyers © 2021. All rights reserved.</p>
	 </div>
</div>
 </>
    )
}

export default Footer;
