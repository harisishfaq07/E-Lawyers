import React from 'react'
import SC from "../src/assets/imgs/SC.jpg"
import LHC from "../src/assets/imgs/LHC.jpg"
import PCA from "../src/assets/imgs/PCA.png"
import FIA from "../src/assets/imgs/FIA.jpg"
import "./CSS/Slider.css";
export const Slider = () => {
    return (
        <div className="setbg">
        <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
  <div className="carousel-inner slidersizing">
    <div className="carousel-item active">
      <img src={SC} className="d-block" alt="Supreme Court"/>
    </div>
    <div className="carousel-item">
        {/* <a href="https://www.google.com/"> */}
      <img src={LHC} className="d-block" alt="High Court Lahore"/>
      {/* </a> */}
    </div>
    <div className="carousel-item">
      <img src={FIA} className="d-block" alt="FIA Complaints"/>
    </div>
    <div className="carousel-item">
      <img src={PCA} className="d-block" alt="Police Criminal Records"/>
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>
        
        </div>
    )
}
