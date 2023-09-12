import React, { useState, useContext } from 'react';
import MarketplaceProvider, {
  MarketplaceContextReturnTypes,
  MarketplaceContext,
} from '@/contexts/MarketplaceContext';
import {
  ExploreContainer,
  ExploreWrapper,
  ExploreHeader,
  ExploreMain,
  ExploreFilterContainer,
  ExploreCardsContainer,
  ExploreSearchWrap,
  ExploreWrap,
  ExploreError,
} from './explorerLayoutStyles';
import { NFTCard, NFTSearch } from '@/components/marketplace';
import { ProjectCardSkeleton } from '@/components/explore';
import ExploreFilter from '@/components/marketplace/children/exploreFilter/exploreFilter';
import HoldersSection from '@/components/marketplace/children/HoldersSection/holdersSection';
import { LottieImage } from '@/components/global';
import NotFoundImage from 'public/images/global/not-found.json';

const ExplorerLayout = () => {
  const [filterToggle, setFilterToggle] = useState(false);

  return (
    <MarketplaceProvider>
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
                <ExploreFilter filterToggle={filterToggle} />
              </div>
            </ExploreFilterContainer>
            <ExploreWrap>
              <ExploreSearchWrap>
                <NFTSearch />
              </ExploreSearchWrap>
              <ExploreProject />
            </ExploreWrap>
          </ExploreMain>
        </ExploreWrapper>
      </ExploreContainer>
    </MarketplaceProvider>
  );
};

export default ExplorerLayout;

const ExploreProject = () => {
  const { fetchingStatus, filteredNfts } = useContext(
    MarketplaceContext
  ) as MarketplaceContextReturnTypes;

  return (
    <>
      <ExploreCardsContainer>
        {fetchingStatus === 1 &&
          new Array(14)
            .fill(null)
            .map((item) => <ProjectCardSkeleton key={item} />)}
        {filteredNfts
          .filter((nft) => nft.price !== 0)
          ?.map((nft) => (
            <NFTCard key={nft.nftId} nftId={nft.nftId} />
          ))}
      </ExploreCardsContainer>
      <ExploreError>
        {fetchingStatus === 2 && filteredNfts?.length === 0 && (
          <>
            <p className="error-msg">
              There are no NFTs that match your search term, please try again!
            </p>
            <div>
              <LottieImage animationData={NotFoundImage} />
            </div>
          </>
        )}
        {fetchingStatus === 3 && (
          <>
            <p className="error-msg">
              No NFT meet your filter criteria, please try again!
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
