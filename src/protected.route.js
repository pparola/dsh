import React from "react";
import { Route, Redirect } from "react-router-dom";
import auth from "./auth";

export default function ProtectedRoute   (  component,  ...rest)
 {
     console.log("ProtectRoute", auth.isAuthenticated());
     console.log("ProtectRoute", auth.isAuthenticated());
  return (
    <Route
      {...rest}
      render={props => {
        if (auth.isAuthenticated()) {
          return <component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/",
                state: {
                  from: props.location
                }
              }}
            />
          );
        }
      }}
    />
  );
};
