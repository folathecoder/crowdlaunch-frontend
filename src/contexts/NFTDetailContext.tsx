import React, { ReactElement, ReactNode } from 'react';
import useGetNftById from '@/hooks/RequestHooks/GET/useGetNftById';
import { NftType } from '@/types/projectTypes';
import { FetchingStatus } from '@/types/fetchingTypes';

export interface NFTDetailContextReturnTypes {
  nft: NftType | null;
  nftFetchingStatus: FetchingStatus;
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

  return (
    <NFTDetailContext.Provider value={{ nft, nftFetchingStatus }}>
      {children}
    </NFTDetailContext.Provider>
  );
};

export default NFTDetailProvider;
