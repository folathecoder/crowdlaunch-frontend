import React from 'react';
import Image from 'next/image';
import FundProject from '../FundProject/FundProject';
import { fundings } from '../FundProject/FundProject';
import ProjectBanner from 'public/images/global/project-banner.png';
import {
  HeaderSection,
  HeaderWrapper,
  HeaderMinContent,
  IconWrapper,
  HeaderMainContent,
  FundWrapper,
  ImageWrapper,
} from './ProjectHeaderStyles';
import { MdFavorite } from 'react-icons/md';
import { BsShare } from 'react-icons/bs';
import { FaEthereum } from 'react-icons/fa';

const ProjectHeader = () => {
  return (
    <HeaderSection>
      <HeaderWrapper>
        <HeaderMinContent>
          <div>
            <h1>InnoTech</h1>
            <h2>AI, Robotics, Technology</h2>
          </div>
          <IconWrapper>
            <button>
              <FaEthereum />
            </button>
            <button>
              <MdFavorite />
            </button>
            <button>
              <BsShare />
            </button>
          </IconWrapper>
        </HeaderMinContent>
        <HeaderMainContent>
          <ImageWrapper>
            <Image src={ProjectBanner} alt="header image" />
          </ImageWrapper>
          <FundWrapper>
            <FundProject {...fundings} />
            <p>
              Investments made on this platform are speculative, involve a high
              level of risk, and you may lose all of your investment; please
              invest wisely and only as much as you can afford to lose.
            </p>
          </FundWrapper>
        </HeaderMainContent>
      </HeaderWrapper>
    </HeaderSection>
  );
};

export default ProjectHeader;
