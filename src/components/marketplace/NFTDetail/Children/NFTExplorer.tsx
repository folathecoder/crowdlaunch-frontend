import React, { useContext } from 'react';
import {
  NFTDetailContext,
  NFTDetailContextReturnTypes,
} from '@/contexts/NFTDetailContext';
import Link from 'next/link';
import {
  DetailExplorer,
  ExplorerButton,
} from '@/components/marketplace/NFTDetail/NFTDetailStyles';
import { BsBoxArrowUpRight } from 'react-icons/bs';
import { CustomSkeleton } from '@/components/global';
import useGetUsers from '@/hooks/RequestHooks/GET/useGetUsers';
import { shortenWalletAddress } from '@/helpers/formatters';
import { ETHERSCAN_URL } from '@/data/appInfo';

type Props = {
  mobile?: boolean;
};

const NFTExplorer = ({ mobile }: Props) => {
  const { nft, nftFetchingStatus } = useContext(
    NFTDetailContext
  ) as NFTDetailContextReturnTypes;

  const { users } = useGetUsers();

  const owner = users?.filter((user) => user.userId === nft?.nft.ownerId)[0];

  return (
    <DetailExplorer mobile={mobile}>
      {nftFetchingStatus === 2 ? (
        <Link
          href={`${ETHERSCAN_URL}/address/${owner?.walletAddress}`}
          target="_blank"
          rel="noreferrer"
        >
          <ExplorerButton>
            <div>Scan on Ethereum Explorer</div>
            <div>
              <BsBoxArrowUpRight />
            </div>
          </ExplorerButton>
        </Link>
      ) : (
        <CustomSkeleton
          height={60}
          width="100%"
          marginBottom={1}
          marginTop={2}
        />
      )}
      {nftFetchingStatus === 2 ? (
        <Link
          href={`${ETHERSCAN_URL}/address/${owner?.walletAddress}`}
          target="_blank"
          rel="noreferrer"
        >
          <ExplorerButton>
            <div>
              Contract Address (
              {shortenWalletAddress(owner?.walletAddress ?? '')})
            </div>
            <div>
              <BsBoxArrowUpRight />
            </div>
          </ExplorerButton>
        </Link>
      ) : (
        <CustomSkeleton height={60} width="100%" />
      )}
    </DetailExplorer>
  );
};

export default NFTExplorer;
