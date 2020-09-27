/**
  * clearErrorDiv is a helper function that clears the 
  * errorDiv below after duration(seconds) has elapsed.
  * 
  * @param {*} duration
  * @returns undefined
  */
 function clearErrorDiv(duration, divId) {
  if (
    document.getElementById(String(divId)).textContent !== ""
  ) {
    const timer = setInterval(() => {
      duration -= 1;
      if (duration === 0) {
        document.getElementById(String(divId)).textContent = "";
        clearInterval(timer);
        return;
      }
    }, 1000);
  }
} // clearErrorDiv

export default clearErrorDiv;
