import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  NFTContainer,
  NFTImageContainer,
  NFTTitle,
  NFTInfo,
  NFTCreator,
} from './nftCardStyles';
import { NFTCardTypes } from '@/types/nftTypes';

const nftPrice = 19;

interface NFTCardComponentTypes {
  data: NFTCardTypes;
}

const NFTCard = ({ data }: NFTCardComponentTypes) => {
  const { id, NFTName, NFTImage, NFTCreatorImage, NFTCreatorName } = data;
  return (
    <Link href="/" passHref>
      <NFTContainer>
        <NFTImageContainer>
          <Image src={NFTImage} alt={NFTName} />
        </NFTImageContainer>
        <NFTTitle>
          <div>
            <h3 aria-label="NFT number tag">#{id}</h3>
            <h4 aria-label="NFT name">{NFTName}</h4>
          </div>
          <div>
            <NFTCreator>
              <Image src={NFTCreatorImage} alt={NFTCreatorName} />
            </NFTCreator>
          </div>
        </NFTTitle>
        <NFTInfo>
          <div>
            <h5>Chain</h5>
            <p>Ethereum</p>
          </div>
          <div>
            <h5>Price</h5>
            <p>{nftPrice.toLocaleString()} ETH</p>
          </div>
        </NFTInfo>
      </NFTContainer>
    </Link>
  );
};

export default NFTCard;
