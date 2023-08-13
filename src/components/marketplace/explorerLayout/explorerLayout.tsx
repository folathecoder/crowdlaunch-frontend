import React, { useState, useEffect } from 'react';
import {
  ExploreContainer,
  ExploreWrapper,
  ExploreHeader,
  ExploreMain,
  ExploreFilterContainer,
  ExploreCardsContainer,
  ExploreSearchWrap,
  ExploreOptions,
  ExploreWrap,
} from './explorerLayoutStyles';
import { NFTCard, NFTSearch } from '@/components/marketplace';
import { ProjectCard, ExploreSearch } from '@/components/explore';
import { ColorButton } from '@/components/global';
import { projectStatus } from '@/data/explore/exploreFilters';
import ExploreFilter from '@/components/marketplace/children/exploreFilter/exploreFilter';
import { GoFilter } from 'react-icons/go';
import { useBreakPointDown } from '@/hooks/useBreakPoint';
import HoldersSection from '@/components/marketplace/children/HoldersSection/holdersSection';
import { nftStatus } from '@/data/marketplace/marketplaceData';

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
          <h1>Top Holders</h1>
        </ExploreHeader>
        <HoldersSection />
        <ExploreHeader>
          <h1>Explore NFTs</h1>
        </ExploreHeader>
        <ExploreMain>
          <ExploreFilterContainer>
            <div>
              <ExploreOptions>
                <div>
                  {nftStatus.slice(0, noOfStatus).map((item) => (
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
              <ExploreFilter filterToggle={filterToggle} />
            </div>
          </ExploreFilterContainer>
          <ExploreWrap>
            <ExploreSearchWrap>
              <NFTSearch />
            </ExploreSearchWrap>
            <ExploreCardsContainer>
              {/* {NFTData.map((nft) => (
                <NFTCard key={nft.id} data={nft} />
              ))} */}
            </ExploreCardsContainer>
          </ExploreWrap>
        </ExploreMain>
      </ExploreWrapper>
    </ExploreContainer>
  );
};

export default ExplorerLayout;
