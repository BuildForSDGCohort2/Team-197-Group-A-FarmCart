// Modules
import React from 'react';
import { NavLink } from 'react-router-dom';

// Utils
import "./navbar.css";
import * as ROUTES from "../../constants/routes";

// Material UI Core
import { grey } from "@material-ui/core/colors";
import { lightGreen } from "@material-ui/core/colors";

// Material UI Icons
import HomeIcon from "@material-ui/icons/Home";
import InfoIcon from "@material-ui/icons/Info";
import ContactsIcon from "@material-ui/icons/Contacts";
import LockOpenIcon from "@material-ui/icons/LockOpen";

const style = {
  style1: {
    fontSize: "large",
    color: grey[700],
  },
  style2: {
    fontSize: "large",
    color: lightGreen["A400"],
  },
};

function Navbar() {
  return (
    <div>
      <nav>
        <ul className="navbar">
          
          <li>
            <NavLink 
              className="active" 
              aria-current="page" 
              to={ROUTES.HOME}
            >
              <HomeIcon 
                className="nav-icon" 
                style={style.style1} 
              />
              Home
            </NavLink>
          </li>

          <li>
            <NavLink
              className="selected-link"
              aria-current="page"
              to={ROUTES.ABOUT}
            >
              <InfoIcon 
                className="nav-icon" 
                style={style.style1} 
              />
              About
            </NavLink>
          </li>

          <li>
            <NavLink to={ROUTES.CONTACT}>
              <ContactsIcon 
                className="nav-icon" 
                style={style.style1} 
              />
              Contact
            </NavLink>
          </li>

          <li>
            <NavLink to={ROUTES.SIGN_IN}>
              <LockOpenIcon 
                className="nav-icon" 
                style={style.style2} 
              />
              Sign_In
            </NavLink>
          </li>

          <li>
            <NavLink to={ROUTES.SIGN_UP}>
              <LockOpenIcon 
                className="nav-icon" 
                style={style.style2} 
              />
              Sign_Up
            </NavLink>
          </li>

        </ul>
      </nav>
    </div>
  ); // return
}; // Navbar

export default Navbar;
