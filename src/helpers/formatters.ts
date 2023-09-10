/**
 * Shortens a wallet address by keeping the first 6 and the last 4 characters,
 * and truncating the middle part with ellipsis.
 *
 * @param {string} address - The full wallet address.
 * @returns {string} The shortened wallet address.
 *
 * @example
 * const shortAddress = shortenWalletAddress("0x123456789012345678901234567890");
 * console.log(shortAddress); // Expected output: "0x1234...7890"
 */
export const shortenWalletAddress = (address: string) =>
  `${address.slice(0, 6)}...${address.slice(address.length - 4)}`;

/**
 * Calculates the duration in seconds from now until a given end date.
 *
 * @param {string} endDate - The end date in a string format.
 * @returns {number} Duration in seconds between now and the end date.
 * @throws {Error} If the end date is in the past.
 *
 * @example
 * const secondsRemaining = durationInSeconds("2023-09-01T12:00:00");
 */
export const durationInSeconds = (endDate: string): number => {
  const end = new Date(endDate);
  const now = new Date();
  const differenceInMillis = end.getTime() - now.getTime();

  if (differenceInMillis < 0) {
    throw new Error('End date must be in the future.');
  }

  return Math.floor(differenceInMillis / 1000);
};

/**
 * Converts a given duration in seconds to its equivalent in days.
 *
 * @param {number} seconds - The duration in seconds.
 * @returns {number} The equivalent duration in days.
 *
 * @example
 * const days = secondsToDays(86400); // Expected output: 1
 */
export const secondsToDays = (seconds: number) => {
  return Math.round(seconds / (24 * 60 * 60));
};

export const secondsFutureDate = (futureDateString: string): number => {
  // Parse the future date string into a Date object
  const futureDate = new Date(futureDateString);

  // Check if the parsed date is valid
  if (isNaN(futureDate.getTime())) {
    console.error(`Invalid date format: ${futureDateString}`);
    return NaN; // Return NaN to indicate an error
  }

  // Get the current date and time
  const currentDate = new Date();

  // Calculate the time difference in milliseconds
  const timeDifferenceMillis = futureDate.getTime() - currentDate.getTime();

  // Convert milliseconds to seconds
  const secondsDifference = Math.floor(timeDifferenceMillis / 1000);

  return secondsDifference;
};

export const formatNumberWithDashes = (num: number): string => {
  // Convert the number to a string and pad it with zeros to a length of 4
  const paddedNum = num.toString().padStart(4, '0');

  // Split the number into parts: "0000" "0000" "000" "0001"
  const parts = [
    paddedNum.slice(0, 4),
    paddedNum.slice(4, 8),
    paddedNum.slice(8, 11),
    paddedNum.slice(11),
  ].filter((part) => part !== ''); // Remove empty parts

  // Join the parts with dashes
  const formattedNumber = parts.join('-');

  return formattedNumber;
};

export function convertToDecimal(
  scientificNotationString: string,
  fixedDecimalPlaces: number = 20
): string {
  const decimalNumber: number = parseFloat(scientificNotationString);
  let decimalString: string = decimalNumber.toFixed(fixedDecimalPlaces);

  // Remove trailing zeros
  if (decimalString.indexOf('.') > 0) {
    decimalString = decimalString.replace(/0+$/, '');
  }

  // Remove the decimal point if there are no decimal digits left
  if (decimalString.endsWith('.')) {
    decimalString = decimalString.substring(0, decimalString.length - 1);
  }

  return decimalString;
}

export function formatPriceValue(num: number): string {
  // Format number to 6 decimal places
  let formatted = num.toFixed(6);

  // Remove trailing zeros
  formatted = formatted.replace(/\.?0+$/, '');

  return formatted.toLocaleString();
}

export function extractNumberBehindLastHash(input: string): number | null {
  // Regular expression to find the last '#' followed by numbers
  const match = input.match(/#(\d+)(?!.*#\d+)/);

  // If there's a match, return the number behind the last '#' as a number.
  if (match && match[1]) {
    return parseInt(match[1], 10);
  }

  // Return null if no matching number is found.
  return null;
}
