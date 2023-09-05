import { useBalance } from 'wagmi';

interface DataType {
  decimals: number;
  formatted: string;
  symbol: string;
  value: bigint;
}

interface ReturnType {
  data?: DataType;
  isLoading: boolean;
  isFetching: boolean;
  isSuccess: boolean;
  isError: boolean;
  isFetched: boolean;
}

interface PropType {
  userWalletAddress?: `0x${string}`;
}

// Get Wallet Balance from User's Wallet using Wagmi Library

const useGetWalletBalance = ({ userWalletAddress }: PropType): ReturnType => {
  const { data, isError, isLoading, isSuccess, isFetching, isFetched } =
    useBalance({
      address: userWalletAddress,
      watch: true,
      chainId: 11155111,
    });

  return { data, isError, isLoading, isSuccess, isFetching, isFetched };
};

export default useGetWalletBalance;
