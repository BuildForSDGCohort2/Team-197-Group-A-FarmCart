// Modules
import React from 'react';
import { 
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

// Utils
import './App.css';
import * as ROUTES from './constants/routes';

// Components
import About from './components/About';
import Admin from './components/Admin';
import Contact from './components/Contact';
import Dashboard from './components/Dashboard';
import Footer from './components/Footer';
import Home from './components/Home';
import Navbar from './components/Navbar';
import AddProduct from './components/Products/AddProduct';
import EditProduct from './components/Products/EditProduct';
import ProductDetails from './components/Products/ProductDetails';
import Products from './components/Products/AllProducts';
// import AddPost from './components/Blog/AddPost';
// import EditPost from './components/Blog/EditPost';
// import ViewPost from './components/Blog/ViewPost';
// import Posts from './components/Blog/ViewPosts';
import Profile from './components/Profile';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';

function App() {
  return (
    <Router>
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
    </Router>
  ); // return
}; // App

export default App;
