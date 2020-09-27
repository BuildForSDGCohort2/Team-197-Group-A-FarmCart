import React from "react";

/**
 * ErrorDiv receives an error object as a prop and renders it.
 *
 * @param {*} { error }
 * @returns
 */
function ErrorDiv({ error }) {
  return error ? (
    <div className="error-div">
      <h5>ERROR STREET</h5>
      {`Sorry. There was an error! ${error.message}`}
    </div>
  ) : (
    ""
  );
} // ErrorDiv

export default ErrorDiv;
