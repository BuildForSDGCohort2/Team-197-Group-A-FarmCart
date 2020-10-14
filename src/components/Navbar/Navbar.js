// Modules
import React from "react";
import { NavLink, useHistory } from "react-router-dom";

import firebase from "firebase/app";
import "firebase/auth";

// Utils
import "./Navbar.css";
import * as ROUTES from "../../constants/routes";

import CartService from "../../services/cart.service";

// Material UI
import { makeStyles } from "@material-ui/core/styles";

// import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';

const useStyles = makeStyles((theme) => ({
  avatar: {
    margin: theme.spacing(1),
    color: "#000",
  },
})); // useStyles

function Navbar() {
  const classes = useStyles();
  const history = useHistory();
  const user = JSON.parse(window.localStorage.getItem("user"));
  const myCart = JSON.parse(window.localStorage.getItem("myCart"));

  /**
   * toggleLinks displays or hides some links based on whether
   * the current user is logged in or not.
   *
   * @returns undefined
   */
  function toggleLinks() {
    const loggedOut = window.document.querySelectorAll(".logged-out");
    const loggedIn = window.document.querySelectorAll(".logged-in");
    if (user) {
      loggedIn.forEach((link) => (link.style.display = "block"));
      loggedOut.forEach((link) => (link.style.display = "none"));
    } else {
      loggedIn.forEach((link) => (link.style.display = "none"));
      loggedOut.forEach((link) => (link.style.display = "block"));
    }
  }

  toggleLinks();

  let displayPic;
  if (user && user.photoURL) {
    displayPic = (
      <img
        src={user.photoURL}
        alt={user.photoURL}
        style={{
          width: 30,
          height: 30,
          borderRadius: "50%",
          marginTop: -2,
        }}
      />
    ); // displayPic (img)
  } else if (user && user.displayName) {
    displayPic = (
      <button
        style={{
          width: 25,
          height: 25,
          borderRadius: "50%",
          marginTop: -2,
          border: "none",
          outline: "none",
        }}
      >
        {user.displayName.split(" ")[0].substring(0, 1) +
          user.displayName.split(" ")[1].substring(0, 1)}
      </button>
    ); // displayPic (button)
  }

  displayPic = user && displayPic ? displayPic : "";

  return (
    <>
      <div className="nav-container">
        <nav>
          <ul className="navbar">
            <li>
              <NavLink className="active" aria-current="page" to={ROUTES.HOME}>
                Home
              </NavLink>
            </li>

            <li className="logged-in">
              <NavLink
                className="selected-link"
                aria-current="page"
                to={ROUTES.ADD_PRODUCT}
              >
                Add Product
              </NavLink>
            </li>

            <li>
              <NavLink
                className="selected-link"
                aria-current="page"
                to={ROUTES.ABOUT}
              >
                About
              </NavLink>
            </li>

            <li>
              <NavLink to={ROUTES.CONTACT}>Contact</NavLink>
            </li>

            <li className="logged-out">
              <button
                style={{
                  backgroundColor: "#3ed715",
                  borderRadius: 5,
                  color: "#fff",
                  cursor: "pointer",
                }}
                onClick={() => {
                  return history.push("/sign-up");
                }}
              >
                Sign In
              </button>
            </li>

            <li className="logged-in">
              <button
                style={{
                  backgroundColor: "red",
                  borderRadius: 5,
                  color: "#fff",
                  cursor: "pointer",
                }}
                onClick={() => {
                  if (user !== null) {
                    firebase.auth().signOut();
                    alert("Logged out successfully.");
                    window.localStorage.removeItem("myCart");
                    window.localStorage.removeItem("user");
                    history.push("/");
                    return (() => {
                      setTimeout(() => window.location.reload(), 2000);
                    })();
                  } else {
                    return;
                  }
                }}
              >
                Log Out
              </button>
            </li>
          </ul>
        </nav>
        <div id="display-pic" className="logged-in">
          {displayPic}
        </div>
        <div className="cart logged-in">
          <div style={{ 
            color: "#000",
            fontSize: 13,
            fontWeight: 700,
            marginLeft: 15,
            marginTop: 5,
            marginBottom: -13,
          }}>{CartService.getNumCartItems(myCart) ? CartService.getNumCartItems(myCart) : 0}</div>
          <div>
            <ShoppingCartOutlinedIcon fontSize="default" className={classes.avatar} />
          </div>
        </div>
      </div>
    </>
  ); // return
} // Navbar

export default Navbar;
