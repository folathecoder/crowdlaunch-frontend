import React, { useContext, useEffect, useState } from 'react';
import { AppContext, AppContextReturnTypes } from '@/contexts/AppContext';
import {
  NFTDetailContext,
  NFTDetailContextReturnTypes,
} from '@/contexts/NFTDetailContext';
import useWallet from '@/wallet/useWallet';
import {
  DetailContent,
  DetailPrice,
  TransactionContainer,
} from '@/components/marketplace/NFTDetail/NFTDetailStyles';
import {
  Button,
  CustomSkeleton,
  TransactionLoader,
  Notification,
} from '@/components/global';
import { CURRENCY_SYMBOL, NFT_LISTING_FEE } from '@/data/appInfo';
import useGetUserByAddress from '@/hooks/RequestHooks/GET/useGetUserByAddress';
import useListNFTForSale from '@/hooks/ContractHooks/useListNFTForSale';
import usePatchNft from '@/hooks/RequestHooks/PATCH/usePatchNft';
import useRegisterUser from '@/hooks/ContractHooks/useRegisterUser';
import useBuyListedNft from '@/hooks/ContractHooks/useBuyListedNft';

const NFTInfo = () => {
  const { nft, nftFetchingStatus } = useContext(
    NFTDetailContext
  ) as NFTDetailContextReturnTypes;
  const { wallet } = useWallet();
  const { userData } = useContext(AppContext) as AppContextReturnTypes;
  const { user } = useGetUserByAddress({
    jwtToken: userData?.token,
  });

  const [listingPrice, setListingPrice] = useState<number | ''>('');
  const [notificationMessage, setNotificationMessage] = useState('');
  const [showNotification, setShowNotification] = useState(false);
  const [updatedNft, setUpdatedNft] = useState(false);
  const [showBuyButton, setShowBuyButton] = useState(false);

  // Function and states to list an NFT for sale on marketplace
  const { listNftForSale, isListingSuccess, isListingLoading, isListingError } =
    useListNFTForSale({
      nftName: nft?.nft.nftName ?? '',
      listPrice: listingPrice,
    });

  // Handle user registeration on the smart contract before user funds a campaign
  const {
    handleRegisterUser,
    isRegisterSuccess,
    isRegisterLoading,
    isUserRegistered,
  } = useRegisterUser();

  // Function and states to buy an NFT on the marketplace
  const { buyListedNFT, isBuyingSuccess, isBuyingLoading } = useBuyListedNft({
    nftName: nft?.nft.nftName ?? '',
    nftPrice: nft?.nft.price ?? 0,
  });

  const { updateNftData } = usePatchNft();

  const { nft: nftData } = nft || {};

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setListingPrice(Number(value));
  };

  const handleListing = () => {
    if (listingPrice !== 0 && listingPrice !== '') {
      listNftForSale();
    } else {
      setShowNotification(true);
      setNotificationMessage(
        'Listing price cannot be 0 or empty, kindly enter a price.'
      );
    }
  };

  const handleBuying = () => {
    if (isUserRegistered) {
      if (wallet.walletAddress && wallet.walletStatus.isConnected) {
        if (user?.user.userId !== nft?.nft.ownerId) {
          buyListedNFT();
        } else {
          setShowNotification(true);
          setNotificationMessage(
            'You are the current owner of this NFT. You cannot buy it because you already own it.'
          );
        }
      } else {
        setShowNotification(true);
        setNotificationMessage(
          'Please connect your wallet to make a purchase.'
        );
      }
    } else {
      setShowBuyButton(false);
      setShowNotification(true);
      setNotificationMessage(
        'Please register an account on the blockchain to verify your wallet address before making an NFT purchase.'
      );
    }
  };

  useEffect(() => {
    if (isListingSuccess) {
      if (!updatedNft && nft && listingPrice) {
        updateNftData(
          {
            nftName: nft?.nft.nftName ?? '',
            nftDescription: nft?.nft.nftDescription ?? '',
            nftImage: nft?.nft.nftImage ?? '',
            price: Number(listingPrice) ?? 0,
            ownerId: nft.nft.ownerId ?? '',
          },
          nft?.nft.nftId ?? ''
        );
        setUpdatedNft(true);
      }

      setShowNotification(true);
      setNotificationMessage('You have successfully listed your NFT!');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isListingSuccess]);

  useEffect(() => {
    if (isListingError) {
      setShowNotification(true);
      setNotificationMessage(
        'Listing failed, please confirm you have enough amount in your wallet to complete this transaction.'
      );
    }
  }, [isListingError]);

  useEffect(() => {
    if (isUserRegistered) {
      setShowBuyButton(isUserRegistered);
    }
  }, [isUserRegistered]);

  useEffect(() => {
    if (isRegisterSuccess) {
      setShowBuyButton(isRegisterSuccess);
      setShowNotification(true);
      setNotificationMessage(
        'Congratulations! You have successfully created an account on the blockchain. You can now buy an NFT.'
      );
    }
  }, [isRegisterSuccess]);

  useEffect(() => {
    if (isBuyingSuccess) {
      if (!updatedNft && nft && listingPrice) {
        updateNftData(
          {
            nftName: nft?.nft.nftName ?? '',
            nftDescription: nft?.nft.nftDescription ?? '',
            nftImage: nft?.nft.nftImage ?? '',
            price: 0,
            ownerId: user?.user.userId ?? '',
          },
          nft?.nft.nftId ?? ''
        );
        setUpdatedNft(true);
      }

      setShowNotification(true);
      setNotificationMessage(
        `Congratulations! You have successfully purchased the ${nft?.nft.nftName}. Your new NFT has been added to your collection. `
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isBuyingSuccess]);

  return (
    <DetailContent>
      {nftFetchingStatus === 2 ? (
        <h1>{nftData?.nftName}</h1>
      ) : (
        <CustomSkeleton height={25} width={220} marginTop={1} />
      )}
      {userData?.token &&
        wallet.walletAddress &&
        nftData?.price !== 0 &&
        wallet.walletStatus.isConnected && (
          <DetailPrice>
            <div>
              <div>
                {nftFetchingStatus === 2 ? (
                  <h2>
                    {nftData?.price.toLocaleString()} {CURRENCY_SYMBOL}
                  </h2>
                ) : (
                  <CustomSkeleton height={25} width={120} marginTop={1} />
                )}
              </div>
              {nftFetchingStatus === 2 && (
                <div>
                  {showBuyButton ? (
                    <Button
                      buttonTitle="BUY"
                      buttonType="action"
                      buttonFunction={handleBuying}
                      showLoader={isBuyingLoading}
                    />
                  ) : (
                    <Button
                      buttonTitle="CREATE ACCOUNT"
                      buttonType="action"
                      buttonFunction={handleRegisterUser}
                      showLoader={isRegisterLoading}
                    />
                  )}
                </div>
              )}
            </div>
            {!showBuyButton && (
              <p>
                Create an account on the blockchain to verify your wallet
                address for all future NFT purchases.
              </p>
            )}
          </DetailPrice>
        )}
      {user?.user.userId === nft?.nft.ownerId &&
        userData?.token &&
        wallet.walletAddress &&
        wallet.walletStatus.isConnected &&
        nftData?.price === 0 && (
          <TransactionContainer>
            <input
              type="number"
              step="0.0001"
              min="0"
              pattern="^\d+(\.\d+)?$"
              name="listingPrice"
              value={listingPrice}
              onChange={handleInputChange}
              placeholder="Listing Price (ETH)"
            />

            <button onClick={handleListing}>
              SELL ON MARKETPLACE
              {isListingLoading && (
                <span>
                  <TransactionLoader />
                </span>
              )}
            </button>
            <p>
              Please note that the listing fee is {NFT_LISTING_FEE}{' '}
              {CURRENCY_SYMBOL}, and it will be deducted from your wallet when
              you initiate this transaction.
            </p>
          </TransactionContainer>
        )}

      {nftFetchingStatus === 2 ? (
        <p>{nftData?.nftDescription}</p>
      ) : (
        <CustomSkeleton height={200} width="100%" marginTop={1} />
      )}
      <Notification
        message={notificationMessage}
        state={showNotification}
        setState={setShowNotification}
      />
    </DetailContent>
  );
};

export default NFTInfo;
