import React from 'react'
// import {useHistory} from 'react-router-dom';
import "./Main.css";
import logo from "./assets/imgs/logo.png";
import Landnav from './components/Navbar/Landnav';
import Landfooter from './components/Footer/Landfooter'

export const Main = () => {
    // let history= useHistory();
    
    
    return(
    <>
    {/* <Landnav/> */}
    
    <br/><br/>
    <div className=" main__image--container  ">
        <div className=" frame">
        <img src={logo} className='header__img'/>
        </div>
    </div>

    {/* <div className="space"></div> */}

    <div className="bod">
    <div className="row">
    <h2 data-text="E~lawyers" className="h2">E~lawyers</h2>
    </div>
    </div>
    <br/>
   
    {/* <Landfooter/> */}
    
    </>
        
    );
}

