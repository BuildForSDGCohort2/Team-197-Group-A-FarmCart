import React from "react";

import "./About.css";

// Assets (images)
import farmer from "../../assets/un_farmer.jpg";
import consumer from "../../assets/person-eating-steak-or-red-meat.jpg";
import agric_expert from "../../assets/Agriculture-expertjpg.jpg";

// Material UI
import { purple } from "@material-ui/core/colors";
import CssBaseline from "@material-ui/core/CssBaseline";

import InfoIcon from "@material-ui/icons/Info";

const style = {
  style1: {
    fontSize: "30",
    color: purple["A400"],
    marginRight: 10,
    marginBottom: -5,
  },
};

function About() {
  return (
    <div className="about-container">
      <div>
        <CssBaseline /> 
        <h1>
          <InfoIcon 
            style={style.style1} 
          />About Us
        </h1>
      </div>

      <div>
        <h2>Who We Are</h2>
        <div className="section-field">
          <div>
            <ol>
              <li>One.</li>
              <li>Two.</li>
              <li>Three.</li>
            </ol>
          </div>
        </div>
      </div>

      <div>
        <h2>What We Do</h2>
        <div className="section-field">
          
          <div>
            <h3>.. for the farmer:</h3>
            <ol>
              <li>Mitigate the risk of exposure to Coronavirus for farmers by digitizing their trade.</li>
              <li>Help reduce poverty levels among farmers.</li>
              <li>Provide a market for farmers to sell directly to their buyers securely.</li>
              <li>Farmers get a chance to build themselves a reputation and hence increase a loyal clientele.</li>
              <li>Help farmers adopt improved farming practices by giving them effortless access to domain experts.</li>
              <li>Empower farmers with their digital financial footprints to help improve their credit-worthiness.</li>
            </ol>
          </div>
          <div className="image-box">
            <img className="about-image" src={farmer} alt={"farmer"} />
          </div>

        </div>
        <div className="section-field">

          <div>
            <h3>.. for the consumer:</h3>
            <ol>
              <li>Mitigate the risk of exposure to Coronavirus by facilitating contactless purchasing.</li>
              <li>Provide a way to benefit from better (lower) prices.</li>
              <li>Enable consumers to acquire fresh farm produce directly from the farmer.</li>
              <li>Empower consumers with clear tracability of where their food is produced.</li>
            </ol>
          </div>
          <div className="image-box">
            <img className="about-image" src={consumer} alt={"consumer"} />
          </div>

        </div>
        <div className="section-field">

          <div>
            <h3>.. for the agricultural experts:</h3>
            <ol>
              <li>Experts can broaden their reach by publishing professional content on our blog.</li>
              <li>Experts get to access a wide pool of farmers on our platform.</li>
              <li>We keep working on a set of tools for experts to strengthen their engagement with farmers.</li>
            </ol>
          </div>
          <div className="image-box">
          <img className="about-image" src={agric_expert} alt={"agriculture expert"} />
          </div>

        </div>
      </div>
    </div>
  );
} // About

export default About;

// Route:
// GET /about
