// src/components/ProtectedRoute.js

import React from "react";
import { Route, Redirect } from "react-router-dom";
import { ChatState } from "../Context/ChatProvider";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { user } = ChatState(); // Get user state from context

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
