import React from "react";

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
