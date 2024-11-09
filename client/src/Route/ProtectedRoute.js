import React, { useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthState } from "../Context/AuthProvider";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { user, setUser } = AuthState();

  return (
    <Route
      {...rest}
      render={(props) =>
        user ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default ProtectedRoute;
