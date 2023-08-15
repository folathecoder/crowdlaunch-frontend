export const shortenWalletAddress = (address: string) =>
  `${address.slice(0, 6)}...${address.slice(address.length - 4)}`;

export const durationInSeconds = (endDate: string): number => {
  const end = new Date(endDate);
  const now = new Date();
  const differenceInMillis = end.getTime() - now.getTime();

  if (differenceInMillis < 0) {
    throw new Error('End date must be in the future.');
  }

  return Math.floor(differenceInMillis / 1000);
};
