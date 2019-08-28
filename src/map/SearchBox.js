import React, { Component } from "react";
import { Typography, Paper, Button, withStyles } from "@material-ui/core";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import { compose } from "redux";
import { connect } from "react-redux";
import { AddressPicker } from "./AddressPicker";

const styles = theme => ({
  paper: {
    position: "absolute",
    top: 0,
    left: 20,
    maxWidth: "30%",
    padding: theme.spacing(4, 2),
    margin: theme.spacing(4, 2),
  }
});

class SearchBox extends Component {
  state = { orderMade: false };

  order = (address1, address2) => {
    this.setState({
      orderMade: true
    });
    this.props.order(address1, address2);
  };

  reset = () => {
    this.setState({
      orderMade: false
    });
    this.props.reset();
  };

  render() {
    const { orderMade } = this.state;
    const { profileUpdated } = this.props;
    if (!profileUpdated) {
      return (
        <Paper className={this.props.classes.paper}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography component="h1" variant="h4" align="left">
                Заполните платежные данные
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography>
                Укажите информацию о банковской карте, чтобы сделать заказ.
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="outlined"
                color="primary"
                component={Link}
                to="/profile"
              >
                Перейти в профиль.
              </Button>
            </Grid>
          </Grid>
        </Paper>
      );
    }
    if (orderMade) {
      return (
        <Paper className={this.props.classes.paper}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Typography component="h1" variant="h4" align="left">
                Заказ размещён
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography>
                Ваше такси уже едет к вам. Прибудет приблизительно через 10
                минут.
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Button variant="outlined" color="primary" onClick={this.reset}>
                Сделать новый заказ
              </Button>
            </Grid>
          </Grid>
        </Paper>
      );
    }
    return <AddressPicker order={this.order} />;
  }
}

export default compose(
  withStyles(styles),
  connect(state => ({ profileUpdated: !!state.profile }))
)(SearchBox);
