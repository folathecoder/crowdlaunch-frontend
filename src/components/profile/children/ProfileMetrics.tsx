import React, { useContext, useState } from 'react';
import { ProfileContext, ProfileReturnTypes } from '../context/ProfileContext';
import {
  MetricsContainer,
  MetricsCard,
} from '@/components/profile/ProfileStyles';
import { Button } from '@/components/global';
import { CURRENCY_SYMBOL } from '@/data/appInfo';
import useGetUserInfo from '@/hooks/ContractHooks/useGetUserInfo';
import { Notification } from '@/components/global';

const ProfileMetrics = () => {
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  const { profileMetrics } = useContext(ProfileContext) as ProfileReturnTypes;

  const { walletBalance } = profileMetrics;
  const { userInfo } = useGetUserInfo();

  const handleClaim = () => {
    setShowNotification(true);
    setNotificationMessage('You have no dividends available to claim.');
  };

  return (
    <MetricsContainer>
      <div className="metrics_left">
        <MetricsCard>
          <h3>Total Investment</h3>
          <h4>
            {userInfo?.totalInvestedAmount ?? 0.0} {CURRENCY_SYMBOL}
          </h4>
        </MetricsCard>
        <MetricsCard>
          <h3>Wallet Balance</h3>
          <h4>
            {Number(walletBalance).toFixed(3)} {CURRENCY_SYMBOL}
          </h4>
        </MetricsCard>
        <MetricsCard>
          <h3>Total Dividend</h3>
          <h4>
            {userInfo?.totalDividendEarned ?? 0.0} {CURRENCY_SYMBOL}
          </h4>
        </MetricsCard>
        <MetricsCard>
          <h3>Claimable Dividend</h3>
          <h4>
            {userInfo?.claimableBalance ?? 0.0}
            {CURRENCY_SYMBOL}
          </h4>
        </MetricsCard>
      </div>
      <div>
        <Button
          buttonTitle="Claim Dividend"
          buttonType="action"
          buttonFunction={handleClaim}
        />
      </div>
      <Notification
        message={notificationMessage}
        setState={setShowNotification}
        state={showNotification}
      />
    </MetricsContainer>
  );
};

export default ProfileMetrics;
