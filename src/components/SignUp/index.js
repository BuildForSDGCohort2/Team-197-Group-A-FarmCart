/* import React, { useState } from "react";

function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassWord] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onChangeHandler = (evt) => {
    
  };

  const onSubmitHandler = () => {

  }

  return (
    <div>
      <h1>Sign Up</h1>
      <div>
        <form onSubmit={onSubmitHandler}>
          <input 
            type="text"
            name="first name"
            placeholder="First Name"
            value={firstName}
            onChange={onChangeHandler}
          ></input>
          <input
            type="text"
            name="last name"
            placeholder="Last Name"
            value={lastName}
            onChange={onChangeHandler}
          />
          <input
            type="text"
            name="email"
            placeholder="Email Address"
            value={email}
            onChange={onChangeHandler}
          />
          <input
            type="text"
            name="phone number"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={onChangeHandler}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={onChangeHandler}
          />
          <input
            type="password"
            name="confirm password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={onChangeHandler}
          />
        </form>
      </div>
    </div>
  );
} // SignUp

export default SignUp;

// Route:
// POST /sign-up
*/
/** 
User = {
  firstName
  lastName
  email
  phoneNumber
  password
  confirmPassword
}
*/

// Modules
import React, { useState } from "react";

// Service
// import AuthService from '../services/auth.service';

// Utils
import "./SignUp.css";
import clearErrorDiv from "../../utils/clearErrorDiv";

// Material UI stuff
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function SignUp() {
  const classes = useStyles();

  // Global error object to keep track of sign-up errors.
  const inputErrors = {};
  const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  };

  const [state, setState] = useState(initialState);

  const inputHandler = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  }; // inputHandler

  const submitInput = async (event) => {
    event.preventDefault(); // Prevent form submission

    validateForm(state);

    // Halt the sign up process if any errors were found
    if (Object.keys(inputErrors).length) return;

    // Post form data to the server to attempt signing user up.
    try {
      // const signedUp = await AuthService.signup(state);
      const signedUp = false;

      // Something went wrong server-side.
      if (signedUp !== true) {
        throw Error("Sign Up Error");
      }
    } catch (err) {
      document.getElementById("signUpError").textContent =
        "Email already taken!";

      // Clear div with id "signUpError" after 3 seconds.
      clearErrorDiv(3, "signUpError");
    }
  }; // submitInput

  /**
   * validateForm is an impure function that checks user input
   * for errors and populates the inputErrors object if found.
   *
   * @param {*} rawState
   */
  const validateForm = (rawState) => {
    console.log(rawState);

    if (rawState.firstName.length === 0) {
      inputErrors.firstName = "First Name Required";
    }  
    
    if (rawState.firstName.length === 1) {
      inputErrors.firstName = "First Name Too Short";
    }
    
    if (rawState.lastName.length === 0) {
      inputErrors.lastName = "Last Name Required";
    }  
    
    if (rawState.lastName.length === 1) {
      inputErrors.lastName = "Last Name Too Short";
    }

    if (rawState.email.length === 0) {
      inputErrors.email = "Email Required";
    }
    
    // Validate email
    // https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript/46181#46181
    const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegex.test(rawState.email)) {
      inputErrors.email = "Invalid Email";
    }

    if (!rawState.password) {
      inputErrors.password = "Password Required";
    }

    if (rawState.password.length > 0 && rawState.password.length < 8) {
      inputErrors.password = "Password MUST be 8 or more characters.";
    }

    if (
      rawState.confirmPassword.length > 0 &&
      rawState.password !== rawState.confirmPassword
    ) {
      inputErrors.confirmPassword = "Passwords Do Not Match";
    }

    if (rawState.confirmPassword.length === 0) {
      inputErrors.confirmPassword = "Confirm Password Required";
    }

    if (
      rawState.confirmPassword.length > 0 &&
      rawState.confirmPassword.length < 8
    ) {
      inputErrors.confirmPassword = "Password MUST be 8 or more characters.";
    }

    if (inputErrors.firstName) {
      document.getElementById("firstNameError").textContent =
        inputErrors.firstName;

      clearErrorDiv(2, "firstNameError");
    }

    if (inputErrors.lastName) {
      document.getElementById("lastNameError").textContent =
        inputErrors.lastName;

      clearErrorDiv(2, "lastNameError");
    }

    if (inputErrors.email) {
      document.getElementById("emailError").textContent = inputErrors.email;

      clearErrorDiv(2, "emailError");
    }

    if (inputErrors.password) {
      document.getElementById("passwordError").textContent =
        inputErrors.password;

      clearErrorDiv(2, "passwordError");
    }

    if (inputErrors.confirmPassword) {
      document.getElementById("pswdMatchError").textContent =
        inputErrors.confirmPassword;

      clearErrorDiv(2, "pswdMatchError");
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
          Sign Up
        </Typography>

        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoFocus
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                name="firstName"
                autoComplete="firstName"
                placeholder="Jane"
                value={state.firstName}
                onChange={inputHandler}
              />
              <div id="firstNameError" style={{ color: "red" }}></div>
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lastName"
                placeholder="Doe"
                value={state.lastName}
                onChange={inputHandler}
              />
              <div id="lastNameError" style={{ color: "red" }}></div>
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                placeholder="johndoe@email.com"
                value={state.email}
                onChange={inputHandler}
              />
              <div id="emailError" style={{ color: "red" }}></div>
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                placeholder="StrongPassword"
                value={state.password}
                onChange={inputHandler}
              />
              <div id="passwordError" style={{ color: "red" }}></div>
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                autoComplete="current-password"
                placeholder="StrongPassword"
                value={state.confirmPassword}
                onChange={inputHandler}
              />
              <div id="pswdMatchError" style={{ color: "red" }}></div>
              <div
                id="signUpError"
                style={{
                  marginTop: "3px",
                  color: "red",
                  fontSize: "1.2em",
                  fontWeight: "600",
                }}
              ></div>
            </Grid>

            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive updates via email."
              />
            </Grid>
          </Grid>

          <Button
            color="primary"
            variant="contained"
            fullWidth
            type="submit"
            className={classes.submit}
            onClick={submitInput}
          >
            Sign Up
          </Button>

          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/sign-in" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

export default SignUp;
