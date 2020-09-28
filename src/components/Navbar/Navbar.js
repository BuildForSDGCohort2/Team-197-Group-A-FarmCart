// Modules
import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import firebase from "firebase/app";
import "firebase/auth";

// Utils
import "./Navbar.css";
import * as ROUTES from "../../constants/routes";

function Navbar() {
  const history = useHistory();
  const user = JSON.parse(window.localStorage.getItem("user"));

  // const toggleLinks = () => {
  //   const loggedOut = window.document.querySelectorAll(".logged-out");
  //   const loggedIn = window.document.querySelectorAll(".logged-in");
  //   if (user) {
  //     loggedIn.forEach((link) => (link.style.display = "block"));
  //     loggedOut.forEach((link) => (link.style.display = "none"));
  //   } else {
  //     loggedIn.forEach((link) => (link.style.display = "none"));
  //     loggedOut.forEach((link) => (link.style.display = "block"));
  //   }
  // };

  // toggleLinks();

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
    <div>
      <nav>
        <ul className="navbar">
          <li className="logged-out">
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

          <li className="logged-out">
            <NavLink
              className="selected-link"
              aria-current="page"
              to={ROUTES.ABOUT}
            >
              About
            </NavLink>
          </li>

          <li className="logged-out">
            <NavLink to={ROUTES.CONTACT}>Contact</NavLink>
          </li>

          <li className="logged-out">
            <button
              style={{
                backgroundColor: "#3ed715",
                borderRadius: 5,
                color: "#fff",
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
          <li id="display-pic" className="logged-in">
            {displayPic}
          </li>
        </ul>
      </nav>
    </div>
  ); // return
} // Navbar

export default Navbar;
