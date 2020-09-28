import React, { useState } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

import "./FirebaseAuth.css";

const uiConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET, // Setup Cloud Storage
};

firebase.initializeApp(uiConfig);

/**
 * FirebaseAuth
 *
 * @returns {object} div
 */
function FirebaseAuth() {
  const [user, setUser] = useState(null);

  const uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.GithubAuthProvider.PROVIDER_ID,
      firebase.auth.TwitterAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      signInSuccess: () => false,
    },
    signInSuccessUrl: "http://localhost:3000",
    // Terms of service url.
    tosUrl: "http://localhost:3000/about",
    // Privacy policy url.
    privacyPolicyUrl: "http://localhost:3000/contact-us",
  }; // uiConfig

  // Listen to login status
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      setUser(user);
      // Create users collection if it doesn't exist.    
      // Add user to users collection if they aren't in it.
      firebase.firestore().collection("users").doc(user.uid).set({
        name: user.displayName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        photoURL: user.photoURL,
        createdAt: user.createdAt ? user.createdAt : "",
        lastLoginAt: user.lastLoginAt ? user.lastLoginAt : "",
        emailVerified: user.emailVerified,
      });

      // Fetch cart if one exists for this user.
      firebase.firestore().collection("carts").doc().get();

      if ("localStorage" in window && window.localStorage !== null) {
        window.localStorage.setItem("user", JSON.stringify(user));
      }
    } // if
  });

  return (
    <div>
      {user ? (
        <div style={{ alignItems: "center" }}>
          You are logged in as {user["email"]}.<br />
          <br />
          <h5>name: {String(user.displayName)}</h5>
          <p>email: {String(user.email)}</p>
          <p>
            <img
              src={user.photoURL}
              alt={user.photoURL}
              style={{
                width: "35%",
                height: "35%",
                borderRadius: "50%",
              }}
            />
          </p>
          <p>uid: {String(user.uid)}</p>
          <p>{user.phoneNumber ? `phone: ${user.phoneNumber}` : ""}</p>
          <br />
          <p>{user.userToken ? `token: ${user.userToken}` : ""}</p>
          <br />
        </div>
      ) : (
        <div>
          <br />
          <StyledFirebaseAuth
            uiConfig={uiConfig}
            firebaseAuth={firebase.auth()}
          />
        </div>
      )}
    </div>
  ); // return
} //FirebaseAuth

export { firebase };
export default FirebaseAuth;
