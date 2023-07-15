import React from 'react';
import { WatchlistSection } from '@/components/profile/children/ProfileTabSection/ProfileTabSectionStyles';
import { NFTCard } from '@/components/marketplace';
import { NFTData } from '@/data/marketplace/marketplaceData';
import { ProjectCard } from '@/components/explore';

const Watchlist = () => {
  return (
    <WatchlistSection>
      <div className="portfolio-header">
        <p>Project Watchlist: 4 projects</p>
      </div>
      <div className="portfolio-cards">
        {[1, 2, 3, 4].map((item) => (
          <ProjectCard key={item} />
        ))}
      </div>
      <div className="nft-header">
        <p>NFT Watchlist: 3 NFTs</p>
      </div>
      <div className="nft-cards">
        {NFTData.slice(0, 3).map((nft) => (
          <NFTCard key={nft.id} data={nft} />
        ))}
      </div>
    </WatchlistSection>
  );
};

export default Watchlist;
