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
import { ProgressBar, TransactionLoader, Timer } from '@/components/global';
import { CURRENCY_SYMBOL } from '@/data/appInfo';
import useWallet from '@/wallet/useWallet';
import { Notification } from '@/components/global';
import useRegisterUser from '@/hooks/ContractHooks/useRegisterUser';
import useGetCampaign from '@/hooks/ContractHooks/useGetCampaign';
import { weiConverter, weiToEther } from '@/helpers/weiConverter';
import useGetTokenId from '@/hooks/ContractHooks/useGetTokenId';
import useFundCampaign from '@/hooks/ContractHooks/useFundCampaign';
import usePostNft from '@/hooks/RequestHooks/POST/usePostNft';
import usePostPortfolio from '@/hooks/RequestHooks/POST/usePostPortfolio';

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
  const { fundAmount, setFundAmount, generateNftImage, project, tokenURI } =
    useContext(ProjectDetailContext) as ProjectDetailContextReturnTypes;

  const [notificationMessage, setNotificationMessage] = useState('');
  const [showNotification, setShowNotification] = useState(false);
  const [showFundButton, setShowFundButton] = useState(false);
  const [fundingLoading, setFundingLoading] = useState(false);
  const [hasStartedFunding, setHasStartedFunding] = useState(false);

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
  });

  // Fund a campaign on the blockchain
  const {
    fundCampaign,
    isFundingSuccess,
    isFundingLoading,
    isFundingError,
    isFundingIdle,
  } = useFundCampaign({
    campaignAddress: project?.project.projectWalletAddress as `0x${string}`,
    fundAmount: Number(fundAmount),
    tokenURI: tokenURI || '',
  });

  // Create a new NFT
  const { nftData, fetchError, fetchStatus, createNFT } = usePostNft({
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

  // Function to generate NFT Metadata and fund a project
  const handleFundProject = async () => {
    if (
      project?.project.minInvestment &&
      fundAmount !== 0 &&
      fundAmount !== '' &&
      wallet.walletStatus.isConnected &&
      campaign?.campaignStatus === 1 &&
      fundAmount >= project?.project.minInvestment
    ) {
      setFundingLoading(true);
      await generateNftImage();
    } else {
      setFundingLoading(false);
      setShowNotification(true);
      fundErrorMessage();
    }
  };

  // Initiate the funding process then the tokenURI is avaiable
  useEffect(() => {
    if (tokenURI && !hasStartedFunding) {
      console.log('Yeasss 1');
      const startFunding = async () => {
        await fundCampaign();
        setHasStartedFunding(true); // Mark as started

        console.log('Yeasss 2');
      };

      startFunding();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokenURI, hasStartedFunding]);

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

  // Show campaign funding success message
  useEffect(() => {
    if (isFundingSuccess) {
      setFundingLoading(false);

      // Create NFT
      createNFT();

      //Add Project to User Portfolio
      addProjectToPortfolio(project?.project.projectId || '', fundAmount || 0);

      setShowNotification(true);
      setNotificationMessage(
        `Congratuations, you have successfully funded ${project?.project.projectName} with ${fundAmount} ETH. Your newly minted share NFT has been added to your collection.`
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    fundAmount,
    isFundingSuccess,
    project?.project.projectId,
    project?.project.projectName,
  ]);

  useEffect(() => {
    if (isFundingError) {
      setFundingLoading(false);
    }
  }, [isFundingError]);

  console.log(tokenURI, isFundingSuccess, isFundingError);

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
              ${Number(campaign?.targetAmount).toFixed(3)} ${CURRENCY_SYMBOL}`
              : '--'}
          </h3>
          <p>{target.title}</p>
        </FundItem>
        <FundItem>
          <h3>
            {Number(campaign?.raisedAmount)
              ? `
              ${Number(campaign?.raisedAmount).toFixed(3)} ${CURRENCY_SYMBOL}`
              : Number(campaign?.raisedAmount) === 0
              ? `0 ${CURRENCY_SYMBOL}`
              : '--'}
          </h3>
          <p>{raised.title}</p>
        </FundItem>
        <FundItem>
          <h3>
            {Number(campaign?.minFunding)
              ? `${Number(campaign?.minFunding).toFixed(3)} ${CURRENCY_SYMBOL}`
              : '--'}
          </h3>
          <p>{investment.title}</p>
        </FundItem>
        <FundItem>
          <h3>
            {campaign?.backersCount
              ? `${campaign?.backersCount}`
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
                targetSeconds={900000}
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
            <button onClick={handleFundProject}>
              {campaign?.campaignStatus === 1
                ? 'Fund Project'
                : 'Funding Closed'}
              {fundingLoading && (
                <span>
                  <TransactionLoader />
                </span>
              )}
            </button>
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
