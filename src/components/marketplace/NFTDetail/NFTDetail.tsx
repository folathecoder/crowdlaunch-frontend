import React, { useContext, useState, useEffect } from 'react';
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
import {
  NavShare,
  NFTExplorer,
  NFTInfo,
  NFTTransaction,
} from '@/components/marketplace/NFTDetail';
import { CustomSkeleton } from '@/components/global';
import Tilt from 'react-parallax-tilt';
import MetaData from '@/seo/metaData';

const NFTDetail = () => {
  const { nft, nftFetchingStatus } = useContext(
    NFTDetailContext
  ) as NFTDetailContextReturnTypes;

  const { nft: nftData } = nft ?? {};

  const [imageData, setImageData] = useState<any>(null);

  // Function to fetch the content of ipfs image url and render the base64 erncoding to the frontend
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
    if (nftData?.nftImage) fetchAndReadContent(nftData?.nftImage);
  }, [nftData?.nftImage]);

  return (
    <>
      <MetaData
        title={nftData?.nftName ?? ''}
        description={nftData?.nftDescription ?? ''}
        ogImageUrl={nftData?.nftImage ?? ''}
      />
      <DetailContainer>
        <div>
          <DetailLeft>
            <div>
              <NavShare mobile />
              <div>
                <Tilt glareEnable glareMaxOpacity={0.4}>
                  <DetailImage>
                    {nftFetchingStatus === 2 && nftData?.nftImage ? (
                      <Image
                        src={imageData ?? ''}
                        alt={nftData.nftName}
                        layout="fill"
                        objectFit="cover"
                      />
                    ) : (
                      <CustomSkeleton
                        height="100%"
                        width="100%"
                        marginTop={1}
                      />
                    )}
                  </DetailImage>
                </Tilt>
                <NFTExplorer mobile />
              </div>
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
    </>
  );
};

export default NFTDetail;
