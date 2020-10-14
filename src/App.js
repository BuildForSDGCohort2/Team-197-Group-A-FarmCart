// Declare FB global variable, visible throughout the app.
/*global FB*/
/*eslint no-undef: "error"*/

// Modules
import React, { Suspense, useContext } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Utils
import "./App.css";
import * as ROUTES from "./constants/routes";

import CartService from "./services/cart.service";

// Context
import { ProductsContext } from "./contexts/ProductsContext";

// General Components
import ProtectedRoute from "./components/ProtectedRoute";
import Loading from "./components/Loading";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import SignUp from "./components/SignUp";
import About from "./components/About/About";
import Contact from "./components/Contact";
import Tos from "./components/Legal/Tos";
import PrivacyPolicy from "./components/Legal/PricacyPolicy";
import CookiePolicy from "./components/Legal/CookiePolicy";

// Products components
import AddProduct from "./components/Products/AddProduct";
import Products from "./components/Products/AllProducts";
import UserProducts from "./components/Products/UserProducts";
import ProductDetails from "./components/Products/ProductDetails";
import EditProduct from "./components/Products/EditProduct";

import ViewCart from "./components/Cart/ViewCart/ViewCart";

// Users components
import EditProfile from "./components/Profile/EditProfile";
import Profile from "./components/Profile/ViewProfile";
// import UserProfile    from"./components/Profile/UserProfile";
import Dashboard from "./components/Dashboard";
import Admin from "./components/Admin/Admin";

// Blog components
// import Posts          from "./components/Blog/ViewPosts";
// import ViewPost       from "./components/Blog/ViewPost";
// import AddPost        from "./components/Blog/AddPost";
// import EditPost       from "./components/Blog/EditPost";

/**
 * App is the main component of the entire application.
 *
 * @returns {Object} router
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

  // Global app variables
  const { products } = useContext(ProductsContext);
  const user = JSON.parse(window.localStorage.getItem("user"));

  CartService.retrieveCartFromDb();

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
                {/* Public routes */}
                {/* home, signup, about, contact, tos, footer */}
                <Route
                  exact
                  path={ROUTES.HOME}
                  component={() => <Home products={products} />}
                />
                <Route exact path={ROUTES.SIGN_UP} render={() => <SignUp />} />
                <Route exact path={ROUTES.ABOUT} component={About} />
                <Route exact path={ROUTES.CONTACT} component={Contact} />
                <Route exact path={ROUTES.TOS} component={Tos} />
                <Route exact path={ROUTES.PRIVACY} component={PrivacyPolicy} />
                <Route
                  exact
                  path={ROUTES.COOKIE_POLICY}
                  component={CookiePolicy}
                />

                <Route exact path={ROUTES.ADMIN} component={Admin} />
                <Route exact path={ROUTES.DASHBOARD} component={Dashboard} />

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

                <Route
                  exact
                  path={ROUTES.USER_PRODUCTS}
                  render={() => <UserProducts />}
                />

                {/* Protected routes */}
                <ProtectedRoute exact path={ROUTES.PROFILE}>
                  <Profile />
                </ProtectedRoute>

                <ProtectedRoute exact path={ROUTES.EDIT_PROFILE}>
                  <EditProfile user={user} />
                </ProtectedRoute>

                <ProtectedRoute exact path={ROUTES.ADD_PRODUCT}>
                  <AddProduct />
                </ProtectedRoute>

                <ProtectedRoute exact path={ROUTES.EDIT_PRODUCT}>
                  <EditProduct products={products} />
                </ProtectedRoute>

                <ProtectedRoute exact path={ROUTES.VIEW_CART}>
                  <ViewCart />
                </ProtectedRoute>

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
