// Modules
import React, { createContext, useState, useEffect } from "react";

import { firebase } from "../components/FirebaseAuth";
import "firebase/firestore";

export const ProductsContext = createContext([]);

const SetProductsContext = ({ children }) => {
  // const dataUrl = "https://fakestoreapi.com/products";
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch data from Firestore.
    function fetchData() {
      const db = firebase.firestore();
      db.collection("products").onSnapshot((snapshot) => {
        const docs = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        setProducts(docs);
      });
    }
    fetchData();
  }, []);

  if (products.length) {
    if ("localStorage" in window && window.localStorage !== null) {
      window.localStorage.setItem("products", JSON.stringify(products));
    }
  }

  return (
    <ProductsContext.Provider value={{ products }}>
      {children}
    </ProductsContext.Provider>
  );
}; // SetProductsContext

const ProductsProvider = SetProductsContext;

export default ProductsProvider;
