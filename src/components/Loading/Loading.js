import React from "react";
import { css } from "@emotion/core";
import RingLoader from "react-spinners/RingLoader";
 
function Loading() {
  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;

  return (
    <div style={{ 
      marginTop: 200,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      fontSize: 30,
      fontWeight: 700,
    }}>
      <RingLoader
          css={override}
          size={70}
          color={"#76ff03"}
          loading={"..."}
        />
    </div>
  );
} // Loading

export default Loading;
