import { useContractRead } from 'wagmi';
import CrowdfundContractABI from 'contracts/abi/crowdfundContractABI.json';

interface ReturnType {
  nextTokenId: number;
  isTokenIdError: boolean;
  isTokenIdLoading: boolean;
}

const useGetTokenId = (): ReturnType => {
  // Read token id data from the contract
  const {
    data: tokenIdData,
    isError: isTokenIdError,
    isLoading: isTokenIdLoading,
  } = useContractRead({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
    abi: CrowdfundContractABI,
    functionName: '_nextTokenId',
    chainId: 11155111,
  });

  const nextTokenId = Number(tokenIdData) + 1;

  return { nextTokenId, isTokenIdError, isTokenIdLoading };
};

export default useGetTokenId;
