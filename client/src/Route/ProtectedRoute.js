import React, { useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import { ChatState } from "../Context/ChatProvider";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { setUser } = ChatState();
  const userInfo = localStorage.getItem("userInfo");
  setUser(userInfo);
  console.log(userInfo);

  return (
    <Route
      {...rest}
      render={(props) =>
        userInfo && userInfo.token ? ( // Check if user is authenticated
          <Component {...props} /> // Render the protected component
        ) : (
          <Redirect to="/login" /> // Redirect to login if not authenticated
        )
      }
    />
  );
};

export default ProtectedRoute;
