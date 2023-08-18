import axios from 'axios';
import { useState, useEffect } from 'react';
import { FetchingStatus } from '@/types/fetchingTypes';
import usePostAuth from './usePostAuth';
import { LikedProjectType } from '@/types/projectTypes';
import useWallet from '@/wallet/useWallet';
import useGetUserByAddress from '../GET/useGetUserByAddress';

interface ProjectLikeReturnType {
  projectLike: LikedProjectType | null;
  error: string | null;
  fetchingStatus: FetchingStatus;
  handleLikeProject: () => void;
  likeStatus: LikedProjectType | null;
  checkLikeStatus: FetchingStatus;
  likeStatusError: string | null;
  handleUnLikeProject: (projectLikeId: string) => void;
  userLikes: boolean;
  noOfLikes: number;
  fetchingLikeStatus: FetchingStatus;
  handleFetchLikeCount: () => void;
  userLikedStatus: FetchingStatus;
  userUnLikedStatus: FetchingStatus;
}

interface PropType {
  projectId?: string;
}

const usePostLikeProject = ({ projectId }: PropType): ProjectLikeReturnType => {
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
  const [likeStatus, setLikeStatus] = useState<LikedProjectType | null>(null);
  const [likeStatusError, setLikeStatusError] = useState<string | null>(null);
  const [checkLikeStatus, setCheckLikeStatus] = useState<FetchingStatus>(
    FetchingStatus.Default
  );
  const [userLikes, setUserLikes] = useState(false);
  const [projectLike, setProjectLike] = useState<LikedProjectType | null>(null);
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
      .get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/project-likes/ProjectLike/get-by-projectid?projectId=${projectId}`,
        {
          headers: {
        
            accept: 'application/json',
          },
        }
      )
      .then((response) => {
        setNoOfLikes(response.data.length);
        setUserLikes(
          response.data.some(
            (like: LikedProjectType) => like.userId === user?.user.userId
          )
        );
        setFetchingLikeStatus(FetchingStatus.Fetched);
      })
      .catch((error) => {
        setLikeStatusError(error);
        setFetchingLikeStatus(FetchingStatus.Error);
      });
  };

  useEffect(() => {
    if (projectId) {
      handleFetchLikeCount();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    projectId,
    token,
    userData?.walletAddress,
    user?.user.userId,
    projectLike,
  ]);

  const handleLikeProject = async () => {
    if (
      wallet.walletAddress &&
      userFetched === FetchingStatus.Fetched &&
      token
    ) {
      setUserLikedStatus(FetchingStatus.Loading);

      fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/project-likes/ProjectLike`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
            projectId: `${projectId}`,
          },
          body: JSON.stringify({
            projectId: `${projectId}`,
          }),
        }
      )
        .then((response) => response.json())
        .then((data) => {
          setProjectLike(data);
          setUserLikedStatus(FetchingStatus.Fetched);
        })
        .catch((err) => {
          setError(err.message);
          setUserLikedStatus(FetchingStatus.Error);
        });
    }
  };

  const handleUnLikeProject = async (projectLikeId: string) => {
    if (
      wallet.walletAddress &&
      userFetched === FetchingStatus.Fetched &&
      token
    ) {
      setUserUnLikedStatus(FetchingStatus.Loading);

      fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/project-likes/ProjectLike/${projectLikeId}`,
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
          setProjectLike(data);
        })
        .catch((err) => {
          setError(err.message);
          setUserUnLikedStatus(FetchingStatus.Error);
        });
    }
  };

  const handleUserLike = async () => {
    setCheckLikeStatus(FetchingStatus.Loading);

    if (projectId && user?.user?.userId && token) {
      axios
        .get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/project-likes/ProjectLike/get-by-userid-and-projectid?userId=${user.user.userId}&projectId=${projectId}`,
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
  }, [
    projectId,
    token,
    userData?.walletAddress,
    user?.user.userId,
    projectLike,
  ]);

  return {
    projectLike,
    fetchingStatus,
    error,
    handleLikeProject,
    handleUnLikeProject,
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

export default usePostLikeProject;
