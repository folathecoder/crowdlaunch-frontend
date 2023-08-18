import axios from 'axios';
import { useState, useEffect } from 'react';
import { FetchingStatus } from '@/types/fetchingTypes';
import usePostAuth from './usePostAuth';
import { LikeReturnType } from '@/types/projectTypes';
import useWallet from '@/wallet/useWallet';
import useGetUserByAddress from '../GET/useGetUserByAddress';

interface NftLikeReturnType {
  nftLike: LikeReturnType | null;
  error: string | null;
  fetchingStatus: FetchingStatus;
  handleLikeNft: () => void;
  likeStatus: LikeReturnType | null;
  checkLikeStatus: FetchingStatus;
  likeStatusError: string | null;
  handleUnLikeNft: (nftLikeId: string) => void;
  userLikes: boolean;
  noOfLikes: number;
  fetchingLikeStatus: FetchingStatus;
  handleFetchLikeCount: () => void;
  userLikedStatus: FetchingStatus;
  userUnLikedStatus: FetchingStatus;
}

interface PropType {
  nftId?: string;
}

const usePostLikeNft = ({ nftId }: PropType): NftLikeReturnType => {
  const { wallet } = useWallet();
  const { userData, fetchingStatus: userFetched } = usePostAuth();
  const { token } = userData || {};
  const { user } = useGetUserByAddress({
    jwtToken: token,
  });

  const [userLikedStatus, setUserLikedStatus] = useState<FetchingStatus>(
    FetchingStatus.Default
  );
  const [userUnLikedStatus, setUserUnLikedStatus] = useState<FetchingStatus>(
    FetchingStatus.Default
  );
  const [likeStatus, setLikeStatus] = useState<LikeReturnType | null>(null);
  const [likeStatusError, setLikeStatusError] = useState<string | null>(null);
  const [checkLikeStatus, setCheckLikeStatus] = useState<FetchingStatus>(
    FetchingStatus.Default
  );
  const [userLikes, setUserLikes] = useState(false);
  const [nftLike, setnftLike] = useState<LikeReturnType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [fetchingStatus, setFetchingStatus] = useState<FetchingStatus>(
    FetchingStatus.Default
  );
  const [fetchingLikeStatus, setFetchingLikeStatus] = useState<FetchingStatus>(
    FetchingStatus.Default
  );
  const [noOfLikes, setNoOfLikes] = useState(0);

  // Fetch updated number of likes
  const handleFetchLikeCount = async () => {
    setFetchingLikeStatus(FetchingStatus.Loading);

    axios
      .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/nftlikes/NftLike`, {
        headers: {
          accept: 'application/json',
        },
      })
      .then((response) => {
        const likes: LikeReturnType[] = response.data.filter(
          (item: LikeReturnType) => item.nftId === nftId
        );

        setNoOfLikes(likes.length);
        setUserLikes(likes.some((like) => like.userId === user?.user.userId));
        setFetchingLikeStatus(FetchingStatus.Fetched);
      })
      .catch((error) => {
        setLikeStatusError(error);
        setFetchingLikeStatus(FetchingStatus.Error);
      });
  };

  useEffect(() => {
    if (nftId) {
      handleFetchLikeCount();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nftId, token, userData?.walletAddress, user?.user.userId, nftLike]);

  const handleLikeNft = async () => {
    if (
      wallet.walletAddress &&
      userFetched === FetchingStatus.Fetched &&
      token
    ) {
      setUserLikedStatus(FetchingStatus.Loading);

      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/nftlikes/NftLike`, {
        method: 'POST',
        headers: {
          accept: '*/*',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          nftId: `${nftId}`,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          setnftLike(data);
          setUserLikedStatus(FetchingStatus.Fetched);
        })
        .catch((err) => {
          setError(err.message);
          setUserLikedStatus(FetchingStatus.Error);
        });
    }
  };

  const handleUnLikeNft = async (nftLikeId: string) => {
    if (
      wallet.walletAddress &&
      userFetched === FetchingStatus.Fetched &&
      token
    ) {
      setUserUnLikedStatus(FetchingStatus.Loading);

      fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/nftlikes/NftLike/${nftLikeId}`,
        {
          method: 'DELETE',
          headers: {
            accept: '*/*',
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          setUserUnLikedStatus(FetchingStatus.Fetched);
          setnftLike(data);
        })
        .catch((err) => {
          setError(err.message);
          setUserUnLikedStatus(FetchingStatus.Error);
        });
    }
  };

  const handleUserLike = async () => {
    setCheckLikeStatus(FetchingStatus.Loading);

    if (nftId && user?.user?.userId && token) {
      axios
        .get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/nftlikes/NftLike/get-by-user-id-and-nft-id?userId=${user.user.userId}&nftId=${nftId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              accept: 'application/json',
            },
          }
        )
        .then((response) => {
          setLikeStatus(response.data);
          setCheckLikeStatus(FetchingStatus.Fetched);
        })
        .catch((error) => {
          setLikeStatusError(error);
          setCheckLikeStatus(FetchingStatus.Error);
        });
    }
  };

  useEffect(() => {
    handleUserLike();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nftId, token, userData?.walletAddress, user?.user.userId, nftLike]);

  return {
    nftLike,
    fetchingStatus,
    error,
    handleLikeNft,
    handleUnLikeNft,
    likeStatus,
    checkLikeStatus,
    likeStatusError,
    userLikes,
    noOfLikes,
    fetchingLikeStatus,
    handleFetchLikeCount,
    userLikedStatus,
    userUnLikedStatus,
  };
};

export default usePostLikeNft;
