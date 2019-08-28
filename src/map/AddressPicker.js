import React, { Component } from "react";
import Autocomplete from "./Autocomplete";
import { Typography, Paper, Button, withStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

const styles = theme => ({
  paper: {
    position: "absolute",
    top: 0,
    left: 20,
    maxWidth: "30%",
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(6)
    }
  }
});

const suggestions = [
  { label: "Пулково (LED)" },
  { label: "Шаверма на Невском" },
  { label: "Инфекционная больница им. Боткина" },
  { label: "Волковское кладбище" }
].map(suggestion => ({
  value: suggestion.label,
  label: suggestion.label
}));

class AddressPickerView extends Component {
  state = {
    selectedA: null,
    selectedB: null
  };

  updateSelectedA = selected => {
    this.setState({
      selectedA: selected
    });
  };

  updateSelectedB = selected => {
    this.setState({
      selectedB: selected
    });
  };

  order = () => {
    const { selectedA, selectedB } = this.state;
    this.props.order(selectedA, selectedB);
  };

  render() {
    const { classes } = this.props;
    const { selectedA, selectedB } = this.state;
    const availableSuggestions = suggestions.filter(
      suggestion => ![selectedA, selectedB].includes(suggestion.label)
    );
    return (
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography component="h1" variant="h4" align="left">
              Вызов такси
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Autocomplete
              label="Выберите адрес отправления"
              onUpdateAddress={this.updateSelectedA}
              suggestions={availableSuggestions}
            />
          </Grid>
          <Grid item xs={12}>
            <Autocomplete
              label="Выберите адрес прибытия"
              onUpdateAddress={this.updateSelectedB}
              suggestions={availableSuggestions}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              disabled={!(selectedA && selectedB)}
              variant="outlined"
              color="primary"
              onClick={this.order}
            >
              Вызвать такси
            </Button>
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

export const AddressPicker = withStyles(styles)(AddressPickerView);
