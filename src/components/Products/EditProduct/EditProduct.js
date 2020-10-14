// Modules
import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { pure } from "recompose";

import { firebase } from "../../FirebaseAuth/FirebaseAuth";

// Utils
import clearErrorDiv from "../../../utils/clearErrorDiv";
import validateForm from "../../../utils/validateForm";

// Material UI
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import EditIcon from "@material-ui/icons/Edit";
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
 * EditProduct is a function component that receives products
 * from its parent component as a prop; presents fields
 * to gather user input, and then relays the data to the server
 * as a JSON object to update the given product.
 *
 * @param {*} { products }
 * @returns {object} div
 */
function EditProduct({ products }) {
  const classes = useStyles();
  const { id } = useParams();
  const history = useHistory();
  const user = JSON.parse(window.localStorage.getItem("user"));
  const inputErrors = {}; // to hold validation errors if any.

  if (!products.length) {
    products = JSON.parse(window.localStorage.getItem("products"));
  }

  /**
   * setProduct extracts the product whose id matches the id
   * in params from the rest of the products.
   *
   * @param {*} products
   * @returns {object} returns product object
   */
  function setProduct(products) {
    let localProductArray;
    if (products !== null) {
      localProductArray = products.filter(
        (product) => String(product.id) === String(id)
      );
    }
    return localProductArray[0];
  } // setProduct
  let product = setProduct(products);

  // id (auto-generated), name, type, location,
  // uid (from user oject), seller (from user oject),
  // description, price, quantity, category,
  const initialState = {
    uid: product.uid,
    seller: product.seller,
    name: product.name,
    type: product.type,
    location: product.location,
    description: product.description,
    unitOfMeasure: product.unitOfMeasure,
    price: product.price,
    quantity: product.quantity,
    category: product.category,
    image: product.image,
  }; // initialState

  // state
  const [newImage, setNewImage] = useState("");
  const [state, setState] = useState(initialState);
  const [error, setError] = useState("");
  const [updateSuccess, setUpdateSuccess] = useState("");

  // Dynamic input handler.
  const onChangeHandler = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  }; // onChangeHandler

  const onChangeNumValueHandler = (event) => {
    // If user provides a negative value, halt the operation.
    if (event.target.value < 0) {
      return;
    } else {
      setState({
        ...state,
        [event.target.name]: event.target.value,
      });
    }
  }; // onChangeNumValueHandler

  const onFileChange = async (event) => {
    event.stopPropagation();
    const storage = firebase.storage();

    if (!user) {
      window.alert("Failed! You must log in to edit a product!");
      history.push("/sign-up");
      return;
    } else {
      // Grab uploaded file url and save it in state.
      if (event.target.files[0]) {
        const file = event.target.files[0];
        const storageRef = storage.ref();
        const fileRef = storageRef.child(file.name);
        await fileRef.put(file);
        const uploadedFileURL = await fileRef.getDownloadURL();
        setState({ ...state, image: uploadedFileURL });
        setNewImage(uploadedFileURL);
      }
    } // else
  }; // onFileChange

  const onSubmitHandler = (event) => {
    event.preventDefault();
    
    if (!user) {
      window.alert("Failed! You must log in to edit a product!");
      history.push("/sign-up");
      return;
    } else {
      if (validateForm(state, inputErrors, "productErrors", clearErrorDiv)) {
        return;
      } else {
        firebase
          .firestore()
          .collection("products")
          .doc(product.id)
          .set(state)
          .then(() => {
            // Successful product edit.
            // Result will be undefined since the operation
            // doesn't return any value.
            setUpdateSuccess("Success! Product updated successfully 😎😀");
          })
          .catch((error) => {
            setError(error.message);
          });
      } // else
    } // else
  }; // onSubmitHandler

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <EditIcon />
        </Avatar>

        <Typography component="h1" variant="h5">
          Edit Product
        </Typography>

        <form className={classes.form} noValidate onSubmit={onSubmitHandler}>
          <Grid container spacing={2}>
            {
              // id, name, type, location,
              // description, price, quantity, category,
            }
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
                label="Prduct Description"
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
                onChange={onChangeNumValueHandler}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                min="1"
                type="number"
                name="quantity"
                label="Product Quantity Available"
                id="quantity"
                placeholder="1"
                value={state.quantity}
                onChange={onChangeNumValueHandler}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="category"
                label="Product Category"
                id="category"
                autoComplete="category"
                placeholder="Vegetable"
                value={state.category}
                onChange={onChangeHandler}
              />
            </Grid>

            {/* Display current and new image (if provided) */}
            <Grid item xs={12}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-around",
                }}
              >
                <div>
                  <span
                    style={{
                      color: "yellow",
                      backgroundColor: "#000",
                      padding: 4,
                      borderRadius: "10%",
                    }}
                  >
                    Current Image
                  </span>
                  <br />
                  <img
                    src={product.image}
                    alt={product.image}
                    style={{
                      width: 150,
                      height: 100,
                      marginTop: 5,
                      objectFit: "cover",
                    }}
                  />
                </div>
                <div>
                  {newImage ? (
                    <>
                      <span
                        style={{
                          color: "#adff2f",
                          backgroundColor: "#000",
                          padding: 4,
                          borderRadius: "10%",
                        }}
                      >
                        New Image
                      </span>
                      <br />
                      <img
                        src={newImage}
                        alt={newImage}
                        style={{
                          width: 150,
                          height: 100,
                          marginTop: 5,
                          objectFit: "cover",
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
              <input
                className="image-picker"
                type="file"
                accept="image/*"
                id="productImage"
                multiple
                name="image"
                style={{
                  display: "block",
                }}
                onChange={onFileChange}
              />
            </Grid>
          </Grid>

          {updateSuccess && (
            <div
              className="notify success-note"
              style={{
                textAlign: "center",
                backgroundColor: "#000",
                marginTop: 15,
                marginBottom: -15,
                padding: 5,
                paddingTop: "auto",
                paddingBottom: "auto",
                height: 50,
                borderRadius: 5,
                color: "#adff2f",
              }}
            >
              {updateSuccess}
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
                paddingTop: "auto",
                paddingBottom: "auto",
                height: 50,
                borderRadius: 5,
                color: "red",
              }}
            >
              Update Failed!! {error}
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
            <b>Submit</b>
          </Button>
        </form>
      </div>
    </Container>
  );
} // EditProduct

export default pure(EditProduct);

/* 
product fields: { 
  id, name, type, location, uid, seller
  description, price, quantity, category,  
}
*/

// requires login

// Route:
// PATCH /products/:id/edit
