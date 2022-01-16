import react, { useState } from "react";
import Anav from "./Anav";
import { NavLink, Redirect, useHistory } from "react-router-dom";
import { db } from "./components/firebase";

const ALcontact = () => {
  const [state, setstate] = useState({ from: "admin", type: "default", message: "" });
  let history = useHistory();
  let lawyeruid = history.location.state;
  console.log(history.location.state);
  const sendmessage = async (e) => {
    e.preventDefault();
    console.log(state);
    try {
      let result = await db
        .collection("messagesbyadmin")
        .doc(lawyeruid)
        .collection("messages")
        .add(state);
      console.log("sent");
      window.alert("message sent");
    } catch (error) {
      console.log(error, "CATCH");
      window.alert("error");
    }
    console.log("done");
  };
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
      <h2 className="center">Send Message to Lawyer</h2>
      <section className="bb">
        <div className="row margint">
          <div>
            <form onSubmit={sendmessage}>
              <h2>Send Message</h2>
              <br />
              <select className="form-control w-50">
                <option selected>From Admin</option>
              </select>
              <br />
              <select
                required
                name="select"
                value={state.type}
                onChange={(e) => setstate({ ...state, type: e.target.value })}
                className="form-control w-50"
              >
                <option value="default" selected>
                  Default
                </option>
                <option value="warning 1">Warning 1</option>
                <option value="warning 2">Warning 2</option>
                <option value="other">Other</option>
              </select>{" "}
              <br />
              <textarea
                required
                name="message"
                value={state.message}
                onChange={(e) => setstate({ ...state, message: e.target.value })}
                type="text"
                className="form-control w-75 height"
                placeholder=" Enter Your message..."
              />
              <br />
              <button type="submit" className="btn btn-dark w-25">
                Send
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default ALcontact;
