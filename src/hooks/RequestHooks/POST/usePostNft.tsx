import { useState } from 'react';
import useReadTokenURI from '@/hooks/useReadTokenURI';
import { FetchingStatus } from '@/types/fetchingTypes';
import usePostAuth from './usePostAuth';
import { NFTPostData } from '@/types/nftTypes';

interface ReturnType {
  nftData: NFTPostData | null;
  fetchError: string | null;
  fetchStatus: FetchingStatus;
  createNFT: () => Promise<void>;
}

interface PropType {
  tokenURI: string;
  projectCategoryId: string;
}

const usePostNft = ({ tokenURI, projectCategoryId }: PropType): ReturnType => {
  const { data, loading: loadingURI } = useReadTokenURI({ tokenURI: tokenURI });
  const { userData } = usePostAuth();
  const { token } = userData || {};

  const [nftData, setNftData] = useState<NFTPostData | null>(null);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [fetchStatus, setFetchStatus] = useState<FetchingStatus>(
    FetchingStatus.Default
  );

  const createNFT = async () => {
    if (data && !loadingURI) {
      setFetchStatus(FetchingStatus.Loading);

      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/Nft`, {
        method: 'POST',
        headers: {
          accept: '*/*',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          nftName: data.name,
          nftDescription: data.description,
          price: 0,
          nftImage: data.image,
          nftWalletAddress: tokenURI,
          categoryId: projectCategoryId,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          setNftData(data);
          setFetchStatus(FetchingStatus.Fetched);
        })
        .catch((err) => {
          setFetchError(err.message);
          setFetchStatus(FetchingStatus.Error);
        });
    }
  };

  console.log('nft data', nftData, fetchError, fetchStatus, data);

  return { nftData, fetchError, fetchStatus, createNFT };
};

export default usePostNft;
