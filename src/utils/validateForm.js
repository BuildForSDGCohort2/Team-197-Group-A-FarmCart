/**
 * validateForm checks user input for errors and populates
 * the inputErrors object if any were found.
 *
 * @param {*} rawState object with data to inspect.
 * @param {*} errorsObject object to hold errors if any.
 * @param {*} errorDiv string reference of error div id.
 * @param {*} clearErrorDiv function to clear error div.
 * @returns {boolean} returns true if it finds any errors,
 * false otherwise.
 */
const validateForm = (rawState, errorsObject, errorDiv, clearErrorDiv) => {
  // Populate errorDiv div if any errors are found.
  for (const [key, value] of Object.entries(rawState)) {
    if (key && !value) {
      errorsObject.error = "All fields are required!";
    }
  }
  
  // Display error div and clear it after 3 seconds.
  if (errorsObject.error) {
    document.getElementById(String(errorDiv)).textContent = errorsObject.error;
    clearErrorDiv(3, String(errorDiv));
    return true;
  } else {
    return false;
  }
}; // validateForm

export default validateForm;
