import React from 'react';
import {
  ExploreContainer,
  ExploreWrapper,
  ExploreHeader,
  ExploreMenu,
  ExploreMain,
  ExploreFilterContainer,
  ExploreCardsContainer,
} from './explorerLayoutStyles';
import { ProjectCard } from '@/components/explore';

const ExplorerLayout = () => {
  return (
    <ExploreContainer>
      <ExploreWrapper>
        <ExploreHeader>
          <h1>Explore Projects</h1>
        </ExploreHeader>
        <ExploreMenu>
          <p>Explore Menu</p>
        </ExploreMenu>
        <ExploreMain>
          <ExploreFilterContainer>
            <div>Filter</div>
          </ExploreFilterContainer>
          <ExploreCardsContainer>
            {[
              1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
              20, 21, 21,
            ].map((project) => (
              <ProjectCard key={project} />
            ))}
          </ExploreCardsContainer>
        </ExploreMain>
      </ExploreWrapper>
    </ExploreContainer>
  );
};

export default ExplorerLayout;
