import React, { useContext, useState, useEffect } from 'react';
import {
  NFTDetailContext,
  NFTDetailContextReturnTypes,
} from '@/contexts/NFTDetailContext';
import { DetailOption } from '@/components/marketplace/NFTDetail/NFTDetailStyles';
import { HiArrowNarrowLeft } from 'react-icons/hi';
import { BsShare } from 'react-icons/bs';
import { ShareModal } from '@/components/global';
import { APP_URL } from '@/data/appInfo';
import usePostLikeNft from '@/hooks/RequestHooks/POST/usePostLikeNft';
import { MdFavorite } from 'react-icons/md';
import useWallet from '@/wallet/useWallet';
import { Notification } from '@/components/global';

type Props = {
  mobile?: boolean;
};

const NavShare = ({ mobile }: Props) => {
  const [toggleShareModal, setToggleShareModal] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  const { wallet } = useWallet();
  const { nft, nftFetchingStatus } = useContext(
    NFTDetailContext
  ) as NFTDetailContextReturnTypes;

  const { nft: nftData } = nft || {};

  const {
    handleLikeNft,
    handleUnLikeNft,
    likeStatus,
    userLikes,
    noOfLikes,
    handleFetchLikeCount,
    userLikedStatus,
    userUnLikedStatus,
  } = usePostLikeNft({
    nftId: nftData?.nftId,
  });

  const goBack = () => {
    if (typeof window !== 'undefined') {
      window.history.back();
    }
  };

  const handleFavoriteClick = () => {
    if (wallet.walletAddress && wallet.walletStatus.isConnected) {
      if (userLikes) {
        if (likeStatus?.nftLikeId) handleUnLikeNft(likeStatus.nftLikeId);
      } else {
        handleLikeNft();
      }
    } else {
      setShowNotification(true);
      setNotificationMessage('Please connect your wallet to like this NFT');
    }
  };

  // Re-Check the status of a user like after an increment
  useEffect(() => {
    if (userLikedStatus === 2) {
      handleFetchLikeCount();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userLikedStatus]);

  // Re-Check the status of a user like after adecrement
  useEffect(() => {
    if (userUnLikedStatus) {
      handleFetchLikeCount();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userUnLikedStatus]);

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
      <div className="btn_wrap">
        <button
          aria-label="Favorite Button"
          title="Like NFT"
          className={
            userLikes
              ? 'favorite_btn favorite_btn_liked'
              : 'favorite_btn favorite_btn_unliked'
          }
          onClick={handleFavoriteClick}
        >
          <MdFavorite />
          <div>
            <p>{noOfLikes}</p>
          </div>
        </button>
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
      </div>
      <Notification
        message={notificationMessage}
        state={showNotification}
        setState={setShowNotification}
      />
    </DetailOption>
  );
};

export default NavShare;
