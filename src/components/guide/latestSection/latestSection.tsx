import React from 'react';
import {
  SectionContainer,
  CardOne,
  CardTwo,
  CardThree,
  CardFour,
  CardFive,
  SectionWrap,
  SectionHeader,
  ContainerWrap,
} from '@/components/guide/latestSection/latestSectionStyles';
import ArticleCard from '@/components/guide/articleCard/articleCard';
import ArticleSmallCard from '@/components/guide/articleSmallCard/articleSmallCard';
import CornerStoneCard from '@/components/guide/cornerStoneCard/cornerStoneCard';

const LatestSection = () => {
  return (
    <SectionWrap>
      <ContainerWrap>
        <SectionHeader>
          <h2>Latest Guides</h2>
        </SectionHeader>
        <SectionContainer>
          <CardOne>
            <CornerStoneCard />
          </CardOne>
          <CardTwo>
            <ArticleCard />
          </CardTwo>
          <CardThree>
            <ArticleCard />
          </CardThree>
          <CardFour>
            <ArticleCard />
          </CardFour>
          <CardFive>
            <ArticleSmallCard />
            <ArticleSmallCard />
            <ArticleSmallCard />
          </CardFive>
        </SectionContainer>
      </ContainerWrap>
    </SectionWrap>
  );
};

export default LatestSection;
