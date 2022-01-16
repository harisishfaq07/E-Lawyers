import React from 'react'
import { NavLink ,useHistory} from 'react-router-dom'
import "./Navbar.css";
import "./Landnav.css";
const Landnav = () => {

  let history= useHistory();
  const handlelogin = () =>{
    history.push("/login")
  }
 
  
    return (
        <nav className="navbar fixed-top navbar-expand-lg navbar-light bg">
  <div className="container-fluid ">
    <NavLink className="navbar-brand clr" to="/" >E-Lawyers</NavLink>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
    
      <ul className="navbar-nav me-auto  mb-2 mb-lg-0">
        <li className="nav-item">
          <NavLink className="nav-link  clr" exact  to="/" activeClassName='active__link'>Home</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link clr" to="/about" exact activeClassName='active__link'>About</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link clr" to="/contact" exact activeClassName='active__link'>Contact</NavLink>
        </li>
        {/* <li className="nav-item">
          <NavLink className="nav-link clr" to="/news">News</NavLink>
        </li> */}
      </ul>;
    <button className="loginbtn btnbgclr" onClick={handlelogin}>Login</button>
      {/* <form className="d-flex">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
        <button className="btn btn-outline-success" type="submit">Search</button>
      </form> */}
    </div>
  </div>
</nav>
    )
}

export default Landnav;
