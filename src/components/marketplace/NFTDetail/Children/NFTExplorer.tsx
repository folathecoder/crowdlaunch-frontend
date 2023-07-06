import React from 'react';
import Link from 'next/link';
import {
  DetailExplorer,
  ExplorerButton,
} from '@/components/marketplace/NFTDetail/NFTDetailStyles';
import { BsBoxArrowUpRight } from 'react-icons/bs';
import { FiCopy } from 'react-icons/fi';

type Props = {
  mobile?: boolean;
};

const NFTExplorer = ({ mobile }: Props) => {
  return (
    <DetailExplorer mobile={mobile}>
      <Link href="http://" target="_blank" rel="noreferrer">
        <ExplorerButton>
          <div>Scan on Ethereum Explorer</div>
          <div>
            <BsBoxArrowUpRight />
          </div>
        </ExplorerButton>
      </Link>
      <Link href="http://" target="_blank" rel="noreferrer">
        <ExplorerButton>
          <div>Contract Address (0x..324)</div>
          <div>
            <FiCopy />
          </div>
        </ExplorerButton>
      </Link>
    </DetailExplorer>
  );
};

export default NFTExplorer;
