import React from "react";

import "../Legal.css";

import cookie_image from "../../../assets/cookie.png";

// Material UI
import { purple } from "@material-ui/core/colors";
import CssBaseline from "@material-ui/core/CssBaseline";

import AvTimerIcon from "@material-ui/icons/AvTimer";

const style = {
  style1: {
    fontSize: "30",
    color: purple["A400"],
    marginRight: 10,
    marginBottom: -5,
  },
};

function CookiePolicy() {
  return (
    <div className="container">
      <CssBaseline />
      <h1>
        <AvTimerIcon style={style.style1} />
        Cookie Policy
        <img
          src={cookie_image}
          alt={cookie_image}
          style={{
            objectFit: "cover",
            float: "right",
            width: 80,
            height: 60,
          }}
        />
      </h1>
      <p>
        Our website uses cookies to distinguish you from other users of our
        website. This helps us to provide you with a good experience when you
        browse our website and also allows us to improve our site. A cookie is a
        small file of letters and numbers that we store on your browser or the
        hard drive of your computer if you agree. Cookies contain information
        that is transferred to your computer's hard drive.
      </p>

      <h2>We use the following cookies:</h2>

      <p>
        <strong>Strictly necessary cookies.</strong> These are cookies that are
        required for the operation of our website. They include, for example,
        cookies that enable you to log into secure areas of our website.
      </p>

      <p>
        <strong>Analytical/performance cookies.</strong> They allow us to
        recognise and count the number of visitors and to see how visitors move
        around our website when they are using it. This helps us to improve the
        way our website works, for example, by ensuring that users are finding
        what they are looking for easily.
      </p>

      <p>
        <strong>Functionality cookies.</strong> These are used to recognise you
        when you return to our website. This enables us to personalise our
        content for you and remember your preferences (for example, your choice
        of language).
      </p>

      <p>
        <strong>Targeting cookies.</strong> These cookies record your visit to
        our website, the pages you have visited and the links you have followed.
        We will use this information to make our website and the advertising
        displayed on it more relevant to your interests.
      </p>
      <p>
        You block cookies by activating the setting on your browser that allows
        you to refuse the setting of all or some cookies. However, if you use
        your browser settings to block all cookies (including essential cookies)
        you may not be able to access all or parts of our site.
      </p>
    </div>
  );
}

export default CookiePolicy;
