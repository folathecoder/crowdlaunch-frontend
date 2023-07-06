import React, { useState, useEffect } from 'react';
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
import { useBreakPointDown } from '@/hooks/useBreakPoint';

const ExplorerLayout = () => {
  const [filterToggle, setFilterToggle] = useState(false);
  const [noOfStatus, setNoOfStatus] = useState(4);

  const { breakPoint: switchToggleMode } = useBreakPointDown({
    breakMark: 798,
  });
  const { breakPoint: reduceFilterTags } = useBreakPointDown({
    breakMark: 360,
  });

  useEffect(() => {
    if (reduceFilterTags) {
      setNoOfStatus(3);
    } else {
      setNoOfStatus(4);
    }
  }, [reduceFilterTags]);

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
                  {projectStatus.slice(0, noOfStatus).map((item) => (
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
                {switchToggleMode && (
                  <div>
                    <button
                      className="filter_button"
                      type="button"
                      role="button"
                      onClick={() => setFilterToggle(!filterToggle)}
                    >
                      <GoFilter />
                    </button>
                  </div>
                )}
              </ExploreOptions>
              <ExploreFilter
                filterToggle={filterToggle}
                setFilterToggle={setFilterToggle}
              />
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