import {
  useContractRead,
  useBalance,
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from 'wagmi';
import WalletContractABI from 'contracts/abi/accountContractABI.json';
import { weiConverter, weiToEther } from '@/helpers/weiConverter';
import useWallet from '@/wallet/useWallet';

interface ReturnType {
  walletOwner: `0x${string}`;
  startBalance: string | number;
  totalWithdrawals: string | number;
  totalDeposits: string | number;
  paidDividends: string | number;
  currentBalance?: string;
  walletAddress: `0x${string}`;
  withdraw: (amount: number) => Promise<void>;
  isWithdrawalSuccess: boolean;
  isWithdrawalLoading: boolean;
  isWithdrawalError: boolean;
}

interface PropType {
  contractAddress: `0x${string}`;
  withdrawAmount: number;
}

const useGetWalletInfo = ({
  contractAddress,
  withdrawAmount,
}: PropType): ReturnType => {
  const { wallet } = useWallet();

  // Read account owner from the smart contract
  const { data: accountOwner } = useContractRead({
    address: contractAddress,
    abi: WalletContractABI,
    functionName: 'accountOwner',
    chainId: 11155111,
    watch: true,
  });

  // Read start balance from the smart contract
  const { data: startBalance } = useContractRead({
    address: contractAddress,
    abi: WalletContractABI,
    functionName: 'startBalance',
    chainId: 11155111,
    watch: true,
  });

  // Read start balance from the smart contract
  const { data: totalWithdrawals } = useContractRead({
    address: contractAddress,
    abi: WalletContractABI,
    functionName: 'totalWithdrawals',
    chainId: 11155111,
    watch: true,
  });

  // Read total deposits from the smart contract
  const { data: totalDeposits } = useContractRead({
    address: contractAddress,
    abi: WalletContractABI,
    functionName: 'totalDeposits',
    chainId: 11155111,
    watch: true,
  });

  // Read total paid dividends from the smart contract
  const { data: paidDividends } = useContractRead({
    address: contractAddress,
    abi: WalletContractABI,
    functionName: 'paidDividends',
    chainId: 11155111,
    watch: true,
  });

  // Read the wallet balance
  const currentBalance = useBalance({
    address: contractAddress,
    chainId: 11155111,
    watch: true,
    formatUnits: 'ether',
  });

  // Prepare contract write configuration for withdraw function
  const { config: createWithdrawConfig } = usePrepareContractWrite({
    address: contractAddress,
    abi: WalletContractABI,
    functionName: 'withdraw',
    chainId: 11155111,
    account: wallet.walletAddress as `0x${string}`,
    args: [weiConverter(withdrawAmount)],
  });

  // Write withdraw data to the contract
  const { write: writeWithdrawal, data: withdrawalData } =
    useContractWrite(createWithdrawConfig);

  // Wait for the withdrawal function transaction to complete
  const {
    isSuccess: isWithdrawalSuccess,
    isLoading: isWithdrawalLoading,
    isError: isWithdrawalError,
  } = useWaitForTransaction({
    hash: withdrawalData?.hash,
  });

  const withdraw = async (amount: number) => {
    await writeWithdrawal?.();
  };

  return {
    walletOwner: accountOwner as `0x${string}`,
    startBalance: startBalance ? weiToEther(startBalance as bigint) : 0,
    totalWithdrawals: totalWithdrawals
      ? weiToEther(totalWithdrawals as bigint)
      : 0,
    totalDeposits: totalDeposits ? weiToEther(totalDeposits as bigint) : 0,
    paidDividends: paidDividends ? weiToEther(paidDividends as bigint) : 0,
    currentBalance: currentBalance.data?.formatted,
    walletAddress: contractAddress,
    withdraw,
    isWithdrawalSuccess,
    isWithdrawalLoading,
    isWithdrawalError,
  };
};

export default useGetWalletInfo;
