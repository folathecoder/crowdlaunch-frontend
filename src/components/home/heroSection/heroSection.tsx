import React from 'react';
import { nftArrayData } from '@/data/home/heroData';
import {
  NftMarketContainer,
  NftMarketHeader,
  NftMarketWrapper,
} from './heroSectionStyles';
import ProjectCard from './projectCard/projectCard';

const HeroSection = () => {
  return (
    <NftMarketContainer>
      <NftMarketWrapper>
        <NftMarketHeader>
          <h3>Dominate Your Industry</h3>
          <h1>Unleash the Power of Crowdfunding with NFTs</h1>
          <p>
            Revolutionize your business with our expert Dapp development
            services.
          </p>
          <button>Explore Projects</button>
        </NftMarketHeader>
        <ProjectCard data={nftArrayData} />
      </NftMarketWrapper>

      {/* <Steps data={stepsData} /> */}
    </NftMarketContainer>
  );
};

export default HeroSection;
