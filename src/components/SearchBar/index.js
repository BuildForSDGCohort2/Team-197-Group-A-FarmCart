import React from "react";

/**
 *
 *
 * @param {*} { searchKey, productsArray }
 * @returns
 */
function SearchBar({ searchKey, productsArray }) {
  const results = search(searchKey, productsArray);
  const resultsDOM = results && results.map((product) => {

  });
  
  return (
    <div>
      <h1>Search Bar</h1>
    </div>
  );
} // SearchBar

export default SearchBar;

/** 
 * 
 * 
*/
