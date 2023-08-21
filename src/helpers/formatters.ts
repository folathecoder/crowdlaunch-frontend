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
