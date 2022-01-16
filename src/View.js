import React, { useEffect, useState } from "react";
import { db } from "./components/firebase";
import "./lawyerdash.css";
import Widget from "./Widget";

const View = () => {
  const [lawyers, setlawyers] = useState([]);
  const [varified, setvarified] = useState([]);
  const [copy, setcopy] = useState([]);
  const getverified = async () => {
    let data = [];
    await db
      .collection("varifiedUsers")
      .get()
      .then((res) => {
        res.forEach((user) => {
          // console.log(user.data(), "varified");
          data.push(user.data());
        });
      })
      .catch((er) => {
        console.log(er, "error");
      });
    console.log(data, "varified");
    setlawyers(data);
    setcopy(data);
    console.log(varified, "varified users");
  };
  const getlawyers = async (uid) => {
    await db
      .collection("lawyersignup")
      .doc(uid)
      .get()
      .then((res) => {
        console.log(res.data(), "lawyer data");
      })
      .catch((er) => {
        console.log(er, "error");
      });
  };
  const reduce = (value) => {
    let filterdata = [];
    lawyers.forEach((data) => {
      if (data.spciality == value) {
        filterdata.push(data);
      }
    });
    console.log(filterdata, "filtered");
    setcopy(filterdata);
  };
  const filterdata = (e) => {
    let val = document.getElementById("selector").value;
    if (val == "Rape") {
      reduce("Rape");
    }
    if (val == "Theft") {
      reduce("Theft");
    }
    if (val == "Murder") {
      reduce("Murder");
    }
    if (val == "Crime") {
      reduce("Crime");
    }
    if (val == "All") {
      setcopy(lawyers);
    }
  };
  useEffect(() => {
    console.log(localStorage.getItem("lawyer_uid"), "locall");
    getverified();
  }, []);
  useEffect(() => {
    console.log(lawyers, "got em");
  }, [lawyers]);
  return (
    <>
      <div className="container">
        <select id="selector" className="search">
          <option selected value="All">
            All
          </option>
          <option value="Rape">Rape</option>
          <option value="Murder">Murder</option>
          <option value="Crime">Crime</option>
          <option value="Theft">Theft</option>
        </select>
        <br />
        <br />
        <button onClick={filterdata} type="button" class="btn btn-outline-dark searcbtn mb-3">
          Search
        </button>
        <div className="row blog">
          <div className="col-md-12">
            <div id="blogCarousel" className="carousel slide" data-ride="carousel">
              <ol className="carousel-indicators">
                <li data-target="#blogCarousel" data-slide-to="0" className="active"></li>
                <li data-target="#blogCarousel" data-slide-to="1"></li>
              </ol>
              {/* 
                        <!-- Carousel items --> */}
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <div className="row">
                    {!copy.length < 1 ? (
                      copy.map((data, i) => {
                        return (
                          <div className="col-lg-3 col-md-6 col-sm-6">
                            <Widget key={i} data={data} />
                          </div>
                        );
                      })
                    ) : (
                      <h4>Loading data</h4>
                    )}
                  </div>
                </div>
              </div>
              {/* <!--.carousel-inner--> */}
            </div>
            {/* <!--.Carousel--> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default View;
