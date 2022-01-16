import React from 'react'
import { Link } from 'react-router-dom';
import "./Footer.css";
import { FaFacebook , FaInstagram, FaTwitter, FaVoicemail, FaYoutube } from 'react-icons/fa';
import {MdEmail, MdLocationCity,MdAddCall} from "react-icons/md";
import "./Landfooter.css";


const Footer = () => {
    return (
        
	<>
	<div className="footer">
	<p className="footer-heading">
		E-Lawyers
	</p>
	<div className="container">
		<div className="row">

		<div className="col-md-6 col-sm-12 col-lg-3 ">
			<h3>Social Media</h3>
			<Link to="#" className="textnone fb">
			<i >	
				<FaFacebook/> 
			</i>
			</Link>
			


			<Link to="#" className="textnone insta">
			<i >	
				<FaInstagram/>	
			</i>
			</Link>
			<Link to="#" className="textnone twit">
			<i >	
				<FaTwitter/>
			</i>
			</Link>
			<Link to="#" className="textnone yt">
			<i >
				<FaYoutube/>
			</i>
			</Link>
		</div>

		<div className="col-md-6 col-sm-12 col-lg-3">
			<h3>About Us</h3>
			<Link to="/about" className="textnone">About Company</Link><br/>
			<Link to="#" className="textnone">Terms of Services</Link><br/>
			<Link to="#" className="textnone">Privacy Policy</Link>
		</div>
		<div className="col-md-6 col-sm-12 col-lg-3">
			<h3>Join Us</h3>
			<Link to="/signup" className="textnone">Register as Lawyer</Link><br/>
			<Link to="/signup" className="textnone">Register as User</Link> <br/>
			<Link to="/login" className="textnone">Login</Link> 
		</div>
		<div className="col-md-6 col-sm-12 col-lg-3 text-decoration-none">
			<h3>Contacts</h3>
			<Link to="/contact" className="textnone">Contact Us</Link> <br/>
			<Link to="#" className="textnone "><MdEmail/> Support@Elawyers.com</Link> <br/> 
			<Link to="#" className="textnone"><MdLocationCity/> Main Head Office :Akhlas Plaza office no. 07 G-10 Lahore</Link> <br/> 
			<Link to="#" className="textnone"><MdAddCall/> +93 300 12345678</Link>
		</div>
		
		</div>
		<p className="copyright">Copyright E-Lawyers © 2021. All rights reserved.</p>
	 </div>
</div>
 </>
    )
}

export default Footer;
