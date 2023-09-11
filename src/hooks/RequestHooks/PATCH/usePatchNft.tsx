import axios from 'axios';
import { useState } from 'react';
import { FetchingStatus } from '@/types/fetchingTypes';
import { NFTPostType } from '@/types/nftTypes';

interface ReturnType {
  fetchingStatus: FetchingStatus;
  error: any;
  updateNftData: (data: NFTPostType, nftId: string) => Promise<any>;
}

const usePatchNft = (): ReturnType => {
  const [error, setError] = useState<any>(null);
  const [fetchingStatus, setFetchingStatus] = useState<FetchingStatus>(
    FetchingStatus.Default
  );

  const updateNftData = async (data: NFTPostType, nftId: string) => {
    if (data)
      try {
        setFetchingStatus(FetchingStatus.Loading);

        const response = await axios.patch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/Nft/${nftId}`,
          data,
          {
            headers: {
              accept: '*/*',
            },
          }
        );

        if (response.status === 204) {
          setFetchingStatus(FetchingStatus.Fetched);
        }

        return response.data;
      } catch (error) {
        setError(error);
        setFetchingStatus(FetchingStatus.Error);
      }
  };

  return { fetchingStatus, error, updateNftData };
};

export default usePatchNft;
