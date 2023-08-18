import React, { useContext, useState } from 'react';
import {
  NFTDetailContext,
  NFTDetailContextReturnTypes,
} from '@/contexts/NFTDetailContext';
import { DetailOption } from '@/components/marketplace/NFTDetail/NFTDetailStyles';
import { HiArrowNarrowLeft } from 'react-icons/hi';
import { BsShare } from 'react-icons/bs';
import { ShareModal } from '@/components/global';
import { APP_URL } from '@/data/appInfo';

type Props = {
  mobile?: boolean;
};

const NavShare = ({ mobile }: Props) => {
  const [toggleShareModal, setToggleShareModal] = useState(false);

  const { nft, nftFetchingStatus } = useContext(
    NFTDetailContext
  ) as NFTDetailContextReturnTypes;

  const goBack = () => {
    if (typeof window !== 'undefined') {
      window.history.back();
    }
  };

  return (
    <DetailOption mobile={mobile}>
      <div>
        <button
          onClick={goBack}
          aria-label="Previous Page"
          title="Go to previous page"
        >
          <HiArrowNarrowLeft />
        </button>
      </div>
      <div className="share_btn">
        <button
          aria-label="Share Button"
          title="Share NFT"
          onClick={() => setToggleShareModal(!toggleShareModal)}
        >
          <BsShare />
        </button>
        {toggleShareModal && nftFetchingStatus === 2 && (
          <ShareModal
            shareUrl={`${APP_URL}/nft/${nft?.nft.nftId}`}
            setState={setToggleShareModal}
          />
        )}
      </div>
    </DetailOption>
  );
};

export default NavShare;
