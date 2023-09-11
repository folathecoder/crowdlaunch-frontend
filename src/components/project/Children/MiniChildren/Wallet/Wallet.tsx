import React, { useState, useEffect, useCallback, useContext } from 'react';
import {
  ProjectDetailContext,
  ProjectDetailContextReturnTypes,
} from '@/contexts/ProjectDetailContext';
import Image from 'next/image';
import { useClipboard } from 'use-clipboard-copy';
import {
  WalletSection,
  WalletContainer,
  WalletInfo,
  WalletInfoCard,
  WalletTransaction,
  WalletDeposit,
  WalletWithdraw,
  WalletDividend,
} from './WalletStyles';
import { BsInfoCircle } from 'react-icons/bs';
import { BiCopy } from 'react-icons/bi';
import Tooltip from '@mui/material/Tooltip';
import { CURRENCY_SYMBOL } from '@/data/appInfo';
import {
  BarcodeGenerator,
  Button,
  Notification,
  Timer,
} from '@/components/global';
import { shortenWalletAddress } from '@/helpers/formatters';
import LockIcon from 'public/images/global/wallet/lock.png';
import useWallet from '@/wallet/useWallet';
import useGetWalletInfo from '@/hooks/ContractHooks/useGetWalletInfo';
import useGetCampaign from '@/hooks/ContractHooks/useGetCampaign';
import { formatPriceValue } from '@/helpers/formatters';

const walletInfoData = {
  currentBalance: 'Current ETH balance in the wallet.',
  startBalance: 'Initial ETH balance or the amount funded at inception.',
  withdrawals: 'Cumulative amount withdrawn from the wallet.',
  deposits: 'Cumulative amount deposited into the wallet.',
  dividendPaid: 'Total dividends disbursed to investors to date.',
  outstandingDividend: 'Pending dividend amount due to investors.',
};

interface DepositPropType {
  depositAddress: `0x${string}`;
}

interface WithdrawPropType {
  withdraw: (amount: number) => Promise<void>;
  isWithdrawalSuccess: boolean;
  isWithdrawalLoading: boolean;
  isWithdrawalError: boolean;
  currentBalance: string | undefined;
}

const Wallet = () => {
  const { project, tokenURI, withdrawal } = useContext(
    ProjectDetailContext
  ) as ProjectDetailContextReturnTypes;

  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  // Get updated campaign funding data from the smart contract
  const { campaign } = useGetCampaign({
    projectAddress: project?.project.projectWalletAddress as `0x${string}`,
    project: project,
    token: tokenURI || '',
  });

  // Get all wallet information
  const {
    startBalance,
    totalDeposits,
    totalWithdrawals,
    paidDividends,
    currentBalance,
    walletAddress,
    withdraw,
    isWithdrawalSuccess,
    isWithdrawalLoading,
    isWithdrawalError,
  } = useGetWalletInfo({
    contractAddress: campaign?.depositAddress as `0x${string}`,
    withdrawAmount: withdrawal.amount,
  });

  const outstandingDividends = Number(currentBalance) - Number(startBalance);

  return (
    <WalletSection>
      <div>
        <h2>Account Details</h2>
      </div>
      <WalletContainer>
        <WalletInfo>
          <InfoCard
            title="Current balance"
            value={Number(formatPriceValue(Number(currentBalance)))}
            description={walletInfoData.currentBalance}
          />
          <InfoCard
            title="Start balance"
            value={Number(formatPriceValue(Number(startBalance)))}
            description={walletInfoData.startBalance}
          />
          <InfoCard
            title="Withdrawals"
            value={Number(formatPriceValue(Number(totalWithdrawals)))}
            description={walletInfoData.withdrawals}
          />
          <InfoCard
            title="Deposits"
            value={Number(formatPriceValue(Number(totalDeposits)))}
            description={walletInfoData.deposits}
          />
          <InfoCard
            title="Dividends paid"
            value={Number(formatPriceValue(Number(paidDividends)))}
            description={walletInfoData.dividendPaid}
          />
          <InfoCard
            title="Outstanding dividend"
            value={
              Number(formatPriceValue(outstandingDividends)) !== 0
                ? Number(formatPriceValue(outstandingDividends))
                : 0
            }
            description={walletInfoData.outstandingDividend}
          />
        </WalletInfo>
        <DividendDisbursement />
        <WalletTransaction>
          <WalletDepositCard depositAddress={walletAddress} />
          <WalletWithdrawCard
            withdraw={withdraw}
            isWithdrawalSuccess={isWithdrawalSuccess}
            isWithdrawalLoading={isWithdrawalLoading}
            isWithdrawalError={isWithdrawalError}
            currentBalance={currentBalance}
          />
        </WalletTransaction>
      </WalletContainer>
      <Notification
        message={notificationMessage}
        setState={setShowNotification}
        state={showNotification}
      />
    </WalletSection>
  );
};

interface InfoCardProps {
  title: string;
  value: number;
  description: string;
}

const InfoCard = ({ title, value, description }: InfoCardProps) => {
  return (
    <WalletInfoCard>
      <div>
        <Tooltip placement="top" title={description}>
          <h3>
            {title}
            <span>
              <BsInfoCircle />
            </span>
          </h3>
        </Tooltip>
        <h4>
          {value} {CURRENCY_SYMBOL}
        </h4>
      </div>
    </WalletInfoCard>
  );
};

const WalletDepositCard = ({ depositAddress }: DepositPropType) => {
  const clipboard = useClipboard();
  const [copied, setCopied] = useState(false);

  const handleCopyClick = useCallback(() => {
    setCopied(true);
    clipboard.copy(depositAddress);
  }, [clipboard, depositAddress]);

  useEffect(() => {
    setTimeout(() => {
      if (copied) {
        setCopied(false);
      }
    }, 2000);
  }, [copied]);

  return (
    <WalletDeposit>
      <div>
        <h3>Deposit</h3>
        <p>To deposit funds into the project&apos;s wallet, either:</p>
        <ol>
          <li>Scan the QR Code using your mobile wallet application.</li>
          <li>
            Copy the Wallet Address below and paste it into your wallet&apos;s
            &quot;Send&quot; or &quot;Transfer&quot; section.
          </li>
        </ol>
      </div>
      <div className="qrcode">
        {depositAddress && <BarcodeGenerator value={depositAddress} />}
      </div>
      <div className="copy">
        <button onClick={handleCopyClick}>
          {copied ? (
            <>Copied!</>
          ) : (
            <>
              {depositAddress
                ? shortenWalletAddress(depositAddress?.toString())
                : ''}
            </>
          )}
          <span>
            <BiCopy />
          </span>
        </button>
      </div>
    </WalletDeposit>
  );
};

const WalletWithdrawCard = ({
  withdraw,
  isWithdrawalSuccess,
  isWithdrawalLoading,
  isWithdrawalError,
  currentBalance,
}: WithdrawPropType) => {
  const { wallet } = useWallet();
  const { project, withdrawal, setWithdrawal } = useContext(
    ProjectDetailContext
  ) as ProjectDetailContextReturnTypes;

  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;

    setWithdrawal((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleWithdraw = () => {
    if (wallet.walletAddress === project?.project.projectWalletAddress) {
      if (withdrawal.amount !== 0 && withdrawal.amount) {
        if (currentBalance && withdrawal.amount <= Number(currentBalance)) {
          withdraw(withdrawal.amount);
        } else {
          setShowNotification(true);
          setNotificationMessage(
            'This wallet does not have sufficient balance to complete this transaction.'
          );
        }
      } else {
        setShowNotification(true);
        setNotificationMessage('You cannot withdraw 0 ETH from your wallet. ');
      }
    } else {
      setShowNotification(true);
      setNotificationMessage(
        'Wallet address does not have the required authorisation to withdraw funds from this wallet.'
      );
    }
  };

  useEffect(() => {
    if (isWithdrawalSuccess) {
      setShowNotification(true);
      setNotificationMessage(
        'Successful withdrawal: The authorised wallet address has been credited.'
      );
    }
  }, [isWithdrawalSuccess]);

  useEffect(() => {
    if (isWithdrawalError) {
      setShowNotification(true);
      setNotificationMessage(
        'An error occurred: The error might be due any of the following: Insufficient Gas, Authorisation, or Internet Connectivity.'
      );
    }
  }, [isWithdrawalError]);

  // Hide notification message after 7 seconds
  useEffect(() => {
    if (showNotification) {
      const timer = setTimeout(() => {
        setShowNotification(false);
      }, 7000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [showNotification]);

  return (
    <WalletWithdraw>
      <div>
        <h3>Withdraw</h3>
        <p>
          Ensure you are connected to that wallet address that has the correct
          authorisation to withdraw funds from this wallet.
        </p>
      </div>
      <div>
        <div>
          <label htmlFor="message">Withdrawal Message (Optional)</label>
          <input
            type="text"
            name="message"
            value={withdrawal.message}
            onChange={handleInputChange}
            placeholder="e.g. Email subscription payment"
            maxLength={40}
          />
          <label htmlFor="number">Withdrawal Amount</label>
          <input
            type="number"
            step="0.1"
            min="0"
            pattern="^\d*(\.\d{0,9})?$"
            name="amount"
            value={withdrawal.amount}
            onChange={handleInputChange}
            placeholder="Withdrawal Amount (ETH)"
          />
        </div>
        <div className="button_container">
          <Button
            buttonTitle="Withdraw"
            buttonType="action"
            buttonFunction={handleWithdraw}
            showLoader={isWithdrawalLoading}
          />
        </div>
        {showNotification && (
          <div className="withdraw_message" role="alert">
            <p>{notificationMessage}</p>
          </div>
        )}
      </div>
      {wallet.walletAddress !== project?.project.projectWalletAddress && (
        <Tooltip
          title="You are not authorised to withdraw funds from this wallet"
          placement="top"
        >
          <div className="access">
            <div>
              <Image src={LockIcon} alt="locked" height={30} width={30} />
            </div>
          </div>
        </Tooltip>
      )}
    </WalletWithdraw>
  );
};

const DividendDisbursement = () => {
  const { wallet } = useWallet();
  const { project } = useContext(
    ProjectDetailContext
  ) as ProjectDetailContextReturnTypes;

  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  const handleDisburseDividend = () => {
    if (wallet.walletAddress === project?.project.projectWalletAddress) {
      setShowNotification(true);
      setNotificationMessage(
        'Dividend disbursement is currently unavailable as the project requires time to generate profits.'
      );
    }
  };

  return (
    <WalletDividend>
      <div>
        <h3>Disburse dividends to investors</h3>
        <p>
          Next disbursement round is in{' '}
          <span>
            <Timer
              startDate={project?.project.createdAt ?? ''}
              targetSeconds={13000000}
            />
          </span>
        </p>
      </div>
      <div>
        <Button
          buttonTitle="Pay Dividend"
          buttonType="action"
          buttonFunction={handleDisburseDividend}
        />
      </div>
      {wallet.walletAddress !== project?.project.projectWalletAddress && (
        <Tooltip
          title="You are not authorised to disburse dividends"
          placement="top"
        >
          <div className="access">
            <div>
              <Image src={LockIcon} alt="locked" height={30} width={30} />
            </div>
          </div>
        </Tooltip>
      )}
      <Notification
        message={notificationMessage}
        setState={setShowNotification}
        state={showNotification}
      />
    </WalletDividend>
  );
};

export default Wallet;
