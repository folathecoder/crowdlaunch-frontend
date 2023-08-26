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
  Transactions,
  WalletDividend,
} from './WalletStyles';
import { BsInfoCircle } from 'react-icons/bs';
import { BiCopy } from 'react-icons/bi';
import Tooltip from '@mui/material/Tooltip';
import { CURRENCY_SYMBOL } from '@/data/appInfo';
import { BarcodeGenerator, Button, Notification } from '@/components/global';
import { shortenWalletAddress } from '@/helpers/formatters';
import DepositIcon from 'public/images/global/wallet/deposit-icon.png';
import LockIcon from 'public/images/global/wallet/lock.png';
import useWallet from '@/wallet/useWallet';

const walletInfoData = {
  currentBalance: 'Current ETH balance in the wallet.',
  startBalance: 'Initial ETH balance or the amount funded at inception.',
  withdrawals: 'Cumulative amount withdrawn from the wallet.',
  deposits: 'Cumulative amount deposited into the wallet.',
  dividendPaid: 'Total dividends disbursed to investors to date.',
  outstandingDividend: 'Pending dividend amount due to investors.',
};

const Wallet = () => {
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  return (
    <WalletSection>
      <div>
        <h2>Account Details</h2>
      </div>
      <WalletContainer>
        <WalletInfo>
          <InfoCard
            title="Current balance"
            value={23290}
            description={walletInfoData.currentBalance}
          />
          <InfoCard
            title="Start balance"
            value={23290}
            description={walletInfoData.startBalance}
          />
          <InfoCard
            title="Withdrawals"
            value={23290}
            description={walletInfoData.withdrawals}
          />
          <InfoCard
            title="Deposits"
            value={23290}
            description={walletInfoData.deposits}
          />
          <InfoCard
            title="Dividends paid"
            value={23290}
            description={walletInfoData.dividendPaid}
          />
          <InfoCard
            title="Outstanding dividend"
            value={23290}
            description={walletInfoData.outstandingDividend}
          />
        </WalletInfo>
        <DividendDisbursement />
        <WalletTransaction>
          <WalletDepositCard />
          <WalletWithdrawCard />
        </WalletTransaction>
        {/* <AllTransactions /> */}
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
          {value.toLocaleString()} {CURRENCY_SYMBOL}
        </h4>
      </div>
    </WalletInfoCard>
  );
};

const WalletDepositCard = () => {
  const clipboard = useClipboard();
  const [copied, setCopied] = useState(false);
  const [address, setAddress] = useState(
    '0x3eccc70b6396d8428338d77b71d35c5ff2bd6bed'
  );

  const handleCopyClick = useCallback(() => {
    setCopied(true);
    clipboard.copy(address);
  }, [clipboard, address]);

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
        <BarcodeGenerator value="0x287y9274948379" />
      </div>
      <div className="copy">
        <button onClick={handleCopyClick}>
          {copied ? <>Copied!</> : <>{shortenWalletAddress(address)}</>}
          <span>
            <BiCopy />
          </span>
        </button>
      </div>
    </WalletDeposit>
  );
};

const WalletWithdrawCard = () => {
  const { wallet } = useWallet();
  const { project } = useContext(
    ProjectDetailContext
  ) as ProjectDetailContextReturnTypes;

  const [withdrawal, setWithdrawal] = useState({
    message: '',
    amount: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;

    setWithdrawal((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleWithdraw = () => {
    if (wallet.walletAddress === project?.project.projectWalletAddress) {
      console.log('withdraw');
    }
  };

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
          <label htmlFor="message">Withdrawal Message</label>
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
          />
        </div>
        {false && (
          <div className="withdraw_message" role="alert">
            <p>Transaction message:</p>
            {/* <p>Withdrawal successful</p> */}
            <p>
              Wallet address does not have the required authorisation to
              withdraw funds from this wallet.
            </p>
            {/* <p>
            This wallet does not have sufficient balance to complete this
            transaction.
          </p> */}
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

const AllTransactions = () => {
  return (
    <Transactions>
      <h3>Transactions</h3>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((transaction) => (
        <li key={transaction}>
          <div>
            <div className="tnx_header">
              <div className="txn_icon">
                <Image src={DepositIcon} alt="deposit" width={35} height={35} />
              </div>
              <div>
                <p>Deposit</p>
              </div>
              <div>
                <p className="txn_amount">1,200 {CURRENCY_SYMBOL}</p>
              </div>
            </div>
            <div>
              <p className="txn_msg">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </p>
            </div>
          </div>
          <div>
            <p>12 Sept, 2023</p>
          </div>
        </li>
      ))}
    </Transactions>
  );
};

const DividendDisbursement = () => {
  const { wallet } = useWallet();
  const { project } = useContext(
    ProjectDetailContext
  ) as ProjectDetailContextReturnTypes;

  const handleDisburseDividend = () => {
    if (wallet.walletAddress === project?.project.projectWalletAddress) {
      console.log('disbursement');
    }
  };

  return (
    <WalletDividend>
      <div>
        <h3>Disburse dividends to investors</h3>
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
    </WalletDividend>
  );
};

export default Wallet;
