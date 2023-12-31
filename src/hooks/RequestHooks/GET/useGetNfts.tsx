import axios from 'axios';
import { useState, useEffect } from 'react';
import { FetchingStatus } from '@/types/fetchingTypes';
import { NftMainType } from '@/types/projectTypes';
import { useRouter } from 'next/router';

interface NftReturnType {
  nfts: NftMainType[] | null;
  fetchingStatus: FetchingStatus;
  error: string | null;
}

const useGetNfts = (): NftReturnType => {
  const router = useRouter();
  const [nfts, setNfts] = useState<NftMainType[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [fetchingStatus, setFetchingStatus] = useState<FetchingStatus>(
    FetchingStatus.Default
  );

  useEffect(() => {
    setFetchingStatus(FetchingStatus.Loading);

    axios
      .get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/Nft/with-price-filter${
          router.asPath.split('/marketplace')[1]
        }`,
        {
          headers: {
            accept: 'application/json',
          },
        }
      )
      .then((response) => {
        setNfts(response.data);
        setFetchingStatus(FetchingStatus.Fetched);
      })
      .catch((error) => {
        setError(error);
        setFetchingStatus(FetchingStatus.Error);
      });
  }, [router.asPath]);

  return { nfts, error, fetchingStatus };
};

export default useGetNfts;
