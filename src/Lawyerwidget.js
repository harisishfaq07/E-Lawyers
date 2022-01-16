import React from 'react'
import Widget from "./Widget";

const Lawyerwidget = () => {
    return (
        <>
            <div className="container">
    <div className="carousel slide" data-ride="carousel">
        <div className="carousel-inner">
            <div className="carousel-item active">
                <div className="row">
                    <div className="col-sm"> <Widget/></div>
                    <div className="col-sm"><Widget/></div>
                    <div className="col-sm"><Widget/></div>
                </div>
            </div>
            <div className="carousel-item">
                <div className="row">
                    <div className="col-sm"><Widget/></div>
                    <div className="col-sm"><Widget/></div>
                    <div className="col-sm"><Widget/></div>
                </div>
            </div>
        </div>
    </div>
</div>
        </>
    )
}

export default Lawyerwidget
