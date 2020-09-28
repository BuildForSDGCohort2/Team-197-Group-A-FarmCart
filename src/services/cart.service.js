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
  if (user) {
    cartPrefix = user.uid.substring(user.uid.length - 4);
    cartPrefix = cartPrefix ? cartPrefix : "cart";
  }
  const id = Date.now();
  const cartId = cartPrefix + String(id).substring(String(id).length - 4);

  return {
    cartId,
    items: [],
  };
}; // createCart

/**
 * CartService.totalItemsInCart takes a cart object and adds
 * up the quantities of all the items in it.
 *
 * @param {*} cartObject
 * @returns {number} returns total number of items in cart.
 */
CartService.totalItemsInCart = (cartObject) => {
  let allItemsInCart = 0;
  cartObject.items.forEach((item) => {
    allItemsInCart += item.quantity;
  });

  return allItemsInCart;
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

  /** addItemToCart algo
   *
   * check if product exists in cart
   * if so return the cart as it is
   * if not, add product to cart
   * grab everything in cartObject and put it in updatedCart
   * return updatedCart
   */

  if (cartObject.items) {
    if (cartObject.items.some((item) => item.id === product.id)) {
      window.alert("Item already in cart.");
      return cartObject;
    } else {
      cartObject.items.push(product);
      window.alert("Item successfully added to cart.");
    }
  } else {
    cartObject.items.push(product);
  }
  Object.assign(updatedCart, cartObject);

  return updatedCart;
}; // addItemToCart

CartService.getCartItems = (cartObject) => {
  return cartObject.items;
};

CartService.getNumCartItems = (cartObject) => {
  return cartObject.items.length;
};

export default CartService;

// Sample products; (test data)
/* 
const product1 = {
  category: "men clothing",
  id: 1,
  unitOfMeasure: "Kg",
  price: 109.95,
  quantity: 2,
  name: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
};

const product2 = {
  category: "men clothing",
  id: 2,
  unitOfMeasure: "Kg",
  price: 22.3,
  quantity: 3,
  name: "Mens Casual Premium Slim Fit T-Shirts ",
};

const product5 = {
  category: "jewelery",
  id: 5,
  unitOfMeasure: "Kg",
  price: 695,
  quantity: 1,
  name:
    "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet",
};
*/
/* 
CartService function signatures.
  createCart, 
  totalItemsInCart(cartObject), 
  addItemToCart(cartObject, productObject),
  getCartItems(cartObject),
  getNumCartItems(cartObject),
*/

// Test the CartService methods.
/* 
const c2 = CartService.createCart();
console.log("cart", c2);
CartService.addItemToCart(c2, product5);
CartService.addItemToCart(c2, product1);
CartService.addItemToCart(c2, product2);
console.log(`Number of items in cart`);
console.log(CartService.getNumCartItems(c2));
console.log("\n\n----------cart----------");
console.log(CartService.getCartItems(c2));
*/

/** CartItem
 *
 * category,
 * id,
 * unitOfMeasure,
 * price,
 * quantity,
 * name,
 *
 */
