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
import useGetProjects from '@/hooks/RequestHooks/GET/useGetProjects';
import { BiError } from 'react-icons/bi';

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

  const { projects, fetchingStatus } = useGetProjects();

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
              {fetchingStatus === 1 &&
                new Array(14)
                  .fill(null)
                  .map((item) => <ProjectCardSkeleton key={item} />)}
              {fetchingStatus === 2 &&
                projects
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
              {fetchingStatus === 3 && (
                <p className="error-msg">
                  <span>
                    <BiError />
                  </span>
                  Oops! Projects could not be fetched. Try again later!
                </p>
              )}
            </ExploreCardsContainer>
          </ExploreWrap>
        </ExploreMain>
      </ExploreWrapper>
    </ExploreContainer>
  );
};

export default ExplorerLayout;
