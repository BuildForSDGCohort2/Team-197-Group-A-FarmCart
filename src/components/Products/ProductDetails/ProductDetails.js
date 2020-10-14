// Modules
import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { pure } from "recompose";

import { firebase } from "../../FirebaseAuth";
import "./ProductDetails.css";

// Components
import AddToCart from "../../Cart/AddToCart";
import DeleteProduct from "../DeleteProduct";

/**
 * ProductDetails extracts products from ProductsContext and
 * returns either null or a component with a rendering of the
 * product details.
 *
 * @param {*} { products }
 * @returns {object} null | div
 */
function ProductDetails({ products }) {
  let myCart = JSON.parse(window.localStorage.getItem("myCart"));
  const history = useHistory();
  let { id } = useParams();
  const user = JSON.parse(window.localStorage.getItem("user"));
  
  const [fetchedProduct, setFetchedProduct] = useState([]);

  if (!products.length) {
    products = JSON.parse(window.localStorage.getItem("products"));
  }

  function setProduct(products) {
    let localProductArray;
    if (products !== null) {
      localProductArray = products.filter(
        (product) => String(product.id) === String(id)
      );
    }
    return localProductArray[0];
  }
  let localProduct = setProduct(products);

  const onClickHandler = () => {
    id = id.toString();
    history.push(`/products/${id}/edit`);
  };

  useEffect(() => {
    function fetchProduct() {
      firebase
        .firestore()
        .collection("products")
        .doc(id)
        .get()
        .then((product) => {
          setFetchedProduct(product.data());
        })
        .catch((error) => {
          console.log(error);
        });
    } // fetchProduct

    fetchProduct();
  }, [id]); // useEffect

  const currentUserID = user ? user.uid : "";

  if (!localProduct) {
    return null;
  } else {
    const product = localProduct ? localProduct : fetchedProduct;
    
    return (
      <>
        <div className="product-details">
          <h3>{product.name}</h3>
          <div>
            <img
              src={product.image}
              alt={product.name}
              style={{
                height: 100,
                width: 150,
                objectFit: "cover",
              }}
            />
            {user && user.uid === product.uid ? (
              <div
                style={{
                  float: "right",
                }}
              >
                <DeleteProduct id={id} />
              </div>
            ) : (
              ""
            )}
          </div>
          <div>
            <span className="labels">Type: </span>
            {product.type}
          </div>
          <br />
          <div>
            <span className="labels">Seller: </span>
            {product.seller}
          </div>
          <div>
            <span className="labels">Location: </span>
            {product.location}
          </div>

          <div>
          <span className="labels">Price</span> (KES)<span className="labels">:</span> 

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
          </div>

          <div>
            <span className="labels">Quantity Available: </span>
            {product.quantity && product.quantity}
          </div>

          <div>
            <span className="labels">Description: </span>
            {product.description && product.description.substring(0)}
          </div>

          <div>
            <span className="labels category">Category: </span>
            {product.category}
          </div>
          <br />
          <br />
          <div
            className="buttonyard"
            style={{
              marginTop: 10,
            }}
          >
            {user && user.uid === product.uid ? (
              <button
                className="edit-button"
                type="button"
                onClick={onClickHandler}
              >
                Edit Product
              </button>
            ) : (
              ""
            )}
            {user && currentUserID === product.uid ? "" : <AddToCart className="add-to-cart" myCart={myCart} id={id} />}
            {/* <AddToCart myCart={myCart} id={id} /> */}
          </div>
        </div>
      </>
    );
  }
} // ProductDetails

export default pure(ProductDetails);

// Route:
// GET /products/:id
