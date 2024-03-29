import React from "react";
import { Route, Navigate } from "react-router-dom";

const AuthRoute = ({ element: Component, ...rest }) => {
  const isAuthenticated = localStorage.getItem("user_Login_Id");

  return (
    <Route
      {...rest}
      element={isAuthenticated ? <Component /> : <Navigate to="/Admin-Login" />}
    />
  );
};

export default AuthRoute;
