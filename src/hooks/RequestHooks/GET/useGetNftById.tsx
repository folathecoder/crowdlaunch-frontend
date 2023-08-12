import axios from 'axios';
import { useState, useEffect } from 'react';
import { FetchingStatus } from '@/types/fetchingTypes';
import { NftType } from '@/types/projectTypes';

interface PropsType {
  nftId: string;
}

interface NftReturnType {
  nft: NftType | null;
  fetchingStatus: FetchingStatus;
  error: string | null;
}

const useGetNftById = ({ nftId }: PropsType): NftReturnType => {
  const [nft, setNft] = useState<NftType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [fetchingStatus, setFetchingStatus] = useState<FetchingStatus>(
    FetchingStatus.Default
  );

  useEffect(() => {
    setFetchingStatus(FetchingStatus.Loading);

    axios
      .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/Nft/${nftId}`, {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_DEFAULT_JWT}`,
          accept: 'application/json',
        },
      })
      .then((response) => {
        setNft(response.data);
        setFetchingStatus(FetchingStatus.Fetched);
      })
      .catch((error) => {
        setError(error);
        setFetchingStatus(FetchingStatus.Error);
      });
  }, [nftId]);

  return { nft, error, fetchingStatus };
};

export default useGetNftById;
