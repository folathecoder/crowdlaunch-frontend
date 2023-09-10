import { useState } from 'react';
import { FetchingStatus } from '@/types/fetchingTypes';
import usePostAuth from './usePostAuth';
import { NFTPostData } from '@/types/nftTypes';

interface ReturnType {
  nftData: NFTPostData | null;
  fetchError: string | null;
  fetchStatus: FetchingStatus;
  addNftToCollection: (nftId: string) => Promise<void>;
}

const usePostNft = (): ReturnType => {
  const { userData } = usePostAuth();
  const { token } = userData ?? {};

  const [nftData, setNftData] = useState<NFTPostData | null>(null);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [fetchStatus, setFetchStatus] = useState<FetchingStatus>(
    FetchingStatus.Default
  );

  const addNftToCollection = async (nftId: string) => {
    if (nftId) {
      setFetchStatus(FetchingStatus.Loading);

      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user-nfts/UserNft`, {
        method: 'POST',
        headers: {
          accept: '*/*',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          nftId: nftId,
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

  return { nftData, fetchError, fetchStatus, addNftToCollection };
};

export default usePostNft;
