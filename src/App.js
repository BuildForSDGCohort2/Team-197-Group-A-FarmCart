// Modules
import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Utils
import "./App.css";
import * as ROUTES from "./constants/routes";

// Components
import Loading from "./components/Loading";
import Home from "./components/Home";
// const Home           = lazy(() => import("./components/Home"));
const About          = lazy(() => import("./components/About"));
const Admin          = lazy(() => import("./components/Admin"));
const Contact        = lazy(() => import("./components/Contact"));
const Dashboard      = lazy(() => import("./components/Dashboard"));
const Footer         = lazy(() => import("./components/Footer"));
const Navbar         = lazy(() => import("./components/Navbar"));
const AddProduct     = lazy(() => import("./components/Products/AddProduct"));
const EditProduct    = lazy(() => import("./components/Products/EditProduct"));
const ProductDetails = lazy(() => import("./components/Products/ProductDetails"));
const Products       = lazy(() => import("./components/Products/AllProducts"));
// const AddPost        = lazy(() => import("./components/Blog/AddPost"));
// const EditPost       = lazy(() => import("./components/Blog/EditPost"));
// const ViewPost       = lazy(() => import("./components/Blog/ViewPost"));
// const Posts          = lazy(() => import("./components/Blog/ViewPosts"));
const Profile        = lazy(() => import("./components/Profile"));
const SignIn         = lazy(() => import("./components/SignIn"));
const SignUp         = lazy(() => import("./components/SignUp"));

function App() {
  return (
    <Router>
      <Suspense fallback={<Loading />} >
      <div className="App">
        <header className="App-header">
          <Navbar />
        </header>

        <main>
          <div>
            
            <Switch>
              <Route exact path={ROUTES.HOME} component={Home} />
              <Route path={ROUTES.ABOUT} component={About} />
              <Route path={ROUTES.ADMIN} component={Admin} />
              <Route path={ROUTES.CONTACT} component={Contact} />
              <Route path={ROUTES.DASHBOARD} component={Dashboard} />
              <Route path={ROUTES.ADD_PRODUCT} component={AddProduct} />
              <Route path={ROUTES.EDIT_PRODUCT} component={EditProduct} />
              <Route path={ROUTES.PRODUCT_DETAILS} component={ProductDetails} />
              <Route path={ROUTES.PRODUCTS} component={Products} />
              <Route path={ROUTES.PROFILE} component={Profile} />
              <Route path={ROUTES.SIGN_IN} component={SignIn} />
              <Route path={ROUTES.SIGN_UP} component={SignUp} />
            </Switch>
            
          </div>
        </main>
      </div>

      <Footer />
      </Suspense>
    </Router>
  ); // return
} // App

export default App;
