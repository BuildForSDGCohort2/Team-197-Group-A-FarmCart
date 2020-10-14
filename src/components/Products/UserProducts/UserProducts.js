import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { pure } from "recompose";

import { firebase } from "../../FirebaseAuth/FirebaseAuth";
import "firebase/firestore";

// Components
import AddToCart from "../../Cart/AddToCart";

function UserProducts() {
  const history = useHistory();
  const { id } = useParams();

  const [userProducts, setUserProducts] = useState();
  
  const onClickCardHandler = (id) => {
    history.push(`/products/${id}`);
  };

  useEffect(() => {
    function fetchData() {
      firebase
        .firestore()
        .collection("products")
        .where("uid", "==", String(id))
        .get()
        .then((snapshot) => {
          const products = [];
          snapshot.docs.forEach((doc) => {
            products.push(doc.data());
          });
          setUserProducts(products);
          console.log(products);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    fetchData();
  }, [id]);

  let seller;
  if (userProducts) {
    seller = userProducts[0].seller;
  }

  const productsDOM =
    userProducts &&
    userProducts.map((product) => {
      return (
        <>
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
                width: 50,
                textAlign: "center",
                color: "white",
              }}
            >
              {product.price}
            </span>
            <br />
            <span className="labels">Quantity Available: </span>
            {product.quantity &&
              `${
                product.quantity
              } ${product.unitOfMeasure.toLocaleLowerCase()}`}
            <br />
            <span className="labels">Description: </span>
            {product.description &&
              String(product.description).substring(0, 180)}
            <br />
            <span className="labels">Category: </span>
            {product.category && product.category}
            <br />
            <br />
            <br />
            <AddToCart className="add-to-cart" id={product.id} />
          </div>
        </>
      ); // return
    }); // products.map

  return (
    <>
      {seller && <h3>Products by {seller}</h3>}
      {/* <div className="search-area">
        <div>
          <span id="searchResultsReport">{searchReport && searchReport}</span>
        </div>
        <form onSubmit={onSubmitHandler}>
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
      </div> */}

      <div className="products-view">
        <div className="products">{productsDOM}</div>
      </div>
    </>
  ); // return
} // UserProducts

export default pure(UserProducts);

// Route:
// GET /users/:id/products
