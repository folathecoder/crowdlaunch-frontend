import React from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import NFTDetailProvider from '@/contexts/NFTDetailContext';
import { NFTDetailLayout } from '@/components/marketplace/NFTDetail';
import { fetchAllNfts } from '@/helpers/requests/nftRequests';

interface PropsType {
  nftId: string;
}

const NFTDetail = ({ nftId }: PropsType) => {
  return (
    <main>
      <NFTDetailProvider nftId={nftId}>
        <NFTDetailLayout />
      </NFTDetailProvider>
    </main>
  );
};

export const getStaticProps: GetStaticProps<
  PropsType,
  { nftId: string }
> = async ({ params }) => {
  if (!params || !params.nftId) {
    return {
      notFound: true,
    };
  }

  return {
    props: { nftId: params.nftId },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const nfts = await fetchAllNfts();

  return {
    paths:
      nfts?.map((nft) => ({
        params: { nftId: nft.nftId },
      })) || [],
    fallback: false,
  };
};

export default NFTDetail;
