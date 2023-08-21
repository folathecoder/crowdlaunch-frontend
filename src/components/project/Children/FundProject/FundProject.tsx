import React, { useContext, useState } from 'react';
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
import { ProgressBar } from '@/components/global';
import { secondsToDays } from '@/helpers/formatters';
import { CURRENCY_SYMBOL } from '@/data/appInfo';
import useWallet from '@/wallet/useWallet';
import { Notification } from '@/components/global';

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
  const [fundAmount, setFundAmount] = useState<number | ''>('');
  const [notificationMessage, setNotificationMessage] = useState('');
  const [showNotification, setShowNotification] = useState(false);

  const { project: data } = useContext(
    ProjectDetailContext
  ) as ProjectDetailContextReturnTypes;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFundAmount(Number(value));
  };

  const handleFundProject = () => {
    if (
      fundAmount !== 0 &&
      fundAmount !== '' &&
      wallet.walletStatus.isConnected
    ) {
      // Fund project logic
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
  };

  return (
    <FundingContainer>
      <ProgressWrapper>
        {data?.project && (
          <ProgressBar
            max={data.project.targetAmount || 0}
            value={data.project.amountRaised || 0}
          />
        )}
      </ProgressWrapper>
      <div className="fund-item_container">
        <FundItem>
          <h3>
            {data?.project.targetAmount
              ? `
              ${data?.project.targetAmount.toLocaleString()} ${CURRENCY_SYMBOL}`
              : '--'}
          </h3>
          <p>{target.title}</p>
        </FundItem>
        <FundItem>
          <h3>
            {data?.project.amountRaised
              ? `
              ${data?.project.amountRaised.toLocaleString()} ${CURRENCY_SYMBOL}`
              : data?.project.amountRaised === 0
              ? `0 ${CURRENCY_SYMBOL}`
              : '--'}
          </h3>
          <p>{raised.title}</p>
        </FundItem>
        <FundItem>
          <h3>
            {data?.project.minInvestment
              ? `${data?.project.minInvestment.toLocaleString()} ${CURRENCY_SYMBOL}`
              : '--'}
          </h3>
          <p>{investment.title}</p>
        </FundItem>
        <FundItem>
          <h3>
            {data?.project.noOfInvestors
              ? `${data?.project.noOfInvestors.toLocaleString()}`
              : data?.project.noOfInvestors === 0
              ? '0'
              : '--'}
          </h3>
          <p>{investors.title}</p>
        </FundItem>
        <FundItem>
          <h3>
            {data?.project.noOfDaysLeft
              ? `${secondsToDays(data?.project.noOfDaysLeft).toLocaleString()}`
              : '--'}
          </h3>
          <p>{deadline.title}</p>
        </FundItem>
        <FundItem spaceUp>
          {userData?.token &&
            wallet.walletAddress &&
            wallet.walletStatus.isConnected && (
              <input
                type="number"
                step="0.1"
                min="0"
                pattern="^\d*(\.\d{0,9})?$"
                name="fundAmount"
                value={fundAmount.toLocaleString()}
                onChange={handleInputChange}
                placeholder="Investment Amount (ETH)"
              />
            )}
          <button onClick={handleFundProject}>Fund project</button>
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
