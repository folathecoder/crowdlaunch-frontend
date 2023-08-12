import React, { useContext } from 'react';
import Link from 'next/link';
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
        {ownedNfts && ownedNfts.length > 0 ? (
          <>
            {ownedNfts?.map((nft) => (
              <NFTCard key={nft.nftId} nftId={nft.nftId} />
            ))}
          </>
        ) : (
          <p className="empty_message">
            You do not own NFTs, <Link href="/marketplace">explore NFTs.</Link>
          </p>
        )}
      </div>
    </NFTCollectionSection>
  );
};

export default NFTCollection;
