import React, { useContext, useState, useEffect } from 'react';
import { Skeleton } from '@mui/material';
import {
  ProjectDetailContext,
  ProjectDetailContextReturnTypes,
} from '@/contexts/ProjectDetailContext';
import Image from 'next/image';
import FundProject from '../FundProject/FundProject';
import { fundings } from '../FundProject/FundProject';
import {
  HeaderSection,
  HeaderWrapper,
  HeaderMinContent,
  IconWrapper,
  HeaderMainContent,
  FundWrapper,
  ImageWrapper,
} from './ProjectHeaderStyles';
import { MdFavorite, MdReport, MdEdit } from 'react-icons/md';
import { BsShare } from 'react-icons/bs';
import { FaEthereum } from 'react-icons/fa';
import { ETHERSCAN_URL, APP_URL } from '@/data/appInfo';
import usePostLikeProject from '@/hooks/RequestHooks/POST/usePostLikeProject';
import { ShareModal } from '@/components/global';
import { Notification } from '@/components/global';
import useWallet from '@/wallet/useWallet';

const ProjectHeader = () => {
  const { wallet } = useWallet();
  const [toggleShareModal, setToggleShareModal] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  const { project: data, isProjectCreator } = useContext(
    ProjectDetailContext
  ) as ProjectDetailContextReturnTypes;

  const { project: projectData, category } = data || {};

  const {
    handleLikeProject,
    handleUnLikeProject,
    likeStatus,
    noOfLikes,
    handleFetchLikeCount,
    userUnLikedStatus,
    userLikedStatus,
    userLikes,
  } = usePostLikeProject({
    projectId: projectData?.projectId,
  });

  const handleFavoriteClick = () => {
    if (wallet.walletAddress && wallet.walletStatus.isConnected) {
      if (userLikes) {
        if (likeStatus?.projectLikeId)
          handleUnLikeProject(likeStatus.projectLikeId);
      } else {
        handleLikeProject();
      }
    } else {
      setShowNotification(true);
      setNotificationMessage('Please connect your wallet to like this project');
    }
  };

  // Re-Check the status of a user like after an increment
  useEffect(() => {
    if (userLikedStatus === 2) {
      handleFetchLikeCount();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userLikedStatus]);

  // Re-Check the status of a user like after adecrement
  useEffect(() => {
    if (userUnLikedStatus) {
      handleFetchLikeCount();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userUnLikedStatus]);

  return (
    <HeaderSection>
      <HeaderWrapper>
        <HeaderMinContent>
          <div>
            <h1>{projectData?.projectName}</h1>
            <h2>{category?.categoryName}</h2>
          </div>
          <IconWrapper>
            <a
              href={`${ETHERSCAN_URL}/address/${projectData?.projectWalletAddress}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <button
                aria-label="Etherscan Button"
                title="Check Project on Etherscan"
              >
                <FaEthereum />
              </button>
            </a>
            <button
              aria-label="Favorite Button"
              title="Like Project"
              className={
                userLikes
                  ? 'favorite_btn favorite_btn_liked'
                  : 'favorite_btn favorite_btn_unliked'
              }
              onClick={handleFavoriteClick}
            >
              <MdFavorite />
              <div>{noOfLikes}</div>
            </button>
            <button aria-label="Report Button" title="Report Project">
              <MdReport />
            </button>
            <div className="share_btn">
              <button
                aria-label="Share Button"
                title="Share Project"
                onClick={() => setToggleShareModal(!toggleShareModal)}
              >
                <BsShare />
              </button>
              {toggleShareModal && (
                <ShareModal
                  shareUrl={`${APP_URL}/project/${projectData?.projectId}`}
                  setState={setToggleShareModal}
                />
              )}
            </div>
          </IconWrapper>
        </HeaderMinContent>
        <HeaderMainContent>
          <ImageWrapper>
            {projectData?.bannerImageUrl && projectData?.projectName ? (
              <Image
                src={projectData.bannerImageUrl}
                alt={projectData.projectName}
                layout="fill"
                objectFit="cover"
                objectPosition="center"
              />
            ) : (
              <Skeleton
                variant="rounded"
                height="100%"
                width="100%"
                animation="wave"
                sx={{
                  background: 'rgb(211 194 194 / 10%)',
                }}
              />
            )}
          </ImageWrapper>
          <FundWrapper>
            <div>
              <FundProject {...fundings} />
              <p>
                Investments made on this platform are speculative, involve a
                high level of risk, and you may lose all of your investment;
                please invest wisely and only as much as you can afford to lose.
              </p>
            </div>
          </FundWrapper>
        </HeaderMainContent>
      </HeaderWrapper>
      <Notification
        message={notificationMessage}
        state={showNotification}
        setState={setShowNotification}
      />
    </HeaderSection>
  );
};

export default ProjectHeader;
