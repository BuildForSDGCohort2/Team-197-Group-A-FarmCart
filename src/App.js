// Modules
import React, { lazy, Suspense, useContext } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Utils
import "./App.css";
import * as ROUTES from "./constants/routes";

// Context
import { UserContext } from "./contexts/UserContext";
import { ProductsContext } from "./contexts/ProductsContext";

// Components
import Loading from "./components/Loading";
import Home from "./components/Home";
import ProductDetails from "./components/Products/ProductDetails";

const Products = lazy(() => import("./components/Products/AllProducts"));
const About = lazy(() => import("./components/About"));
const Admin = lazy(() => import("./components/Admin"));
const Contact = lazy(() => import("./components/Contact"));
const Dashboard = lazy(() => import("./components/Dashboard"));
const Footer = lazy(() => import("./components/Footer"));
const Navbar = lazy(() => import("./components/Navbar"));
const AddProduct = lazy(() => import("./components/Products/AddProduct"));
const EditProduct = lazy(() => import("./components/Products/EditProduct"));
// const Posts          = lazy(() => import("./components/Blog/ViewPosts"));
// const ViewPost       = lazy(() => import("./components/Blog/ViewPost"));
// const AddPost        = lazy(() => import("./components/Blog/AddPost"));
// const EditPost       = lazy(() => import("./components/Blog/EditPost"));
const Profile = lazy(() => import("./components/Profile"));
const SignIn = lazy(() => import("./components/SignIn"));
const SignUp = lazy(() => import("./components/SignUp"));

/**
 * App is the main component of the entire application. 
 *
 * @returns {object} router
 */
function App() {
  const { user } = useContext(UserContext);
  const { products } = useContext(ProductsContext);
  console.log(`User: ${user}`);

  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <div className="App">
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
                <Route path={ROUTES.SIGN_UP} component={SignUp} />
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
