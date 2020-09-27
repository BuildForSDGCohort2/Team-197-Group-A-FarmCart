// Declare FB global variable, visible throughout the app.
/*global FB*/
/*eslint no-undef: "error"*/

// Modules
import React, { lazy, Suspense, useContext } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Utils
import "./App.css";
import * as ROUTES from "./constants/routes";

// Context
import { ProductsContext } from "./contexts/ProductsContext";

// Components
import Loading from "./components/Loading";
import Home from "./components/Home";
import SignUp from "./components/SignUp/SignUp";
import SignIn from "./components/SignIn/SignIn";

import Products from "./components/Products/AllProducts";
import ProductDetails from "./components/Products/ProductDetails";
import AddProduct from "./components/Products/AddProduct";
import EditProduct from "./components/Products/EditProduct";

const About = lazy(() => import("./components/About/About"));
const Contact = lazy(() => import("./components/Contact"));

const Footer = lazy(() => import("./components/Footer"));
const Navbar = lazy(() => import("./components/Navbar"));

const ViewCart = lazy(() => import("./components/Cart/ViewCart/ViewCart"));

// const Posts          = lazy(() => import("./components/Blog/ViewPosts"));
// const ViewPost       = lazy(() => import("./components/Blog/ViewPost"));
// const AddPost        = lazy(() => import("./components/Blog/AddPost"));
// const EditPost       = lazy(() => import("./components/Blog/EditPost"));

const Profile = lazy(() => import("./components/Profile/ViewProfile"));
const Dashboard = lazy(() => import("./components/Dashboard"));
const Admin = lazy(() => import("./components/Admin/Admin"));

/**
 * App is the main component of the entire application.
 *
 * @returns {object} router
 */
function App() {
  // Enable Facebook Analytics for entire app
  window.fbAsyncInit = function () {
    FB.init({
      appId: "{your-app-id}",
      cookie: true,
      xfbml: true,
      version: "{api-version}",
    });

    FB.AppEvents.logPageView();
  };

  (function (d, s, id) {
    var js,
      fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
      return;
    }
    js = d.createElement(s);
    js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  })(document, "script", "facebook-jssdk");

  // Global app context variables
  const { products } = useContext(ProductsContext);

  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <div className="App">
          <div id="fb-root"></div>
          <script
            async
            defer
            crossOrigin="anonymous"
            src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v8.0&appId=982705708861822&autoLogAppEvents=1"
            nonce="AXsd99GC"
          ></script>
          <header className="App-header">
            <Navbar />
          </header>

          <main>
            <div>
              <Switch>
                <Route
                  exact
                  path={ROUTES.HOME}
                  component={() => <Home products={products} />}
                />
                <Route path={ROUTES.ABOUT} component={About} />
                <Route path={ROUTES.VIEW_CART} component={ViewCart} />
                <Route path={ROUTES.ADMIN} component={Admin} />
                <Route path={ROUTES.CONTACT} component={Contact} />
                <Route path={ROUTES.DASHBOARD} component={Dashboard} />
                <Route path={ROUTES.ADD_PRODUCT} component={AddProduct} />
                <Route
                  exact
                  path={ROUTES.EDIT_PRODUCT}
                  render={() => <EditProduct products={products} />}
                />
                <Route
                  exact
                  path={ROUTES.PRODUCTS}
                  render={() => <Products products={products} />}
                />
                <Route
                  exact
                  path={ROUTES.PRODUCT_DETAILS}
                  render={() => <ProductDetails products={products} />}
                />
                <Route path={ROUTES.PROFILE} component={Profile} />
                <Route path={ROUTES.SIGN_IN} component={SignIn} />
                <Route exact path={ROUTES.SIGN_UP} render={() => <SignUp />} />
                <Route component={Page404} />
              </Switch>
            </div>
          </main>
        </div>

        <Footer />
      </Suspense>
    </Router>
  ); // return
} // App

export function Page404({ location }) {
  const style404 = {
    marginTop: "15%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    fontSize: "1.7em",
  };

  return (
    <div style={style404}>
      Sorry, we couldn't find the page you requested:
      <br />
      <code
        style={{
          color: "red",
          fontSize: "1.1em",
          fontWeight: "800",
        }}
      >
        {location.pathname}
      </code>
    </div>
  );
} // Page404

export default App;
