import React, { useContext, useState } from 'react';
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
import { ETHERSCAN_URL } from '@/data/appInfo';
import usePostLikeProject from '@/hooks/RequestHooks/POST/usePostLikeProject';
import { ShareModal } from '@/components/global';
import { APP_URL } from '@/data/appInfo';

const ProjectHeader = () => {
  const [toggleShareModal, setToggleShareModal] = useState(false);

  const {
    project: data,
    fetchingStatus,
    isProjectCreator,
  } = useContext(ProjectDetailContext) as ProjectDetailContextReturnTypes;

  const { project: projectData, category } = data || {};

  const {
    handleLikeProject,
    userLikes,
    handleUnLikeProject,
    likeStatus,
    handleUserLike,
  } = usePostLikeProject({
    projectId: projectData?.projectId,
  });

  const handleFavoriteClick = () => {
    if (userLikes) {
      handleUnLikeProject();
      handleUserLike();
    } else {
      handleLikeProject();
      handleUserLike();
    }
  };

  return (
    <>
      {fetchingStatus === 2 && data && (
        <HeaderSection>
          <HeaderWrapper>
            <HeaderMinContent>
              <div>
                <h1>{projectData?.projectName}</h1>
                <h2>{category?.categoryName}</h2>
              </div>
              <IconWrapper>
                {isProjectCreator && (
                  <button aria-label="Edit Button" title="Edit Project">
                    <MdEdit />
                  </button>
                )}
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
                  <div>{projectData?.noOfLikes}</div>
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
                {projectData?.bannerImageUrl && projectData?.projectName && (
                  <Image
                    src={projectData.bannerImageUrl}
                    alt={projectData.projectName}
                    layout="fill"
                    objectFit="cover"
                    objectPosition="center"
                  />
                )}
              </ImageWrapper>
              <FundWrapper>
                <FundProject {...fundings} />
                <p>
                  Investments made on this platform are speculative, involve a
                  high level of risk, and you may lose all of your investment;
                  please invest wisely and only as much as you can afford to
                  lose.
                </p>
              </FundWrapper>
            </HeaderMainContent>
          </HeaderWrapper>
        </HeaderSection>
      )}
    </>
  );
};

export default ProjectHeader;
