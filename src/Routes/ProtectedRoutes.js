import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route, useHistory } from "react-router";

const ProtectedRoutes = ({ component: Component, path, ...restOfProps }) => {
  const isAuthenticated = useSelector(state => state.UserLogIn.IsUserLogIn);
  const accessToken = localStorage.getItem("access_token");
  // get history from route
  // const history = useHistory();
  // const trade_role = localStorage.getItem("trade_role");
  // // check if path contain client
  // const isClient = history.location.pathname.match("/client");
  // // check if path contain supplier
  // const isSupplier = history.location.pathname.match("/supplier");

  // check if user login otherwise redirect to Login Page
  if (isAuthenticated || accessToken) {
    // check if trade_role is buyer
        return (
          <Route {...restOfProps} render={props => <Component {...props} />} />
        );
  } else {
    return <Redirect to="/login" />;
  }
};

export default ProtectedRoutes;
