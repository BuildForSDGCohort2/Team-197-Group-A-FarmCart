// Modules
import React, { useState } from "react";
import { withRouter } from "react-router-dom";

// Service
// import AuthService from "../services/auth.service";

// Utils
import clearErrorDiv from "../../utils/clearErrorDiv";

// Material UI stuff
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "#000",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function SignIn() {
  const classes = useStyles();
  const inputErrors = {};
  const initialState = {
    phoneNumber: "",
    password: "",
  };

  const [state, setState] = useState({ ...initialState });

  const inputHandler = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  }; // inputHandler

  /**
   * submitInput is an impure function that attempts to log
   * the user in by sending their credentials to the back end.
   *
   * @param {*} event
   * @returns undefined
   */
  const submitInput = async (event) => {
    event.preventDefault(); // Prevent form submission.

    validateForm(state);

    // Halt the login process if any errors were found
    if (Object.keys(inputErrors).length) return;

    // Post login data to the server to log user in.
    try {
      // const loggedIn = await AuthService.login(state);
      const loggedIn = false;

      // Something went wrong server-side.
      if (loggedIn !== true) {
        throw Error("Login Error");
      }
    } catch (err) {
      document.getElementById("loginError").textContent =
        "Check your Phone Number or Password";

      // Clear div with id "loginError" after 3 seconds.
      clearErrorDiv(3, "loginError");
    }
  }; // submitInput

  /**
   * validateForm is an impure function that checks user input
   * for errors and populates the inputErrors object if found.
   *
   * @param {*} rawState
   */
  const validateForm = (rawState) => {
    if (rawState.phoneNumber.length === 0) {
      inputErrors.phoneNumber = "Phone Number Required";
    }

    if (!rawState.password) {
      inputErrors.password = "Password Required";
    }

    if (0 < rawState.password.length < 8) {
      inputErrors.password = "Password Must be 8 or more characters.";
    }

    if (inputErrors.phoneNumber) {
      document.getElementById("phoneNumberError").textContent = inputErrors.phoneNumber;

      clearErrorDiv(2, "phoneNumberError");
    }

    if (inputErrors.password) {
      document.getElementById("passwordError").textContent =
        inputErrors.password;

      clearErrorDiv(2, "passwordError");
    }
  }; // validateForm

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign In
        </Typography>

        {/* 
        Make form input handling dynamic and scalable.

        Below, the non-scalable way of handling input for 
        each field separately is given up (commented out).

        A dynamic inputHandler is adopted instead.
        */}
        <form method="POST" className={classes.form}>
          <TextField
            autoFocus
            variant="outlined"
            margin="normal"
            required
            fullWidth
            type="phoneNumber"
            id="phoneNumber"
            label="Phone Number"
            name="phoneNumber"
            autoComplete="phoneNumber"
            placeholder="+254721234567"
            // value={phoneNumber}
            value={state.phoneNumber}
            // onChange={ onphoneNumberChange }
            onChange={inputHandler}
          />
          <div id="phoneNumberError" style={{ color: "red" }}></div>

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            type="password"
            id="password"
            label="Password"
            name="password"
            placeholder="StrongPassword"
            // value={password}
            value={state.password}
            // onChange={ onPasswordChange }
            onChange={inputHandler}
          />
          <div id="passwordError" style={{ color: "red" }}></div>
          <div
            id="loginError"
            style={{
              color: "red",
              fontSize: "1.2em",
              fontWeight: "600",
            }}
          ></div>

          <Button
            color="primary"
            variant="contained"
            fullWidth
            type="submit"
            className={classes.submit}
            // onClick={ onSubmitHandler }
            onClick={submitInput}
          >
            Sign In
          </Button>

          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>

            <Grid item>
              <Link href="/sign-up" variant="body2">
                {"Don't have an account? Sign up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
} // SignIn

export default withRouter(SignIn);

// Route:
// POST /sign-in

/**  
Credentials = {
  phoneNumber, 
  password
}
*/
