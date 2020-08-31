// Modules
import React, { useState } from "react";
import { useParams } from "react-router-dom";

// Material UI
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import EditIcon from '@material-ui/icons/Edit';
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
    backgroundColor: "black",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

/**
 * EditProduct is a function component that receives products 
 * from its parent component as a prop; and presents fields
 * to gather user input, then relays the data to the server as 
 * a JSON object to update the given product. 
 *
 * @param {*} { products }
 * @returns {object} div
 */
function EditProduct({ products }) {
  const classes = useStyles();
  const { id } = useParams();
  
  if (products.length === 0) {
    products = JSON.parse(window.localStorage.getItem("products"));
  }

  let product;
  function setProduct(products) {
    if (products !== null) {
      product = products.filter((product) => Number(product.id) === Number(id));
    }
  }
  setProduct(products);
  product = product[0];

  const initialState = {
    title: product.title, 
    description: product.description, 
    price: product.price, 
    quantity: "",
    category: product.category
  };

  const [state, setState] = useState(initialState)
  
  // Dynamic input handler.
  const onChangeHandler = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  const onSubmitHandler = (evt) => {
    evt.preventDefault();
    console.log(state); // To be sent to server
    alert(`${JSON.stringify(state)} \n\n will be posted to the server..`);
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div><br />
        TODO:<br />
        1. Hook up onSubmitHandler to endpoint URL for product editing<br />
        2. Gather feedback from team on improvements<br />
        3. Validate user input<br />
        4. Limit to page logged-in users<br />
        5. Handle errors<br />
      </div>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <EditIcon />
        </Avatar>

        <Typography component="h1" variant="h5">
          Edit Product
        </Typography>

        <form className={classes.form} noValidate onSubmit={onSubmitHandler}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoFocus
                variant="outlined"
                required
                fullWidth
                id="title"
                label="Product Title"
                name="title"
                autoComplete="title"
                placeholder="Red Capsicums"
                value={state.title}
                onChange={onChangeHandler}
              />
              <div id="titleError" style={{ color: "red" }}></div>
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
                autoComplete="description"
                placeholder="Large, red organic capsicums"
                value={state.description}
                onChange={onChangeHandler}
              />
              <div id="descriptionError" style={{ color: "red" }}></div>
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="price" 
                label="Product Price"
                name="price"
                autoComplete="price"
                placeholder="23.20"
                value={state.price}
                onChange={onChangeHandler}
              />
              <div id="priceError" style={{ color: "red" }}></div>
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="price" 
                min="1"
                name="quantity"
                label="Product Quantity"
                type="number"
                id="quantity"
                autoComplete="quantity"
                placeholder="1"
                value={state.quantity}
                onChange={onChangeHandler}
              />
              <div id="quantityError" style={{ color: "red" }}></div>
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
              <div id="categoryError" style={{ color: "red" }}></div>
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
          </Grid>

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
} // EditProduct

export default EditProduct;

// requires login

// Route:
// PATCH /users/:id/products/:id/edit
