import React, { Children } from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router";

const RedirectRoute = ({ Component, path, ...restOfProps }) => {
  // get trade role from redux
  const user_traderole = useSelector(
    state => state.UserLogIn.UserData.usertype
  );
  const trade_role = localStorage.getItem("role") || user_traderole;

  //  check if user Log in
  //  if user Log in then Some Pages is hidden from Login user
  //  Also check Log in user is client or supplier

  if (trade_role) {
    if (trade_role === "user") {
      return <Redirect to="/dash" />;
    } else if(trade_role === "lawyer") {
      return <Redirect to="/lawyer" />;
    }else {
      return <Redirect to="/Adash" />;
    }
  } else {
    return (
      <Route
        {...restOfProps}
        render={props => {
          <Component {...props} />;
        }}
      ></Route>
    );
  }
};

export default RedirectRoute;
