// Modules
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { pure } from "recompose";

// import { firebase } from "../../FirebaseAuth/FirebaseAuth";
// import "firebase/firestore";

// Utils
import "./AllProducts.css";
import search from "../../../utils/search";

// Components
import AddToCart from "../../Cart/AddToCart";

/**
 * 
 *
 * @param {*} { products }
 * @returns {Object} returns 
 */
const Products = ({ products }) => {
  const history = useHistory();

  // State.
  const [needle, setNeedle] = useState("");
  const [searchReport, setSearchReport] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const onClickCardHandler = (id) => {
    history.push(`/products/${id}`);
  };

  const onChangeHandler = (evt) => {
    setNeedle(evt.target.value);
  };

  const onSubmitHandler = (evt) => {
    evt.preventDefault();
    if (needle.length === 0) {
      setSearchReport("Nothing Found!");
      return;
    } else {
      const results = search(needle, products);
      setNeedle("");
      setSearchResults(results);

      let found;
      switch (results.length) {
        case 0:
          found = "No Items Found!";
          setSearchReport(found);
          break;
        case 1:
          found = "1 Item Found";
          setSearchReport(found);
          break;
        default:
          found = `${results.length} Items Found`;
          setSearchReport(found);
      } // switch
    } // else
  }; // onSubmitHandler

  const myCart = JSON.parse(window.localStorage.getItem("myCart"));
  const user = JSON.parse(window.localStorage.getItem("user"));
  const localProducts = JSON.parse(window.localStorage.getItem("products"));
  const currentUserID = user ? user.uid : "";

  // Render the fetched products by default.
  // If there are any search results, render those instead.
  const itemsToRender = searchResults.length ? searchResults : localProducts;

  const productsDOM =
    itemsToRender &&
    itemsToRender.map((product) => {
      return (
        <div
          className="product-card"
          key={product.id}
          onClick={() => onClickCardHandler(product.id)}
        >
          <b>{product.name}</b>
          <br />
          <img
            src={product.image}
            alt={product.name}
            style={{
              height: 100,
              width: 150,
              objectFit: "cover",
            }}
          />
          <br />
          <span className="labels">Type: </span>
          {product.type}
          <br />
          <br />
          <span className="labels">Seller: </span>
          {product.seller}
          <br />
          <span className="labels">Location: </span>
          {product.location}
          <br />
          <span className="labels">Price</span> (KES)
          <span className="labels">:</span>
          <span
            style={{
              float: "right",
              backgroundColor: "#d500f9",
              borderRadius: "10%",
              minWidth: 50,
              paddingLeft: 5,
              paddingRight: 5,
              marginRight: 10,
              textAlign: "center",
              color: "white",
            }}
          >
            {product.price}
          </span>
          <br />
          <span className="labels">Quantity Available: </span>
          {product.quantity &&
            `${product.quantity} ${product.unitOfMeasure.toLocaleLowerCase()}`}
          <br />
          <span className="labels">Description: </span>
          {product.description && String(product.description).substring(0, 180)}
          <br />
          <span className="labels">Category: </span>
          {product.category && product.category}
          <br />
          <br />
          <br />
          {user && currentUserID === product.uid ? "" : <AddToCart className="add-to-cart" myCart={myCart} id={product.id} />}
        </div>
      ); // return
    }); // products.map

  return (
    <>
      <div className="search-area">
        <div>
          <span id="searchResultsReport">{searchReport && searchReport}</span>
        </div>
        <form onSubmit={onSubmitHandler}>
          <label labelfor="search"></label>
          <input
            className="search"
            type="text"
            name="search"
            placeholder="Search Products"
            autoComplete="search"
            value={needle}
            onChange={onChangeHandler}
          />
          <button type="submit" className="go-search">
            Go..
          </button>
        </form>
      </div>

      <div className="products-view">
        <div className="products">{productsDOM}</div>
      </div>
    </>
  ); // return
}; // Products

export default pure(Products);

// Endpoint:
// GET /products
