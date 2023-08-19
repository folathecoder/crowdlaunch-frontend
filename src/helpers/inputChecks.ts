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
  // Allow only numbers and a single period.
  let numericValue = inputValue.replace(/[^0-9.]/g, '');

  // If there are multiple decimal points, keep only the first one.
  const parts = numericValue.split('.');
  if (parts.length > 2) {
    numericValue = parts.shift() + '.' + parts.join('');
  }

  return numericValue;
};
