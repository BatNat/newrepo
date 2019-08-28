import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/styles/withStyles";
import { Redirect } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { handleLoginSubmit } from "./actions";
import { withRouter } from "react-router-dom";

const styles = theme => ({
  paper: {
    marginTop:  20,
    marginBottom:  20,
    padding:  20,
  },
  row: {
    padding:  20,
  }
});

const renderField = ({
  input,
  label,
  meta: { touched, invalid, error },
  helperText,
  ...custom
}) => (
  <TextField
    label={label}
    placeholder={label}
    error={touched && invalid}
    helperText={(touched && error) || helperText}
    {...input}
    {...custom}
  />
);

const validate = values => {
  const errors = {};
  if (values.username !== "test@test.com") {
    errors.username = "Неверный логин";
  }
  if (values.password !== "123123") {
    errors.password = "Неправильный пароль";
  }
  return errors;
};

class Login extends Component {
  render() {
    if (this.props.loggedIn) {
      return <Redirect to="/map" />;
    }
    return (
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid item xs={3}>
          <form onSubmit={this.props.handleSubmit}>
            <Paper className={this.props.classes.paper}>
              <Grid container>
                <Grid item xs={12} className={this.props.classes.row}>
                  <Typography component="h1" variant="h4" align="center">
                    Войти
                  </Typography>
                </Grid>
                <Grid item xs={12} className={this.props.classes.row}>
                  <Field
                    required
                    name="username"
                    component={renderField}
                    label="Имя пользователя"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} className={this.props.classes.row}>
                  <Field
                    component={renderField}
                    required
                    name="password"
                    type="password"
                    label="Пароль"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} className={this.props.classes.row}>
                  <Button style={{ cursor: 'pointer' }} variant="outlined" color="primary" type="submit">
                    Войти
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </form>
        </Grid>
      </Grid>
    );
  }
}

export default compose(
  withRouter,
  connect(state => ({ loggedIn: state.loggedIn })),
  reduxForm({
    form: "loginForm",
    validate,
    onSubmit: (values, dispatch) => dispatch(handleLoginSubmit())
  }),
  withStyles(styles)
)(Login);
