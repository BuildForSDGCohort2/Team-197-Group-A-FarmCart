import React from "react";
import { Route, Redirect } from "react-router-dom";

function ProtectedRoute({ children, ...rest }) {

  return (
    <Route
      {...rest}
      render={({ location }) =>
        // userToken === JSON.parse(window.localStorage.getItem("bearerToken")) &&
        !!JSON.parse(window.localStorage.getItem("user")) ? (
          children
        ) : (
          <>
            {alert("Please log in to view this page!")}
            {/* {window.localStorage.removeItem("bearerToken")} */}
            {window.localStorage.removeItem("user")}
            <Redirect
              to={{
                pathname: "/sign-up",
                state: { from: location },
              }}
            />
          </>
        )
      } // render
    />
  ); // return
} // ProtectedRoute

export default ProtectedRoute;
