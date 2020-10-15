// Key:
// RL ==> requires login
// NL ==> no login required


// Auth
export const SIGN_UP = "/sign-up"; // NL

// Users
export const ADMIN = "/admin";// RL
export const PROFILE = "/profile";// RL 
export const USER_PROFILE = "/users/:id/profile"; // NL
export const DASHBOARD = "/dashboard";// RL
export const EDIT_PROFILE = "/profile/edit";// RL

// General
export const HOME = "/"; // NL
export const ABOUT = "/about"; // NL
export const CONTACT = "/contact-us"; // NL
export const TOS = "/tos"; // NL
export const PRIVACY = "/privacy"; // NL
export const COOKIE_POLICY = "/cookie-policy"; // NL

// Products
export const ADD_PRODUCT = "/add-product";// RL
export const PRODUCTS = "/products"; // NL
export const PRODUCT_DETAILS = "/products/:id"; // NL
export const USER_PRODUCTS = "/products/users/:id"; // NL
export const EDIT_PRODUCT = "/products/:id/edit";// RL

// Carts
export const VIEW_CART = "/cart/view";// RL
export const CHECK_OUT = "/cart/view/checkout";// RL

// Posts
export const ADD_POST = "/blog/add";// RL
export const POSTS = "/blog"; // NL
export const VIEW_POST = "/blog/:id"; // NL
export const USER_POSTS = "/blog/users/:id"; // NL
export const EDIT_POST = "/blog/:id/edit"; // RL
