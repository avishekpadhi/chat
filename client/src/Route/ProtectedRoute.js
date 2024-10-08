import React, { useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { ChatState } from "../Context/ChatProvider";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { user, loading } = ChatState();
  console.log(user);
  useEffect(() => {
    if (!user || !user.token) {
      return <Redirect to="/login" />;
    }
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Show a loading indicator while checking the user state
  }

  return (
    <Route
      {...rest}
      render={(props) => (user && user.token ? <Component {...props} /> : null)}
    />
  );
};

export default ProtectedRoute;
