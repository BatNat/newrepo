import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

export const PrivateRoute = withRouter(
  connect(state => ({ loggedIn: state.loggedIn }))(
    ({ component: RouteComponent, loggedIn, ...rest }) => {
      return (
        <Route
          {...rest}
          render={routeProps =>
            loggedIn ? (
              <RouteComponent {...routeProps} />
            ) : (
              <Redirect to="/login" />
            )
          }
        />
      );
    }
  )
);
