import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";

import "./FirebaseAuth.css";

const uiConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET, // Setup Cloud Storage
};

firebase.initializeApp(uiConfig);

/**
 * FirebaseAuth sets up firebase and handles all sign up
 * and sign in functionalities.
 *
 * @returns {object} div
 */
function FirebaseAuth() {
  const history = useHistory();
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
    signInSuccessWithAuthResult: "/",
    // Terms of service url.
    tosUrl: "/tos",
    // Privacy policy url.
    privacyPolicyUrl: "/privacy",
  }; // uiConfig

  // Listen to login status
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      setUser(user);
      // Create users collection if it doesn't exist.
      // Add user to users collection if they aren't in it.
      firebase
        .firestore()
        .collection("users")
        .doc(user.uid)
        .set({
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
        <div>
          {
            // On successful login, redirect user to products
            // page and reload page.
            user &&
              (() => {
                history.push("/");
                window.location.reload();
              })()
          }
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
