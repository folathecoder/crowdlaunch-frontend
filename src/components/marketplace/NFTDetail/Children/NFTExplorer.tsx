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
import { FiCopy } from 'react-icons/fi';
import { CustomSkeleton } from '@/components/global';

type Props = {
  mobile?: boolean;
};

const NFTExplorer = ({ mobile }: Props) => {
  const { nft, nftFetchingStatus } = useContext(
    NFTDetailContext
  ) as NFTDetailContextReturnTypes;

  return (
    <DetailExplorer mobile={mobile}>
      {nftFetchingStatus === 2 ? (
        <Link href="http://" target="_blank" rel="noreferrer">
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
        <Link href="http://" target="_blank" rel="noreferrer">
          <ExplorerButton>
            <div>Contract Address (0x..324)</div>
            <div>
              <FiCopy />
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
