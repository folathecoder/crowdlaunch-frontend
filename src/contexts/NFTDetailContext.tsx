import React, { ReactElement, ReactNode } from 'react';
import useGetNftById from '@/hooks/RequestHooks/GET/useGetNftById';
import { NftType } from '@/types/projectTypes';
import { FetchingStatus } from '@/types/fetchingTypes';
import useReadTokenURI from '@/hooks/useReadTokenURI';
import { MetadataType } from '@/hooks/useNftMetadataCreator';

export interface NFTDetailContextReturnTypes {
  nft: NftType | null;
  nftFetchingStatus: FetchingStatus;
  tokenURIData: MetadataType | null;
}

interface PropTypes {
  children: ReactNode;
  nftId: string;
}

export const NFTDetailContext =
  React.createContext<NFTDetailContextReturnTypes | null>(null);

const NFTDetailProvider = ({ children, nftId }: PropTypes): ReactElement => {
  const { nft, fetchingStatus: nftFetchingStatus } = useGetNftById({
    nftId: nftId,
  });

  const { data: tokenURIData } = useReadTokenURI({
    tokenURI: nft?.nft.nftWalletAddress ?? '',
  });

  return (
    <NFTDetailContext.Provider value={{ nft, nftFetchingStatus, tokenURIData }}>
      {children}
    </NFTDetailContext.Provider>
  );
};

export default NFTDetailProvider;
