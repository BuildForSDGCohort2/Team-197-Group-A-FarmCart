// Modules
import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";

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
 * @returns {object} null || div
 */
function ProductDetails({ products }) {
  const history = useHistory();
  let { id } = useParams();
  const user = JSON.parse(window.localStorage.getItem("user"));
  
  const [fetchedProduct, setFetchedProduct] = useState([]);

  if (!products.length) {
    products = JSON.parse(window.localStorage.getItem("products"));
  }

  let localProduct;
  function setProduct(products) {
    if (products !== null) {
      localProduct = products.filter(
        (product) => String(product.id) === String(id)
      );
    }
    return localProduct[0];
  }
  localProduct = setProduct(products);

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
          console.log("firestore product");
          console.log(product.data());
          setFetchedProduct(product.data());
        })
        .catch((error) => {
          console.log(error);
        });
    }
    fetchProduct();
  }, [id]);

  if (localProduct === null) {
    return null;
  } else {
    const product = fetchedProduct ? fetchedProduct : localProduct;
    
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
                padding: 3,
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
                width: 50,
                textAlign: "center",
                color: "white",
                marginRight: 10,
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
            <AddToCart id={product.id} />
          </div>
        </div>
      </>
    );
  }
} // ProductDetails

export default ProductDetails;

// Route:
// GET /products/:id
