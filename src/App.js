import React, { Component } from "react";
import "./App.css";
import { Switch, Route, Link, Redirect } from "react-router-dom";
import Map from "./map";
import Login from "./login";
import Profile from "./profile";
import { PrivateRoute } from "./PrivateRoute";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { compose } from "redux";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core";
import { handleUnauthorize } from "./login/actions";
import { withRouter } from "react-router-dom";

const styles = theme => ({
  header: {
    backgroundColor: "#ffffff"
  },
  logoText: {
    flexGrow: 1,
    color: 'black'
  }
});

class App extends Component {
  render() {
    const { loggedIn, unauthorize } = this.props;
    const { header, logoText } = this.props.classes;
    return (
      <>
        <AppBar className={header} position="static">
          <Toolbar>
            <Typography className={logoText} variant="h6">
              Loft Taxi
            </Typography>
            <Button component={Link} to="/map">
              Карта
            </Button>
            <Button component={Link} to="/profile">
              Профиль
            </Button>
            {loggedIn ? (
              <Button onClick={unauthorize}>Выйти</Button>
            ) : (
              <Button component={Link} to="/login">
                Войти
              </Button>
            )}
          </Toolbar>
        </AppBar>
        <Switch>
          <PrivateRoute path="/map" component={Map} />
          <PrivateRoute path="/profile" component={Profile} />
          <Route path="/login" render={() => <Login />} />
          <Redirect to="/map" />
        </Switch>
      </>
    );
  }
}

export default compose(
  withRouter,
  connect(
    state => ({ loggedIn: state.loggedIn }),
    { unauthorize: handleUnauthorize }
  ),
  withStyles(styles)
)(App);
