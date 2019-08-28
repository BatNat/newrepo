import React from "react";
import { Paper, Grid, Typography } from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import { PaymentForm } from "./PaymentForm";

const styles = theme => ({
  paper: {
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

const Profile = ({ classes }) => (
  <>
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      style={{ minHeight: "100vh" }}
    >
      <Grid item xs={10}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Профиль
          </Typography>
          <PaymentForm />
        </Paper>
      </Grid>
    </Grid>
  </>
);

export default withStyles(styles)(Profile);
