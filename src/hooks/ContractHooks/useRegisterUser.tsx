import { useEffect, useState } from 'react';
import {
  usePrepareContractWrite,
  useContractWrite,
  useContractRead,
  useWaitForTransaction,
} from 'wagmi';
import CrowdfundContractABI from 'contracts/abi/crowdfundContractABI.json';
import useWallet from '@/wallet/useWallet';
import { checkAddressIsValid } from 'src/helpers/checkAddressIsValid';

interface ReturnType {
  handleRegisterUser: () => void;
  isRegisterSuccess: boolean;
  isRegisterLoading: boolean;
  isRegisterIdle: boolean;
  isRegisterError: boolean;
  isReadingUserError: boolean;
  isReadingUserLoading: boolean;
}

const useRegisterUser = (): ReturnType => {
  const { wallet } = useWallet();
  const [isUserRegistered, setIsUserRegistered] = useState(false);

  // Prepare contract write configuration for registerUser function
  const { config: registerUserConfig } = usePrepareContractWrite({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
    abi: CrowdfundContractABI,
    functionName: 'registerUser',
    chainId: 11155111,
    account: wallet.walletAddress as `0x${string}`,
  });

  // Write user data to the contract
  const { write: registerUserOnContract, data: registerUserData } =
    useContractWrite(registerUserConfig);

  // Wait for the registerUser function transaction to complete
  const {
    isSuccess: isRegisterSuccess,
    isLoading: isRegisterLoading,
    isError: isRegisterError,
    isIdle: isRegisterIdle,
  } = useWaitForTransaction({
    hash: registerUserData?.hash,
  });

  // Read user data from the contract
  const {
    data: userData,
    isError: isReadingUserError,
    isLoading: isReadingUserLoading,
  } = useContractRead({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
    abi: CrowdfundContractABI,
    functionName: 'users',
    chainId: 11155111,
    account: wallet.walletAddress as `0x${string}`,
    args: [wallet.walletAddress as `0x${string}`],
  });

  // Convert userData to an array of strings
  const readData = userData as Array<string>;

  // Check if user is already registered on the contract and save the status
  useEffect(() => {
    if (readData) {
      setIsUserRegistered(checkAddressIsValid(readData[2] as `0x${string}`));
    }
  }, [readData]);

  // Function to register a user on the blockchain via the contract
  const handleRegisterUser = async () => {
    if (!isUserRegistered) {
      registerUserOnContract?.();
    }
  };

  return {
    handleRegisterUser,
    isRegisterSuccess,
    isRegisterLoading,
    isRegisterIdle,
    isRegisterError,
    isReadingUserError,
    isReadingUserLoading,
  };
};

export default useRegisterUser;
