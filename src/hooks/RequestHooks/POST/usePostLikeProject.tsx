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
  handleUnLikeProject: () => void;
  userLikes: boolean;
  handleUserLike: () => void;
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

  const handleLikeProject = async () => {
    if (
      wallet.walletAddress &&
      userFetched === FetchingStatus.Fetched &&
      token
    ) {
      setFetchingStatus(FetchingStatus.Loading);

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
          setFetchingStatus(FetchingStatus.Fetched);
        })
        .catch((err) => {
          setError(err.message);
          setFetchingStatus(FetchingStatus.Error);
        });
    }
  };

  const handleUnLikeProject = async () => {
    if (
      wallet.walletAddress &&
      userFetched === FetchingStatus.Fetched &&
      token &&
      likeStatus?.projectLikeId
    ) {
      setFetchingStatus(FetchingStatus.Loading);

      fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/project-likes/ProjectLike/${likeStatus.projectLikeId}`,
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
          setProjectLike(data);
          setFetchingStatus(FetchingStatus.Fetched);
        })
        .catch((err) => {
          setError(err.message);
          setFetchingStatus(FetchingStatus.Error);
        });
    }
  };

  const handleUserLike = async () => {
    setUserLikes(false);
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
          setUserLikes(true);
        })
        .catch((error) => {
          setLikeStatusError(error);
          setCheckLikeStatus(FetchingStatus.Error);
          setUserLikes(false);
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
    handleUserLike,
  };
};

export default usePostLikeProject;
