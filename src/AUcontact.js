import react from "react";
import Anav from "./Anav";
import { NavLink, Redirect, useHistory } from "react-router-dom";

const AUcontact = () => {
  let history = useHistory();
  if (!localStorage.getItem("admin_uid")) {
    return <Redirect to="/login" />;
  }
  return (
    <>
      <Anav />
      <br />
      <br />
      <br />
      <br />
      <h2 className="center">Send Message to User</h2>
      <section className="bb">
        <div className="row margint">
          <div>
            <form>
              <h2>Send Message</h2>
              <br />
              <select className="form-control w-50">
                <option selected>Default</option>
                <option>Warning 1</option>
                <option>Warning 2</option>
                <option>Other</option>
              </select>
              <br />
              <textarea
                type="text"
                className="form-control w-75 height"
                placeholder=" Enter Your message..."
              />
              <br />
              <button
                type="submit"
                className="btn btn-dark w-25"
                onClick={() => {
                  alert("Message sent");
                  if (alert) {
                    history.push("/Auser");
                  }
                }}
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default AUcontact;
