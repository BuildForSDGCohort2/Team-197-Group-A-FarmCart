// Modules
import React, { useEffect, useState } from "react";
import { pure } from "recompose";

// Utils
import "./allProducts.css";
import search from "../../../utils/search";

// Components
import ErrorDiv from "../../ErrorDiv";
import AddToCart from "../../Cart/AddToCart";

const Products = pure(() => {
  const dataUrl = "https://fakestoreapi.com/products";
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [needle, setNeedle] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    fetch(dataUrl)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((err) => setError({ err }));
  }, [dataUrl]);

  const onChangeHandler = (evt) => {
    setNeedle(evt.target.value);
  };

  const onSubmitHandler = (evt) => {
    evt.preventDefault();
    if (needle.length === 0) {
      document.getElementById("searchResultsReport").innerHTML =
        "Nothing Found!";
      return;
    } else {
      const results = search(needle, products);
      setNeedle("");
      setSearchResults(results);
    
      let found;
      switch (results.length) {
        case 0:
          found = `No Items Found!`;
          break;
        case 1:
          found = `1 Item Found`;
          break;
        default:
          found = `${results.length} Items Found`;
      }
      document.getElementById("searchResultsReport").innerHTML = found;
    }
  };

  // Render the fetched products by default.
  // If there are any search results, return those instead.
  const itemsToRender = searchResults.length > 0 ? searchResults : products;

  const productsDOM =
    itemsToRender &&
    itemsToRender.map((product) => (
      <div className="product-card" key={product.id}>
        <b>{product.title}</b>
        <br />
        <img
          src={product.image}
          alt={product.title}
          style={{
            height: 100,
            width: 150,
            padding: 3,
          }}
        />
        <br />
        <span className="labels">Price: </span>
        {product.price}
        <br />
        <span className="labels">Description: </span>
        {product.description && String(product.description).substring(0, 170)}
        <br />
        <span className="labels">Category: </span>
        {product.category && product.category}
        <br />
        <br />
        <br />
        <AddToCart className="add-to-cart" id={product.id} />
      </div>
    )); // products.map

  return (
    <>
      <div className="search-area">
        <div>
          <span id="searchResultsReport"></span>
        </div>
        <form onSubmit={onSubmitHandler}>
          <input
            className="search"
            type="text"
            name="search"
            placeholder="Search Products"
            value={needle}
            onChange={onChangeHandler}
          />
          <button type="submit" className="go-search">
            Go..
          </button>
        </form>
      </div>

      <div className="products-view">
        <ErrorDiv error={error} />
        <div className="products">{productsDOM}</div>
      </div>
    </>
  ); // return
}); // Products

export default Products;

// Endpoint:
// GET /products
