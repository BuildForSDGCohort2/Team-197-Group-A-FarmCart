import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

// Context
import ProductsProvider from "./contexts/ProductsContext";

// const user = window.localStorage.getItem("user");
// const UserContext = createContext([]);
// const UserProvider = ({ children }) => {
//   return (
//     <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
//   );
// }; // UserProvider

ReactDOM.render(
    <ProductsProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </ProductsProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
