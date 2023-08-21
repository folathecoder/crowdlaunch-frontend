/**
 * Ensures a string contains at most one decimal point by
 * combining all the decimal parts after the first decimal point.
 *
 * @param str - The input string to process.
 * @returns A string with at most one decimal point.
 */
export const handleDecimals = (str: string): string => {
  const parts = str.split('.');
  if (parts.length > 2) {
    return parts[0] + '.' + parts.slice(1).join('');
  }
  return str;
};

/**
 * Sanitizes an input string by allowing only numbers and a single decimal point.
 *
 * @param inputValue - The input value to sanitize.
 * @returns A sanitized string containing only numbers and at most one decimal point.
 */
export const sanitizeInputValue = (inputValue: string): string => {
  let numericValue = inputValue.replace(/[^0-9.]/g, '');

  const parts = numericValue.split('.');
  if (parts.length > 2) {
    numericValue = parts.shift() + '.' + parts.join('');
  }

  return numericValue;
};

/**
 * Validates if a given project form string is complete. The string is deemed complete
 * if it does not have any standalone '**' sequences, which are presumably placeholders.
 * The function ensures that '**' does not occur at the beginning, end, or adjacent to other '*'.
 *
 * @param {string} str - The project form string to be validated.
 * @returns {boolean} Returns true if the string is complete, false otherwise.
 *
 * @example
 * const isValid = isProjectFormComplete("This is a valid **project** form.");
 * console.log(isValid); // Expected output: true
 *
 * const isNotValid = isProjectFormComplete("**This is an invalid project form.");
 * console.log(isNotValid); // Expected output: false
 */

export const isProjectFormComplete = (str: string): boolean => {
  const matches = str.match(/\*\*/g);

  if (!matches) return true;

  for (let i = 0, len = matches.length; i < len; i++) {
    const index = str.indexOf('**');
    if (
      index === 0 ||
      str[index - 1] === '*' ||
      index + 2 === str.length ||
      str[index + 2] === '*'
    ) {
      return false;
    }
    str = str.substring(index + 2);
  }
  return true;
};
