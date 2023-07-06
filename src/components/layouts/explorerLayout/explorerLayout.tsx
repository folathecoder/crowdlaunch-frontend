import React from 'react';
import {
  ExploreContainer,
  ExploreWrapper,
  ExploreHeader,
  ExploreMenu,
  ExploreMain,
  ExploreFilterContainer,
  ExploreCardsContainer,
  ExploreSearchWrap,
  ExploreOptions,
  ExploreWrap,
} from './explorerLayoutStyles';
import { ProjectCard, ExploreSearch } from '@/components/explore';
import { ColorButton } from '@/components/global';
import { projectStatus } from '@/data/explore/exploreFilters';
import ExploreFilter from '@/components/explore/exploreFilter/exploreFilter';
import { GoFilter } from 'react-icons/go';

const ExplorerLayout = () => {
  return (
    <ExploreContainer>
      <ExploreWrapper>
        <ExploreHeader>
          <h1>Explore Projects</h1>
        </ExploreHeader>
        <ExploreMain>
          <ExploreFilterContainer>
            <div>
              <ExploreOptions>
                <div>
                  {projectStatus.map((item) => (
                    <ColorButton
                      key={item.id}
                      buttonTitle={item.title}
                      buttonType="action"
                      buttonFunction={() => {}}
                      bgColor={item.bgColor}
                      borderColor={item.borderColor}
                    />
                  ))}
                </div>
                <div>
                  <button className="filter_button" type="button" role="button">
                    <GoFilter />
                  </button>
                </div>
              </ExploreOptions>
              <ExploreFilter />
            </div>
          </ExploreFilterContainer>
          <ExploreWrap>
            <ExploreSearchWrap>
              <ExploreSearch />
            </ExploreSearchWrap>
            <ExploreCardsContainer>
              {[
                1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
                19, 20,
              ].map((project) => (
                <ProjectCard key={project} />
              ))}
            </ExploreCardsContainer>
          </ExploreWrap>
        </ExploreMain>
      </ExploreWrapper>
    </ExploreContainer>
  );
};

export default ExplorerLayout;
