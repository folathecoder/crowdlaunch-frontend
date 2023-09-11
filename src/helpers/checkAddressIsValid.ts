// Function to check if a dynamic contract address exist
export const checkAddressIsValid = (address: `0x${string}`): boolean => {
  return (
    address !== ('0x0000000000000000000000000000000000000000' as `0x${string}`)
  );
};
