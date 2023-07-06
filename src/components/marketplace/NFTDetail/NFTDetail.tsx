import React from 'react';
import Image from 'next/image';
import {
  DetailContainer,
  DetailLeft,
  DetailRight,
  DetailImage,
} from '@/components/marketplace/NFTDetail/NFTDetailStyles';
import image from 'public/images/nft';
import {
  NavShare,
  NFTExplorer,
  NFTInfo,
  NFTTransaction,
} from '@/components/marketplace/NFTDetail';

const NFTDetail = () => {
  return (
    <DetailContainer>
      <div>
        <DetailLeft>
          <NavShare mobile />
          <div>
            <DetailImage>
              <Image
                src={image.nft2}
                alt={''}
                layout="fill"
                objectFit="cover"
              />
            </DetailImage>
            <NFTExplorer mobile />
          </div>
        </DetailLeft>
        <DetailRight>
          <NavShare />
          <NFTInfo />
          <NFTExplorer />
          <NFTTransaction />
        </DetailRight>
      </div>
    </DetailContainer>
  );
};

export default NFTDetail;
