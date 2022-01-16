import react from "react";
import { useHistory } from "react-router-dom";
import "./Userdash.css";
const Widget = ({ data }) => {
  let history = useHistory();
  return (
    <>
      <div className="our-team mb-4">
        <div className="pic">
          <img src={data.picurl} />
        </div>
        <div className="team-content">
          <h3 className="title mb-2">{data.name}</h3>
          {/* <div className="row m-2">
          <div className="col-4  mb-2 text-start">Name:</div>
            <div className="col-8 mb-2 text-start">{data.name}</div>
            <div className="col-4  mb-2 text-start">Speciality:</div>
            <div className="col-8 mb-2 text-start">{data.spciality}</div>
            <div className="col-4  mb-2 text-start">City:</div>
            <div className="col-8 mb-2 text-start">{data.city}</div>
            <div className="col-4  mb-2 text-start">Bio:</div>
            <div className="col-8 mb-2 text-start">{data.bio.slice(0,20)}...</div>
          </div> */}
          <span className="post mb-2">Speciality: {data.spciality}</span>
          <span className="post mb-2">City: {data.city}</span>
          <span className="post mb-2">{data.email}</span>
          <h6><b>Bio</b></h6>
          <p className="post">{data.bio.slice(0,20)}...</p>
          <br />
          <button
            className="btn btn-outline-dark w-75"
            data-lawyeruid={data.lawyeruid}
            onClick={(e) => {
              history.push("/uappointment", e.target.dataset.lawyeruid);
            }}
          >
            Make an Appointment
          </button>
        </div>
        {/* <ul className="social">
          <li>
            <a href="#" className="fa fa-envelope"></a>
          </li>
        </ul> */}
      </div>
    </>
  );
};
export default Widget;
