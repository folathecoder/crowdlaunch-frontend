import React from 'react';
import {
  MetricsContainer,
  MetricsCard,
} from '@/components/profile/ProfileStyles';
import { Button } from '@/components/global';

const ProfileMetrics = () => {
  return (
    <MetricsContainer>
      <div className="metrics_left">
        <MetricsCard>
          <h3>Total Investment</h3>
          <h4>$0.0</h4>
        </MetricsCard>
        <MetricsCard>
          <h3>Wallet Balance</h3>
          <h4>$0.0</h4>
        </MetricsCard>
        <MetricsCard>
          <h3>Total Dividend</h3>
          <h4>
            $0.0 <span title="dividend percentage gain or loss">+0.0%</span>
          </h4>
        </MetricsCard>
        <MetricsCard>
          <h3>Claimable Dividend</h3>
          <h4>$0.0</h4>
        </MetricsCard>
      </div>
      <div>
        <Button
          buttonTitle="Claim Dividend"
          buttonType="action"
          buttonFunction={() => {}}
        />
      </div>
    </MetricsContainer>
  );
};

export default ProfileMetrics;
