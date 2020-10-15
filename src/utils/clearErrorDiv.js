/**
 * clearErrorDiv is a helper function that clears the
 * errorDiv below after duration(seconds) has elapsed.
 *
 * @param {number} duration
 * @param {string} divId
 * @returns {undefined|string} returns either undefined on 
 * success, or an error message string on failure.
 */
function clearErrorDiv(duration, divId) {
  try {
    if (document.getElementById(String(divId)).textContent !== "") {
      const timer = setInterval(() => {
        duration -= 1;
        try {
          if (duration === 0) {
            document.getElementById(String(divId)).textContent = "";
            clearInterval(timer);
            return;
          }
        } catch(error) {
          console.log(error.message);
          return error.message;
        }
      }, 1000);
    } // if
  } catch (error) {
    console.log(error.message);
    return error.message;
  }
} // clearErrorDiv

export default clearErrorDiv;
