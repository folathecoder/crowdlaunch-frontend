import React from 'react';
import { ArchiveContainer } from '@/components/guide/guideArchive/guideArchiveStyles';
// import LatestSection from '@/components/blog/LatestSection/LatestSection';
import HeroSection from '@/components/guide/heroSection/heroSection';
// import CtaSection from 'components/global/CtaSection/CtaSection';

const GuideArchive = () => {
  return (
    <>
      <ArchiveContainer>
        <HeroSection />

        {/* <LatestSection /> */}
      </ArchiveContainer>
      {/* <CtaSection /> */}
    </>
  );
};

export default GuideArchive;
