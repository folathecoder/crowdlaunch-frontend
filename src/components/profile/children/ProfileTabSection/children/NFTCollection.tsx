import React from 'react';
import { NFTCollectionSection } from '@/components/profile/children/ProfileTabSection/ProfileTabSectionStyles';
import { NFTCard } from '@/components/marketplace';
import { NFTData } from '@/data/marketplace/marketplaceData';

const NFTCollection = () => {
  return (
    <NFTCollectionSection>
      <div className="nft-header">
        <p>Collected NFTs: 7 NFTs</p>
      </div>
      <div className="nft-cards">
        {NFTData.slice(0, 7).map((nft) => (
          <NFTCard key={nft.id} data={nft} />
        ))}
      </div>
    </NFTCollectionSection>
  );
};

export default NFTCollection;
