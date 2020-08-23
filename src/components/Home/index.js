// Modules
import React, { useEffect, useState } from "react";
import { pure } from "recompose";

// Utils
import "./home.css";

const Home = pure(() => {
  const dataUrl = "https://fakestoreapi.com/products";
  let [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(dataUrl)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((err) => console.error(err));
  }, [dataUrl]);

  const productsDOM = products && products.map((product) => (
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
      {product.description}
      <br />
      <span className="labels">Category: </span>
      {product.category}
      <br />
    </div>
  )); // products.map

  return (
    <div className="home">
      <h1>Home</h1>
      <div className="products">{ productsDOM }</div>
    </div>
  ); // return
}); // Home

export default Home;

// Route:
// GET /
