import { utils } from 'ethers';

// Convert Ether value to Wei
export const weiConverter = (etherValue: number): bigint => {
  // Convert Ether to Wei using the conversion factor
  const weiValue: bigint = BigInt(Math.floor(etherValue * 1e18));
  return weiValue;
};

export function weiToEther(wei: bigint): string {
  const ether = utils.formatEther(wei);
  return ether;
}
