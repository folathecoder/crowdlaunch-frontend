import React, { useState, useEffect, useContext } from 'react';
import {
  ExploreContext,
  ExploreContextReturnTypes,
} from '@/contexts/ExploreContext';
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
  ExploreError,
} from './explorerLayoutStyles';
import {
  ProjectCard,
  ExploreSearch,
  ProjectCardSkeleton,
} from '@/components/explore';
import { ColorButton } from '@/components/global';
import { projectStatus } from '@/data/explore/exploreFilters';
import ExploreFilter from '@/components/explore/exploreFilter/exploreFilter';
import { GoFilter } from 'react-icons/go';
import { useBreakPointDown } from '@/hooks/useBreakPoint';
import { BiError } from 'react-icons/bi';
import ExploreProvider from '@/contexts/ExploreContext';
import { ExploreFilterType } from '@/types/exploreTypes';
import { LottieImage } from '@/components/global';
import NotFoundImage from 'public/images/global/not-found.json';

const ExplorerLayout = () => {
  const [filterToggle, setFilterToggle] = useState(false);
  const { breakPoint: switchToggleMode } = useBreakPointDown({
    breakMark: 798,
  });

  return (
    <ExploreProvider>
      <ExploreContainer>
        <ExploreWrapper>
          <ExploreHeader>
            <h1>Explore Projects</h1>
          </ExploreHeader>
          <ExploreMain>
            <ExploreFilterContainer>
              <div>
                <ExploreOptions>
                  <ExploreQuickFilter />
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
                <ExploreFilter filterToggle={filterToggle} />
              </div>
            </ExploreFilterContainer>
            <ExploreWrap>
              <ExploreSearchWrap>
                <ExploreSearch />
              </ExploreSearchWrap>
              <ExploreProjects />
            </ExploreWrap>
          </ExploreMain>
        </ExploreWrapper>
      </ExploreContainer>
    </ExploreProvider>
  );
};

const ExploreProjects = () => {
  const { filteredProjects, fetchingStatus } = useContext(
    ExploreContext
  ) as ExploreContextReturnTypes;

  return (
    <>
      <ExploreCardsContainer>
        {fetchingStatus === 1 &&
          new Array(14)
            .fill(null)
            .map((item) => <ProjectCardSkeleton key={item} />)}
        {fetchingStatus === 2 &&
          filteredProjects
            ?.reverse()
            .map((project) => (
              <ProjectCard
                key={project.projectId}
                projectName={project.projectName}
                projectId={project.projectId}
                bannerImageUrl={project.bannerImageUrl}
                targetAmount={project.targetAmount}
                amountRaised={project.amountRaised}
                minInvestment={project.minInvestment}
                noOfLikes={project.noOfLikes}
                categoryId={project.categoryId}
              />
            ))}
      </ExploreCardsContainer>
      <ExploreError>
        {fetchingStatus === 2 && filteredProjects?.length === 0 && (
          <>
            <p className="error-msg">
              There are no projects that match your search term, please try
              again!
            </p>
            <div>
              <LottieImage animationData={NotFoundImage} />
            </div>
          </>
        )}
        {fetchingStatus === 3 && (
          <>
            <p className="error-msg">
              No project meet your filter criteria, please try again!
            </p>
            <div>
              <LottieImage animationData={NotFoundImage} />
            </div>
          </>
        )}
      </ExploreError>
    </>
  );
};

const ExploreQuickFilter = () => {
  const { setExploreFilter, exploreFilter } = useContext(
    ExploreContext
  ) as ExploreContextReturnTypes;

  const [noOfStatus, setNoOfStatus] = useState(4);

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

  const handleFilterClick = (filter: keyof ExploreFilterType) => {
    setExploreFilter((prevState) => ({
      ...prevState,
      [filter]: !prevState[filter],
    }));
  };
  return (
    <div>
      {projectStatus.slice(0, noOfStatus).map((item) => (
        <ColorButton
          key={item.id}
          buttonTitle={item.title}
          buttonType="action"
          buttonFunction={() =>
            handleFilterClick(item.query as keyof ExploreFilterType)
          }
          bgColor={item.bgColor}
          borderColor={item.borderColor}
          checkable={
            (exploreFilter[item.query as keyof ExploreFilterType] as boolean) ||
            false
          }
        />
      ))}
    </div>
  );
};

export default ExplorerLayout;
