import React, { useContext } from 'react';
import Link from 'next/link';
import {
  ProfileContext,
  ProfileReturnTypes,
} from '@/components/profile/context/ProfileContext';
import { WatchlistSection } from '@/components/profile/children/ProfileTabSection/ProfileTabSectionStyles';
import { NFTCard } from '@/components/marketplace';
import { NFTData } from '@/data/marketplace/marketplaceData';
import { ProjectCard } from '@/components/explore';
import { PortfolioCard } from '@/components/explore';

const Watchlist = () => {
  const { user } = useContext(ProfileContext) as ProfileReturnTypes;
  const { nftWatchlist, projectWatchlist } = user || {};

  return (
    <WatchlistSection>
      <div className="portfolio-header">
        <p>
          Project Watchlist: {projectWatchlist?.length}{' '}
          {projectWatchlist && projectWatchlist?.length > 1
            ? 'projects'
            : 'project'}
        </p>
      </div>
      {projectWatchlist && projectWatchlist.length > 0 ? (
        <div className="portfolio-cards">
          {projectWatchlist?.map((project) => (
            <PortfolioCard
              key={project.projectId}
              projectId={project.projectId}
            />
          ))}
        </div>
      ) : (
        <p className="empty_message">
          Your project watchlist is empty,{' '}
          <Link href="/explore">explore projects.</Link>{' '}
        </p>
      )}

      <div className="nft-header">
        <p>
          NFT Watchlist: {nftWatchlist?.length}{' '}
          {nftWatchlist && nftWatchlist?.length > 1 ? 'NFTs' : 'NFT'}
        </p>
      </div>
      {nftWatchlist && nftWatchlist?.length > 0 ? (
        <div className="nft-cards">
          {nftWatchlist?.map((nft) => (
            <NFTCard key={nft.nftId} nftId={nft.nftId} />
          ))}
        </div>
      ) : (
        <p className="empty_message">
          Your NFT watchlist is empty,{' '}
          <Link href="/marketplace">explore NFT marketplace.</Link>
        </p>
      )}
    </WatchlistSection>
  );
};

export default Watchlist;
