import React from 'react';
import { HomeContainer } from '@/components/home/homePageTemplate/homePageTemplateStyles';
import CtaSection from '@/components/global/ctaSection/ctaSection';
import BenefitSection from '@/components/home/benefitSection/benefitSection';
import ShowcaseSection from '@/components/home/showcaseSection/showcaseSection';

import {
  servicesData,
  benefitData,
  blockchainTechData,
} from '@/data/home/homeData';

const HomePageTemplate = () => {
  return (
    <>
      <HomeContainer>
        {/* <CounterSection />
        <ServicesSection data={servicesData} />
        // <BenefitSection {...benefitData} />
        <BlockchainTechSection data={blockchainTechData} />
        <TestimonialSection />
        <BlogSection postNumber={4} /> */}
        <BenefitSection {...benefitData} />
        <ShowcaseSection data={blockchainTechData} />
      </HomeContainer>
      <CtaSection />
    </>
  );
};

export default HomePageTemplate;
