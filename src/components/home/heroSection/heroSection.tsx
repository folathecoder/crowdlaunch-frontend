import React from 'react';
import Link from 'next/link';
import { stepsData } from '@/data/home/heroData';
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
            Unlock a global network of investors and empower your startup to
            soar.
          </p>
          <Link href="/explore">
            <button>Explore Projects</button>
          </Link>
        </NftMarketHeader>
        <ProjectCard />
      </NftMarketWrapper>
      <StepsSection data={stepsData} />
    </NftMarketContainer>
  );
};

export default HeroSection;
