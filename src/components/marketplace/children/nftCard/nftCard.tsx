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
import useGetNftById from '@/hooks/RequestHooks/GET/useGetNftById';

interface PropType {
  nftId: string;
}

const NFTCard = ({ nftId }: PropType) => {
  const { nft, fetchingStatus } = useGetNftById({ nftId });
  const { nft: data } = nft || {};

  return (
    <>
      {fetchingStatus === 2 && data && (
        <Link href={`/nft/${data?.nftId}`} passHref>
          <NFTContainer>
            <NFTImageContainer>
              <Image
                src="https://media.graphassets.com/aDjrS7P6SuON0hcjBGk8"
                alt={data.nftName}
                layout="fill"
                objectFit="cover"
              />
            </NFTImageContainer>
            <NFTTitle>
              <div>
                <h3 aria-label="NFT number tag">
                  {data.noOfLikes} {data.noOfLikes > 1 ? 'Likes' : 'Like'}
                </h3>
                <h4 aria-label="NFT name">{data.nftName}</h4>
              </div>
            </NFTTitle>
            <NFTInfo>
              <div>
                <h5>Chain</h5>
                <p>Ethereum</p>
              </div>
              <div>
                <h5>Price</h5>
                <p>{data.price.toLocaleString()} ETH</p>
              </div>
            </NFTInfo>
          </NFTContainer>
        </Link>
      )}
    </>
  );
};

export default NFTCard;
