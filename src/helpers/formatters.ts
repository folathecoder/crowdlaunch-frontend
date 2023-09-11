// Shortens a wallet address for display
export const shortenWalletAddress = (address: string) =>
  `${address.slice(0, 6)}...${address.slice(address.length - 4)}`;

// Calculates time duration in seconds until a given future date
export const durationInSeconds = (endDate: string): number => {
  const end = new Date(endDate);
  const now = new Date();
  const differenceInMillis = end.getTime() - now.getTime();
  if (differenceInMillis < 0) {
    throw new Error('End date must be in the future.');
  }
  return Math.floor(differenceInMillis / 1000);
};

// Converts time duration from seconds to days
export const secondsToDays = (seconds: number) => {
  return Math.round(seconds / (24 * 60 * 60));
};

// Calculates time duration in seconds from now to a future date string
export const secondsFutureDate = (futureDateString: string): number => {
  const futureDate = new Date(futureDateString);
  if (isNaN(futureDate.getTime())) {
    console.error(`Invalid date format: ${futureDateString}`);
    return NaN;
  }
  const currentDate = new Date();
  const timeDifferenceMillis = futureDate.getTime() - currentDate.getTime();
  return Math.floor(timeDifferenceMillis / 1000);
};

// Formats a number using a 4-4-3-4 pattern separated by dashes
export const formatNumberWithDashes = (num: number): string => {
  const paddedNum = num.toString().padStart(4, '0');
  const parts = [
    paddedNum.slice(0, 4),
    paddedNum.slice(4, 8),
    paddedNum.slice(8, 11),
    paddedNum.slice(11),
  ].filter((part) => part !== '');
  return parts.join('-');
};

// Converts a number in scientific notation to decimal string
export function convertToDecimal(
  scientificNotationString: string,
  fixedDecimalPlaces: number = 20
): string {
  const decimalNumber: number = parseFloat(scientificNotationString);
  let decimalString: string = decimalNumber.toFixed(fixedDecimalPlaces);
  if (decimalString.indexOf('.') > 0) {
    decimalString = decimalString.replace(/0+$/, '');
  }
  if (decimalString.endsWith('.')) {
    decimalString = decimalString.substring(0, decimalString.length - 1);
  }
  return decimalString;
}

// Formats a price value to 8 decimal places without trailing zeros
export function formatPriceValue(num: number): string {
  let formatted = num.toFixed(8);
  formatted = formatted.replace(/\.?0+$/, '');
  return formatted.toLocaleString();
}

// Extracts the last number following a hash (#) symbol in a string
export function extractNumberBehindLastHash(input: string): number | null {
  const match = input.match(/#(\d+)(?!.*#\d+)/);
  if (match && match[1]) {
    return parseInt(match[1], 10);
  }
  return null;
}
