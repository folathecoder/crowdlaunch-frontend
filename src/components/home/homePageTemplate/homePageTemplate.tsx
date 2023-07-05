import React from 'react';
import { HomeContainer } from '@/components/home/homePageTemplate/homePageTemplateStyles';
import CtaSection from '@/components/global/ctaSection/ctaSection';
import BenefitSection from '@/components/home/benefitSection/benefitSection';
import ShowcaseSection from '@/components/home/showcaseSection/showcaseSection';
import { benefitData, blockchainTechData } from '@/data/home/homeData';

const HomePageTemplate = () => {
  return (
    <>
      <HomeContainer>
        <BenefitSection {...benefitData} />
        <ShowcaseSection data={blockchainTechData} />
      </HomeContainer>
      <CtaSection />
    </>
  );
};

export default HomePageTemplate;
