import React from 'react';
import Link from 'next/link';
import { nftArrayData, stepsData } from '@/data/home/heroData';
import {
  NftMarketContainer,
  NftMarketHeader,
  NftMarketWrapper,
} from './heroSectionStyles';
import ProjectCard from './projectCard/projectCard';
import StepsSection from '../stepsSection/stepsSection';

const HeroSection = () => {
  return (
    <NftMarketContainer>
      <NftMarketWrapper>
        <NftMarketHeader>
          <h3>Funding Startups</h3>
          <h1>Unleash the Power of Crowdfunding with NFTs</h1>
          <p>
            Raise the required funds to build and grow your project with
            decentralised technology.
          </p>
          <Link href="/explore">
            <button>Explore Projects</button>
          </Link>
        </NftMarketHeader>
        <ProjectCard data={nftArrayData} />
      </NftMarketWrapper>
      <StepsSection data={stepsData} />
    </NftMarketContainer>
  );
};

export default HeroSection;
