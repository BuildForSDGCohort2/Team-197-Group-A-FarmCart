import React, { useState } from "react";

import { firebase } from "../FirebaseAuth";

// Utils
import clearErrorDiv from "../../utils/clearErrorDiv";
import validateForm from "../../utils/validateForm";
import "./Contact.css";

// Material UI
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { purple } from "@material-ui/core/colors";

import ContactSupportIcon from "@material-ui/icons/ContactSupport";

const style = {
  style1: {
    fontSize: "30",
    color: purple["A400"],
    marginRight: 10,
    marginBottom: -5,
  },
};

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "#d500f9",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
})); // useStyles

/**
 * Contact function component presents input fields to gather
 * user input and relays it to the backend for persisting.
 *
 * @returns {Object} div (container)
 */
function Contact() {
  const classes = useStyles();
  const user = JSON.parse(window.localStorage.getItem("user"));
  const inputErrors = {}; // to hold validation errors if any.

  let initialState;
  if (!user) {
    initialState = {
      name: "",
      phone: "",
      email: "",
      message: "",
    }; // initialState
  } else {
    initialState = {
      name: user.displayName ? user.displayName : "",
      phone: user.phoneNumber ? user.phoneNumber : "",
      email: user.email ? user.email : "",
      message: "",
    }; // initialState
  }

  // state
  const [state, setState] = useState(initialState);
  const [feedbackSuccess, setFeedbackSuccess] = useState("");
  const [feedbackError, setFeedbackError] = useState("");

  const onChangeHandler = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  }; // onChangeHandler

  const onSubmitHandler = (event) => {
    event.preventDefault();

    if (validateForm(state, inputErrors, "messageErrors", clearErrorDiv)) {
      return;
    } else {
      firebase
        .firestore()
        .collection("feedback")
        .add(state)
        .then(() => {
          setFeedbackSuccess("Success! Thanks for your feedback 😎😀");
          setState(initialState); // reset state
        })
        .catch((error) => {
          setFeedbackError(error.message);
        });
    } // else
  }; // onSubmitHandler

  return (
    <Container className="contact-container" component="main" maxWidth="sm">
      <CssBaseline />
      <h1>
        <ContactSupportIcon style={style.style1} />
        Contact Us
      </h1>

      <form className={classes.form} noValidate onSubmit={onSubmitHandler}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              // autoFocus
              variant="outlined"
              required
              fullWidth
              id="name"
              label="Full Name"
              name="name"
              placeholder="Jane Doe"
              value={state.name}
              onChange={onChangeHandler}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="phone"
              label="Phone Number"
              name="phone"
              placeholder="+254700123456"
              value={state.phone}
              onChange={onChangeHandler}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              placeholder="janedoe@email.com"
              value={state.email}
              onChange={onChangeHandler}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              multiline
              rows={4}
              rowsMax={10}
              id="message"
              label="Your Message"
              name="message"
              placeholder="I wish FarmCart..."
              value={state.message}
              onChange={onChangeHandler}
            />
          </Grid>
        </Grid>

        {feedbackSuccess && (
          <div
            className="notify success-note"
            style={{
              textAlign: "center",
              backgroundColor: "#000",
              marginTop: 15,
              marginBottom: -15,
              padding: 5,
              paddingTop: 5,
              height: 50,
              borderRadius: 5,
              color: "#adff2f",
            }}
          >
            {feedbackSuccess}
          </div>
        )}

        {feedbackError && (
          <div
            className="notify error-note"
            style={{
              textAlign: "center",
              backgroundColor: "#000",
              marginTop: 15,
              marginBottom: -15,
              padding: 5,
              paddingTop: 5,
              height: 50,
              borderRadius: 5,
              color: "red",
            }}
          >
            Feedback Sending Failed!! {feedbackError}
          </div>
        )}

        <div
          id="messageErrors"
          style={{
            textAlign: "center",
            marginTop: "20px",
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
          onClick={onSubmitHandler}
        >
          Submit
        </Button>
      </form>
    </Container>
  ); // return
} // Contact

export default Contact;

// Route:
// GET /contact-us
