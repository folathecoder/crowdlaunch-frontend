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
          <h4>$23,893.39</h4>
        </MetricsCard>
        <MetricsCard>
          <h3>Wallet Balance</h3>
          <h4>$2,393.39</h4>
        </MetricsCard>
        <MetricsCard>
          <h3>Total Dividend</h3>
          <h4>
            $1,393.39 <span title="dividend percentage gain or loss">+10%</span>
          </h4>
        </MetricsCard>
        <MetricsCard>
          <h3>Claimable Dividend</h3>
          <h4>$893.39</h4>
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
