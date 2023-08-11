import React, { useContext } from 'react';
import {
  ProfileContext,
  ProfileReturnTypes,
} from '@/components/profile/context/ProfileContext';
import { NFTCollectionSection } from '@/components/profile/children/ProfileTabSection/ProfileTabSectionStyles';
import { NFTCard } from '@/components/marketplace';

const NFTCollection = () => {
  const { user } = useContext(ProfileContext) as ProfileReturnTypes;
  const { ownedNfts } = user || {};

  return (
    <NFTCollectionSection>
      <div className="nft-cards">
        {ownedNfts?.map((nft) => (
          <NFTCard key={nft.nftId} nftId={nft.nftId} />
        ))}
      </div>
    </NFTCollectionSection>
  );
};

export default NFTCollection;
