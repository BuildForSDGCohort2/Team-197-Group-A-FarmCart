import { firebase } from "../components/FirebaseAuth";
import "firebase/firestore";

// Cart object to hold all cart operations.
const CartService = {};

/**
 * CartService.createCart creates a new cart and assigns it
 * a unique id.
 *
 * @returns {object} returns an empty cart object.
 */
CartService.createCart = () => {
  const user = JSON.parse(window.localStorage.getItem("user"));
  let cartPrefix;
  try {
    if (user) {
      cartPrefix = user.uid.substring(user.uid.length - 4);
      cartPrefix = cartPrefix ? cartPrefix : "cart";
    }
    const id = Date.now();
    const cartId = cartPrefix + String(id).substring(String(id).length - 4);

    return {
      cartId,
      items: [],
      uid: user.uid,
    };
  } catch (error) {
    console.log(error.message);
  }
}; // createCart

/**
 * CartService.retrieveCartFromDb fetches the current user's cart
 * from the database and puts it in the localStorage.
 *
 * @returns undefined
 */
CartService.retrieveCartFromDb = () => {
  const user = JSON.parse(window.localStorage.getItem("user"));

  try {
    if (user.uid) {
      async function fetchCart() {
        await firebase
          .firestore()
          .collection("carts")
          .doc(user.uid)
          .get()
          .then((snapshot) => {
            const cart = snapshot.data();
            if (
              window.localStorage !== null &&
              "localStorage" in window &&
              cart
            ) {
              window.localStorage.removeItem("myCart");
              window.localStorage.setItem("myCart", JSON.stringify(cart));
              return true;
            }
          })
          .catch((error) => {
            console.log(error.message);
            return false;
          });
      } // fetchCart

      fetchCart();
    } // if
  } catch (error) {
    console.log("User not signed in!");
  }
}; // retrieveCart

/**
 * CartService.totalItemsInCart takes a cart object and adds
 * up the quantities of all the items in it.
 *
 * @param {*} cartObject
 * @returns {number} returns total number of items in cart.
 */
CartService.totalItemsInCart = (cartObject) => {
  let allItemsInCart = 0;
  try {
    cartObject.items.forEach((item) => {
      allItemsInCart += item.quantity;
    });

    return allItemsInCart;
  } catch (error) {
    console.log(error);
  }
}; // totalItemsInCart

/**
 * CartService.addItemToCart takes a cart object and a product
 * object then adds it to the cart.
 *
 * @param {*} cartObject
 * @param {*} product
 * @returns {object} returns updated cart object.
 */
CartService.addItemToCart = (cartObject, product) => {
  const updatedCart = {};

  /** addItemToCart algorithm
   *
   * Check if product exists in cart.
   * If so return the cart as it is.
   * If not, add product to cart.
   * Grab everything in cartObject and put it in updatedCart.
   * Return updatedCart.
   */
  if (cartObject.items) {
    if (cartObject.items.some((item) => item.id === product.id)) {
      window.alert("Item already in cart.");
      return cartObject;
    } else {
      cartObject.items.push(product);
      window.alert("Item added to cart successfully.");
    }
  } else {
    cartObject.items.push(product);
  }
  Object.assign(updatedCart, cartObject);

  return updatedCart;
}; // addItemToCart

/**
 * CartService.getCartItems takes a cart object and returns
 * an array of items in it.
 *
 * @param {Object} cartObject
 * @returns {(Array|Object)} returns cart items arrays or an
 * error object.
 */
CartService.getCartItems = (cartObject) => {
  try {
    return cartObject.items;
  } catch (error) {
    if (error) {
      return false;
    }
  }
}; // getCartItems

/**
 * CartService.getNumCartItems takes a cart object and returns
 * the number of unique items in it.
 *
 * @param {Object} cartObject
 * @returns {number} number of unique items in the cart.
 */
CartService.getNumCartItems = (cartObject) => {
  try {
    return cartObject.items.length;
  } catch (error) {
    if (error) {
      return false;
    }
  }
}; // getNumCartItems

export default CartService;
