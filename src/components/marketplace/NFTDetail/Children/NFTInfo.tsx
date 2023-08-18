import React, { useContext } from 'react';
import {
  NFTDetailContext,
  NFTDetailContextReturnTypes,
} from '@/contexts/NFTDetailContext';
import Image from 'next/image';
import {
  DetailContent,
  DetailPrice,
  Creator,
  CreatorImage,
} from '@/components/marketplace/NFTDetail/NFTDetailStyles';
import image from 'public/images/nft';
import { Button } from '@/components/global';
import { CURRENCY_SYMBOL } from '@/data/appInfo';
import { CustomSkeleton } from '@/components/global';

const NFTInfo = () => {
  const { nft, nftFetchingStatus } = useContext(
    NFTDetailContext
  ) as NFTDetailContextReturnTypes;

  const { nft: nftData } = nft || {};

  return (
    <DetailContent>
      {nftFetchingStatus === 2 ? (
        <h1>{nftData?.nftName}</h1>
      ) : (
        <CustomSkeleton height={25} width={220} marginTop={1} />
      )}
      <DetailPrice>
        <div>
          <div>
            {nftFetchingStatus === 2 ? (
              <h2>
                {nftData?.price.toLocaleString()} {CURRENCY_SYMBOL}
              </h2>
            ) : (
              <CustomSkeleton height={25} width={120} marginTop={1} />
            )}
          </div>
          {nftFetchingStatus === 2 && (
            <div>
              <Button buttonTitle="BUY" buttonType="link" buttonLink="/" />
            </div>
          )}
        </div>
      </DetailPrice>
      {nftFetchingStatus === 2 ? (
        <>
          <Creator>
            <div>
              <CreatorImage>
                <Image src={image.creator4} alt={''} layout="responsive" />
              </CreatorImage>
              <div>
                <h4>Creator</h4>
                <p>Ghost Rider</p>
              </div>
            </div>
          </Creator>
          <p>{nftData?.nftDescription}</p>
        </>
      ) : (
        <CustomSkeleton height={200} width="100%" marginTop={1} />
      )}
    </DetailContent>
  );
};

export default NFTInfo;
