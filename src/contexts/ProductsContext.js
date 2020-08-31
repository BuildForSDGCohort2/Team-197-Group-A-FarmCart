import React, { createContext, useState, useMemo } from "react";

export const ProductsContext = createContext([]);

const SetProductsContext = ({ children }) => {
  const dataUrl = "https://fakestoreapi.com/products";
  const [products, setProducts] = useState([]);

  useMemo(() => {
    fetch(dataUrl)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        if ("localStorage" in window && localStorage["window"] !== null) {
          window.localStorage.setItem("products", JSON.stringify(data));
        }
      })
      .catch((err) => console.log({ err }));
  }, []);

  return (
    <ProductsContext.Provider value={{ products }}>
      {children}
    </ProductsContext.Provider>
  );
}; // setProductsContext

const ProductsProvider = SetProductsContext;

export default ProductsProvider;
