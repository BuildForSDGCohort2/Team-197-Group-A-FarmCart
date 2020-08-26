/**
 * search is a pure function that loops through the haystack 
 * in search of the needle.
 *
 * @param {*} needle string
 * @param {*} haystack array
 * @returns {array} array of objects containing search term (needle)
 */
function search(needle, haystack) {
  let results = [];
  haystack = Array.from(haystack);

  if (needle.length > 0) {
    needle = String(needle).toLocaleLowerCase();
  } else {
    return null;
  }

  haystack.map((obj) => {
    const keys = Object.keys(obj);
    // Might result in duplication since the needle may
    // appear in several places within obj
    return keys.map((key) => {
      if (String(obj[key]).toLocaleLowerCase().includes(needle)) {
        return results.push(obj);
      }
    });
  }); // haystack.map

  // Get rid of duplicates & convert the new set back to array
  results = Array.from(new Set(results));

  return results;
} // search

export default search;

// Test the search function
/* 
const data = [
  {
    category: "men clothing",
    description:
      "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
    id: 1,
    image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    price: 109.95,
    title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
  },
  {
    category: "men clothing",
    description:
      "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
    id: 2,
    image:
      "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
    price: 22.3,
    title: "Mens Casual Premium Slim Fit T-Shirts ",
  },
  {
    category: "jewelery",
    description:
      "From our Legends Collection, the Naga was inspired by the mythical water dragon that protects the ocean's pearl. Wear facing inward to be bestowed with love and abundance, or outward for protection.",
    id: 5,
    image: "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg",
    price: 695,
    title:
      "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet",
  },
]; 
*/

/* const jungle = [
  'Slim-fitting style', 
  'contrast raglan long sleeve', 
  'three-button henley placket', 
  'light weight & soft fabric for', 
  'breathable and comfortable wearing',
  'And Solid stitched shirts with round',
  'neck made for durability and a great',
  'fit for casual fashion wear and',
  'diehard baseball fans. The Henley style',
  'round neckline includes a three-button placket'
]
*/

// let searchResults = search("legends", data);
// console.log("\n------searchResults------\n");
// // console.log(Array.isArray(searchResults));
// console.log(searchResults);
