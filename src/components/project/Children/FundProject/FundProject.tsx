import React, { useContext, useState, useEffect } from 'react';
import {
  ProjectDetailContext,
  ProjectDetailContextReturnTypes,
} from '@/contexts/ProjectDetailContext';
import { AppContext, AppContextReturnTypes } from '@/contexts/AppContext';
import {
  FundingContainer,
  ProgressWrapper,
  FundItem,
} from './FundProjectStyles';
import {
  ProgressBar,
  TransactionLoader,
  Timer,
  Notification,
} from '@/components/global';
import { CURRENCY_SYMBOL } from '@/data/appInfo';
import useWallet from '@/wallet/useWallet';
import useRegisterUser from '@/hooks/ContractHooks/useRegisterUser';
import useGetCampaign from '@/hooks/ContractHooks/useGetCampaign';
import useFundCampaign from '@/hooks/ContractHooks/useFundCampaign';
import usePostNft from '@/hooks/RequestHooks/POST/usePostNft';
import usePostPortfolio from '@/hooks/RequestHooks/POST/usePostPortfolio';
import { formatPriceValue } from '@/helpers/formatters';

export const fundings: FundProjectTypes = {
  target: {
    title: 'target amount',
  },
  raised: {
    title: 'amount raised',
  },
  investment: {
    title: 'minimum investment',
  },
  investors: {
    title: 'investors',
  },
  deadline: {
    title: 'days to go',
  },
};

interface FundProjectTypes {
  target: {
    title: string;
  };
  raised: {
    title: string;
  };
  investment: {
    title: string;
  };
  investors: {
    title: string;
  };
  deadline: {
    title: string;
  };
}

const FundProject = ({
  raised,
  investment,
  investors,
  deadline,
  target,
}: FundProjectTypes) => {
  const { wallet } = useWallet();
  const { userData } = useContext(AppContext) as AppContextReturnTypes;
  const {
    fundAmount,
    setFundAmount,
    generateNftImage,
    project,
    tokenURI,
    tokenURILoading,
  } = useContext(ProjectDetailContext) as ProjectDetailContextReturnTypes;

  const [notificationMessage, setNotificationMessage] = useState('');
  const [showNotification, setShowNotification] = useState(false);
  const [showFundButton, setShowFundButton] = useState(false);

  // Get the project data from the backend
  const { project: data } = useContext(
    ProjectDetailContext
  ) as ProjectDetailContextReturnTypes;

  // Handle user registeration on the smart contract before user funds a campaign
  const {
    handleRegisterUser,
    isRegisterSuccess,
    isRegisterLoading,
    isUserRegistered,
  } = useRegisterUser();

  // Get updated campaign funding data from the smart contract
  const { campaign } = useGetCampaign({
    projectAddress: project?.project.projectWalletAddress as `0x${string}`,
    project: data,
    token: tokenURI || '',
  });

  // Fund a campaign on the blockchain
  const { fundCampaign, isFundingSuccess, isFundingLoading } = useFundCampaign({
    campaignAddress: project?.project.projectWalletAddress as `0x${string}`,
    fundAmount: Number(fundAmount),
    tokenURI: tokenURI || '',
  });

  // Create a new NFT
  const { createNFT } = usePostNft({
    tokenURI: tokenURI || '',
    projectCategoryId: project?.category.categoryId || '',
  });

  // Add Project to Portfolio
  const { addProjectToPortfolio } = usePostPortfolio();

  useEffect(() => {
    if (isUserRegistered) {
      setShowFundButton(isUserRegistered);
    }
  }, [isUserRegistered]);

  useEffect(() => {
    if (isRegisterSuccess) {
      setShowFundButton(isRegisterSuccess);
      setShowNotification(true);
      setNotificationMessage(
        'Congratulations! You have successfully registered an account on the blockchain. You can now fund the campaign.'
      );
    }
  }, [isRegisterSuccess]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFundAmount(Number(value));
  };

  // Function to generate NFT Metadata
  const handleGenerateNft = async () => {
    if (
      project?.project.minInvestment &&
      fundAmount !== 0 &&
      fundAmount !== '' &&
      wallet.walletStatus.isConnected &&
      campaign?.campaignStatus === 1 &&
      fundAmount >= project?.project.minInvestment
    ) {
      generateNftImage();
    } else {
      setShowNotification(true);
      fundErrorMessage();
    }
  };

  // Function initialize the fundCampaign function on the smart contract
  const handleFundProject = async () => {
    if (
      project?.project.minInvestment &&
      fundAmount !== 0 &&
      fundAmount !== '' &&
      wallet.walletStatus.isConnected &&
      campaign?.campaignStatus === 1 &&
      fundAmount >= project?.project.minInvestment
    ) {
      await fundCampaign();
    } else {
      setShowNotification(true);
      fundErrorMessage();
    }
  };

  const fundErrorMessage = () => {
    if (fundAmount === 0) {
      setNotificationMessage('Please, enter a fund amount above zero (0).');
    }

    if (fundAmount === '') {
      setNotificationMessage('Please, enter a fund amount.');
    }

    if (!wallet.walletStatus.isConnected) {
      setNotificationMessage(
        'Please connect your wallet to fund this project.'
      );
    }
    if (
      project?.project.minInvestment &&
      Number(fundAmount) < project?.project.minInvestment
    ) {
      setNotificationMessage(
        `The minimum funding amount is ${
          project?.project.minInvestment || 0
        } ETH. Please enter an amount greater or equal to this amount.`
      );
    }
  };

  // Series of events that occurs when camapaign is successfully funded
  useEffect(() => {
    if (isFundingSuccess) {
      // Create an NFT data on the backend
      createNFT();

      // Add Project to User Portfolio
      addProjectToPortfolio(project?.project.projectId ?? '', fundAmount || 0);

      // Render notification
      setShowNotification(true);
      setNotificationMessage(
        `Congratuations, you have successfully funded ${project?.project.projectName} with ${fundAmount} ETH. Your newly minted share NFT has been added to your collection.`
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFundingSuccess]);

  return (
    <FundingContainer>
      <ProgressWrapper>
        {campaign && (
          <ProgressBar
            max={Number(campaign?.targetAmount) || 0}
            value={Number(campaign?.raisedAmount) || 0}
          />
        )}
      </ProgressWrapper>
      <div className="fund-item_container">
        <FundItem>
          <h3>
            {Number(campaign?.targetAmount)
              ? `
              ${formatPriceValue(
                Number(campaign?.targetAmount)
              )} ${CURRENCY_SYMBOL}`
              : '--'}
          </h3>
          <p>{target.title}</p>
        </FundItem>
        <FundItem>
          <h3>
            {Number(campaign?.raisedAmount)
              ? `
              ${formatPriceValue(
                Number(campaign?.raisedAmount)
              )} ${CURRENCY_SYMBOL}`
              : Number(campaign?.raisedAmount) === 0
              ? `0 ${CURRENCY_SYMBOL}`
              : '--'}
          </h3>
          <p>{raised.title}</p>
        </FundItem>
        <FundItem>
          <h3>
            {Number(campaign?.minFunding)
              ? `${formatPriceValue(
                  Number(campaign?.minFunding)
                )} ${CURRENCY_SYMBOL}`
              : '--'}
          </h3>
          <p>{investment.title}</p>
        </FundItem>
        <FundItem>
          <h3>
            {campaign?.backersCount
              ? `${formatPriceValue(campaign?.backersCount)}`
              : campaign?.backersCount === 0
              ? '0'
              : '--'}
          </h3>
          <p>{investors.title}</p>
        </FundItem>
        <FundItem>
          <h3>
            {data?.project.createdAt && campaign?.targetDeadline ? (
              <Timer
                startDate={data?.project.createdAt}
                targetSeconds={campaign.targetDeadline}
              ></Timer>
            ) : (
              '--'
            )}
          </h3>
          <p>{deadline.title}</p>
        </FundItem>
        <FundItem spaceUp>
          {userData?.token &&
            wallet.walletAddress &&
            wallet.walletStatus.isConnected &&
            campaign?.campaignStatus === 1 && (
              <input
                type="number"
                step="0.000000000001"
                min="0"
                pattern="^\d+(\.\d+)?$"
                name="fundAmount"
                value={fundAmount}
                onChange={handleInputChange}
                placeholder="Investment Amount (ETH)"
              />
            )}
          {showFundButton ? (
            <>
              {!tokenURI ? (
                <button onClick={handleGenerateNft}>
                  {campaign?.campaignStatus === 1
                    ? 'Fund Project'
                    : 'Funding Closed'}
                  {tokenURILoading && (
                    <span>
                      <TransactionLoader />
                    </span>
                  )}
                </button>
              ) : (
                <button onClick={handleFundProject}>
                  {campaign?.campaignStatus === 1
                    ? 'Confirm Funding'
                    : 'Funding Closed'}
                  {isFundingLoading && (
                    <span>
                      <TransactionLoader />
                    </span>
                  )}
                </button>
              )}
            </>
          ) : (
            <button onClick={handleRegisterUser}>
              Create Account
              {isRegisterLoading && (
                <span>
                  <TransactionLoader />
                </span>
              )}
            </button>
          )}
        </FundItem>
      </div>
      <Notification
        message={notificationMessage}
        state={showNotification}
        setState={setShowNotification}
      />
    </FundingContainer>
  );
};

export default FundProject;
