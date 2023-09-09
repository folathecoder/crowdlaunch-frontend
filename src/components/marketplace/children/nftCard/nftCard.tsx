import React, { useState, useEffect } from 'react';
import { IpfsImage } from 'react-ipfs-image';
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
import { renderIPFSImage } from '@/helpers/ipfsImageReader';

interface PropType {
  nftId: string;
}

const NFTCard = ({ nftId }: PropType) => {
  const { nft, fetchingStatus } = useGetNftById({ nftId });
  const { nft: data } = nft || {};

  const [imageData, setImageData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  function fetchAndReadContent(linkUrl: string) {
    fetch(linkUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.text();
      })
      .then((content) => {
        setImageData(content);
      })
      .catch((error) => {
        console.error('Error fetching and reading content:', error);
      });
  }

  useEffect(() => {
    if (data?.nftImage) fetchAndReadContent(data?.nftImage);
  }, [data?.nftImage]);

  return (
    <>
      {fetchingStatus === 2 && data && (
        <Link href={`/nft/${data?.nftId}`} passHref>
          <NFTContainer>
            <NFTImageContainer>
              <Image
                src={imageData ?? ''}
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
