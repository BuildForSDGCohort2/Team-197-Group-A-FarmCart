// Modules
import React, { useState } from "react";

// Material UI
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import AddIcon from '@material-ui/icons/Add';
// import AddCircleIcon from '@material-ui/icons/AddCircle';
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
 * AddProduct gather user input, then relays the data to the 
 * server as a JSON object to update the given product. 
 *
 * @returns {objec} div
 */
function AddProduct() {
  const classes = useStyles();
  const initialState = {
    title: "",
    description: "",
    price: "",
    quantity: "",
    category: ""
  }

  const [state, setState] = useState(initialState);
  
  // Dynamic input handler.
  const onChangeHandler = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  const onSubmitHandler = (evt) => {
    evt.preventDefault();
    console.log(state);
    alert(`${JSON.stringify(state)} \n\n will be posted to the server..`);
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div><br />
        TODO:<br /> 
        1. Hook up onSubmitHandler to endpoint URL for product addition<br />
        2. Gather feedback from team on improvements<br />
        3. Validate user input<br />
        4. Limit page to logged-in users<br />
        5. Handle errors<br />
      </div>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <AddIcon fontSize="large"/>
        </Avatar>

        <Typography component="h1" variant="h5">
          Add Product
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
} // AddProduct

export default AddProduct;

// requires login

// Route:
// POST /users/:id/products/
