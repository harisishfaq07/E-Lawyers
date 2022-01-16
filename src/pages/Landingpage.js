import React from 'react'
import Landfooter from '../components/Footer/Landfooter'
import Landnav from '../components/Navbar/Landnav'
import coverpic from "../assets/imgs/coverpic.jpg";
import { Slider } from '../Slider';
import "../CSS/Landingpage.css";
import { Registerlawyer } from '../components/Registerlawyer';
import { News } from '../components/News';
import { Email } from '../components/Email';
import {Main} from "../Main"


const Landingpage = () => {
    
    
    return (
          <>
           <Landnav/>
           <Main/>
           <Registerlawyer/>
           <News/>
           <Email/>
           <Landfooter/>
        </>
    )
}

export default Landingpage;
