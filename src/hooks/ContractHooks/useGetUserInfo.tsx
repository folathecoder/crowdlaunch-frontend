import { useState, useEffect } from 'react';
import { useContractRead } from 'wagmi';
import CrowdfundContractABI from 'contracts/abi/crowdfundContractABI.json';
import useWallet from '@/wallet/useWallet';
import { weiToEther } from '@/helpers/weiConverter';

interface UserInfoType {
  userId: number;
  userAddress: `0x${string}`;
  totalInvestedAmount: string;
  totalDividendEarned: string;
  claimableBalance: string;
}

const useGetUserInfo = () => {
  const [userInfo, setUserInfo] = useState<UserInfoType | null>(null);
  const { wallet } = useWallet();

  // Read user data from the contract
  const { data: userData } = useContractRead({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
    abi: CrowdfundContractABI,
    functionName: 'users',
    chainId: 11155111,
    args: [wallet.walletAddress as `0x${string}`],
    watch: true,
  });

  const user = userData as Array<any>;

  useEffect(() => {
    if (user) {
      setUserInfo({
        userId: Number(user[1]),
        userAddress: user[2],
        totalInvestedAmount: weiToEther(user[3]),
        totalDividendEarned: weiToEther(user[4]),
        claimableBalance: weiToEther(user[7]),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return { userInfo };
};

export default useGetUserInfo;
