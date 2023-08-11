import React, { useContext } from 'react';
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

const ProjectHeader = () => {
  const { project: data, fetchingStatus } = useContext(
    ProjectDetailContext
  ) as ProjectDetailContextReturnTypes;

  return (
    <>
      {fetchingStatus === 2 && data && (
        <HeaderSection>
          <HeaderWrapper>
            <HeaderMinContent>
              <div>
                <h1>{data.project.projectName}</h1>
                <h2>{data.category.categoryName}</h2>
              </div>
              <IconWrapper>
                <button aria-label="Edit Button" title="Edit Project">
                  <MdEdit />
                </button>
                <a
                  href={`${ETHERSCAN_URL}/address/${data.project.projectWalletAddress}`}
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
                <button aria-label="Favorite Button" title="Like Project">
                  <MdFavorite />
                </button>
                <button aria-label="Report Button" title="Report Project">
                  <MdReport />
                </button>
                <button aria-label="Share Button" title="Share Project">
                  <BsShare />
                </button>
              </IconWrapper>
            </HeaderMinContent>
            <HeaderMainContent>
              <ImageWrapper>
                <Image
                  src={data.project.bannerImageUrl}
                  alt={data.project.projectName}
                  layout="fill"
                  objectFit="cover"
                  objectPosition="center"
                />
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
