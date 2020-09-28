// Modules
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { firebase } from "../../FirebaseAuth/FirebaseAuth";

import "./AddProduct.css";

// Utils
import clearErrorDiv from "../../../utils/clearErrorDiv";
import validateForm from "../validateForm";

// Material UI
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import AddIcon from "@material-ui/icons/Add";
import Typography from "@material-ui/core/Typography";
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
 * AddProduct gathers user input then relays the data to the
 * server as a JSON object to create a new product.
 *
 * @returns {object} div
 */
function AddProduct() {
  const classes = useStyles();
  const history = useHistory();
  const user = JSON.parse(window.localStorage.getItem("user"));
  const inputErrors = {}; // to hold validation errors if any.
  console.log("user.uid (addProduct) is uid false?");
  console.log(user === null);

  // id (auto-generated), name, type, location,
  // uid (from user oject), seller (from user oject),
  // description, price, quantity, category,
  const initialState = {
    name: "",
    type: "",
    location: "",
    description: "",
    unitOfMeasure: "",
    price: "",
    quantity: "",
    category: "",
    image: "",
    uid: user ? user.uid : null,
    seller: user ? user.displayName : null,
  };

  // state
  const [state, setState] = useState(initialState);
  const [error, setError] = useState("");
  const [creationSuccess, setCreationSuccess] = useState("");

  // Dynamic input handler.
  const onChangeHandler = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  const onChangeQtyHandler = (event) => {
    // If user provides a negative value, halt the operation.
    if (event.target.value < 1) {
      setState({
        ...state,
        quantity: "",
      });
    } else {
      // Update only the quantity property.
      setState({
        ...state,
        quantity: event.target.value,
      });
    }
  }; // onChangeQtyHandler

  const onFileChange = async (event) => {
    event.stopPropagation();
    const storage = firebase.storage();

    // Grab uploaded file url and save it in state.
    if (event.target.files[0]) {
      console.log(event.target.files[0]);
      const file = event.target.files[0];
      const storageRef = storage.ref();
      const fileRef = storageRef.child(file.name);
      await fileRef.put(file);
      const uploadedFileURL = await fileRef.getDownloadURL();
      setState({ ...state, image: uploadedFileURL });
    } // if
  }; // onFileChange

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (!user) {
      window.alert("You must be logged in to add a product");
      history.push("/sign-up");
      return;
    } else {
      if (validateForm(state, inputErrors, "productErrors", clearErrorDiv)) {
        return;
      } else {
        firebase
          .firestore()
          .collection("products")
          .add(state)
          .then(() => {
            setCreationSuccess("Success! Product added successfully."); // reset state
            setState(initialState); // reset state
          })
          .catch((error) => {
            setError(error.message);
          });
      }
    }
  }; // onSubmitHandler

  return (
    <Container className="add-product" component="main" maxWidth="xs">
      <CssBaseline />
      <div>
        <h3>Notes:</h3>
        <ol>
          <li>Please sign up/login to add a product.</li>
          <li>One can only edit or delete their own product.</li>
          <li>Any user can view all products.</li>
          <li>Adding to cart requires login.</li>
          <li>Cart notifications are yet to be updated.</li>
          <li>All fields are required.</li>
        </ol>
      </div>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <AddIcon fontSize="large" />
        </Avatar>

        <Typography component="h1" variant="h5">
          Add Product
        </Typography>

        <form className={classes.form} noValidate onSubmit={onSubmitHandler}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                // autoFocus
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Product Name"
                name="name"
                placeholder="Capsicum"
                value={state.name}
                onChange={onChangeHandler}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="type"
                label="Product Variety or Type"
                name="type"
                placeholder="Red Capsicum"
                value={state.type}
                onChange={onChangeHandler}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="location"
                label="Location of Product"
                name="location"
                placeholder="Machakos"
                value={state.location}
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
                id="description"
                label="Product Description"
                name="description"
                placeholder="Large, red organic capsicums"
                value={state.description}
                onChange={onChangeHandler}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                multiline
                id="unitOfMeasure"
                label="Unit Of Measure"
                name="unitOfMeasure"
                placeholder="Kg"
                value={state.unitOfMeasure}
                onChange={onChangeHandler}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="price"
                label="Unit Price"
                name="price"
                placeholder="23.20"
                value={state.price}
                onChange={onChangeHandler}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                min="1"
                name="quantity"
                label="Product Quantity Available"
                type="number"
                id="quantity"
                placeholder="1"
                value={state.quantity}
                onChange={onChangeQtyHandler}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="category"
                label="Product Category"
                type="category"
                id="category"
                autoComplete="category"
                placeholder="Vegetable"
                value={state.category}
                onChange={onChangeHandler}
              />

              <div
                id="submitError"
                style={{
                  marginTop: "3px",
                  color: "red",
                  fontSize: "1.2em",
                  fontWeight: "600",
                }}
              ></div>
            </Grid>

            {/* Preview selected image */}
            <Grid item xs={12}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div>
                  {state.image ? (
                    <>
                      <span
                        style={{
                          color: "#adff2f",
                          backgroundColor: "#000",
                          padding: 4,
                          borderRadius: "10%",
                        }}
                      >
                        Image Preview
                      </span>
                      <br />
                      <img
                        src={state.image}
                        alt={state.image}
                        style={{
                          width: 150,
                          height: 100,
                          marginTop: 5,
                        }}
                      />
                    </>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </Grid>

            <Grid item xs={12}>
            <label for="choose-image"></label>
              <input
                className="image-picker"
                type="file"
                accept="image/*"
                id="productImage"
                multiple={false}
                name="choose-image"
                style={{ display: "block" }}
                onChange={onFileChange}
              />
            </Grid>
          </Grid>

          {creationSuccess && (
            <div
              className="notify success-note"
              style={{
                textAlign: "center",
                backgroundColor: "#000",
                marginTop: 15,
                marginBottom: -15,
                padding: 5,
                paddingTop: 10,
                height: 40,
                borderRadius: 5,
                color: "#adff2f",
              }}
            >
              {creationSuccess}
            </div>
          )}

          {error && (
            <div
              className="notify error-note"
              style={{
                textAlign: "center",
                backgroundColor: "#000",
                marginTop: 15,
                marginBottom: -15,
                padding: 5,
                paddingTop: 10,
                height: 40,
                borderRadius: 5,
                color: "red",
              }}
            >
              Product Creation Failed!! {error}
            </div>
          )}

          <div
            id="productErrors"
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
      </div>
    </Container>
  );
} // AddProduct

export default AddProduct;

/* 
product fields: { 
  id, name, type, location, uid, seller
  description, price, quantity, category,  
}
*/

// requires login

// Route:
// POST /products/
