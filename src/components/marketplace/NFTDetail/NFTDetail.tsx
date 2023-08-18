import React, { useContext } from 'react';
import {
  NFTDetailContext,
  NFTDetailContextReturnTypes,
} from '@/contexts/NFTDetailContext';
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
import { CustomSkeleton } from '@/components/global';

const NFTDetail = () => {
  const { nft, nftFetchingStatus } = useContext(
    NFTDetailContext
  ) as NFTDetailContextReturnTypes;

  const { nft: nftData } = nft || {};

  return (
    <DetailContainer>
      <div>
        <DetailLeft>
          <NavShare mobile />
          <div>
            <DetailImage>
              {nftFetchingStatus === 2 && nftData?.nftImage ? (
                <Image
                  src={nftData.nftImage}
                  alt={nftData.nftName}
                  layout="fill"
                  objectFit="cover"
                />
              ) : (
                <CustomSkeleton height="100%" width="100%" marginTop={1} />
              )}
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
