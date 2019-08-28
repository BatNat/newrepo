import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import { handleProfileSubmit } from "./actions";
import { compose } from "redux";
import { Link } from "react-router-dom";

const cardNumber = value =>
  value
    ? value
        .replace(/\s/g, "")
        .match(/.{1,4}/g)
        .filter(() => true)
        .join(" ")
    : "";

const styles = theme => ({
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1)
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
  const requiredFields = ["cardName", "cardNumber", "expDate", "cvv"];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = "Это обязательное поле";
    }
  });
  if (values.cardNumber && values.cardNumber.replace(/\s/g, "").length !== 16) {
    errors.cardNumber = "В номере карты 16 цифр";
  }
  if (
    values.cardNumber &&
    isNaN(Number(values.cardNumber.replace(/\s/g, "")))
  ) {
    errors.cardNumber = "Может содержать только цифры";
  }
  if (values.cvv && isNaN(Number(values.cvv.replace(/\s/g, "")))) {
    errors.cvv = "Может содержать только цифры";
  }
  if (values.cvv && values.cvv.length !== 3) {
    errors.cvv = "CVV состоит из 3 цифр";
  }
  return errors;
};

export const PaymentForm = compose(
  connect(state => ({
    initialValues: state.profile
  })),
  reduxForm({
    form: "paymentForm",
    validate,
    onSubmit: (values, dispatch) => dispatch(handleProfileSubmit(values))
  }),
  withStyles(styles)
)(({ classes, handleSubmit, submitSucceeded }) => {
  return submitSucceeded ? (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography>
          Платёжные данные обновлены. Теперь вы можете заказывать такси.
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Button variant="outlined" color="primary" component={Link} to="/map">
          Перейти на карту
        </Button>
      </Grid>
    </Grid>
  ) : (
    <form onSubmit={handleSubmit}>
      <Typography variant="h6" gutterBottom>
        Способ оплаты
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Field
            component={renderField}
            required
            name="cardName"
            label="Имя владельца"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Field
            component={renderField}
            required
            name="cardNumber"
            label="Номер карты"
            normalize={cardNumber}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Field
            component={renderField}
            type="date"
            required
            name="expDate"
            label="Дата окончания действия"
            InputLabelProps={{
              shrink: true
            }}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Field
            component={renderField}
            required
            name="cvv"
            label="CVV"
            helperText="Last three digits on signature strip"
            fullWidth
          />
        </Grid>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          className={classes.button}
        >
          Сохранить
        </Button>
      </Grid>
    </form>
  );
});
