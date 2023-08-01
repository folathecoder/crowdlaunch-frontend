import React from 'react';
import { ArchiveContainer } from '@/components/guide/guideArchive/guideArchiveStyles';
import LatestSection from '@/components/guide/latestSection/latestSection';
import HeroSection from '@/components/guide/heroSection/heroSection';
import CtaSection from '@/components/global/ctaSection/ctaSection';
import { ApiDataType } from '@/types/blogTypes';

const GuideArchive = ({ posts }: ApiDataType) => {
  return (
    <>
      <ArchiveContainer>
        <HeroSection {...posts[0].node} />
        <LatestSection posts={posts} />
      </ArchiveContainer>
      <CtaSection />
    </>
  );
};

export default GuideArchive;
