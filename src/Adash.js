import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import Anav from "./Anav";
import { auth, db } from "./components/firebase";

const Adash = () => {
  const getinfo = async () => {
    try {
      let resp = await db.collection("admin").doc(localStorage.getItem("admin_uid")).get();
      console.log(resp.data());
    } catch (error) {
      console.log(error);
    }
  };
  if (localStorage.getItem("admin_uid")) {
    getinfo();
  }
  if (!localStorage.getItem("admin_uid")) {
    return <Redirect to="/alogin" />;
  }

  return (
    <>
      <Anav />
        <br/><br/><br/><br/><br/>
        <br/><br/><br/>
       
          <div className="bod">
            <div className="row">
              <h2 data-text="Welcome~Admin" className="h2">Welcome~Admin</h2>
            </div>
          </div>
    </>
  );
};
export default Adash;
