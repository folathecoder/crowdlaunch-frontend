import React from 'react';
import {
  SectionContainer,
  CardOne,
  SectionWrap,
  SectionHeader,
  ContainerWrap,
} from '@/components/guide/latestSection/latestSectionStyles';
import ArticleCard from '@/components/guide/articleCard/articleCard';
import CornerStoneCard from '@/components/guide/cornerStoneCard/cornerStoneCard';
import { ApiDataType } from '@/types/blogTypes';

const LatestSection = ({ posts }: ApiDataType) => {
  return (
    <SectionWrap>
      <ContainerWrap>
        <SectionHeader>
          <h2>Latest Guides</h2>
        </SectionHeader>
        <SectionContainer>
          <CardOne>
            <CornerStoneCard post={posts[1].node} />
          </CardOne>
          {posts.slice(2, 5).map((post) => {
            return (
              <div key={post.node.id}>
                <ArticleCard data={post.node} />
              </div>
            );
          })}
        </SectionContainer>
      </ContainerWrap>
    </SectionWrap>
  );
};

export default LatestSection;
