import React from 'react';
import {
  FundingContainer,
  ProgressWrapper,
  FundItem,
} from './FundProjectStyles';
import { ProgressBar } from '@/components/global';

export const fundings: FundProjectTypes = {
  target: {
    amount: 32457095759,
    title: 'target amount',
  },
  raised: {
    amount: 43332324,
    title: 'amount raised',
  },
  investment: {
    amount: 653,
    title: 'minimum investment',
  },
  investors: {
    total: 833284,
    title: 'investors',
  },
  deadline: {
    total: 2728,
    title: 'days to go',
  },
};

interface FundProjectTypes {
  target: {
    amount: number;
    title: string;
  };
  raised: {
    amount: number;
    title: string;
  };
  investment: {
    amount: number;
    title: string;
  };
  investors: {
    total: number;
    title: string;
  };
  deadline: {
    total: number;
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
  return (
    <FundingContainer>
      <ProgressWrapper>
        <ProgressBar max={target.amount} value={raised.amount} />
      </ProgressWrapper>
      <div className="fund-item_container">
        <FundItem>
          <h3>${target.amount.toLocaleString()}</h3>
          <p>{target.title}</p>
        </FundItem>
        <FundItem>
          <h3>${raised.amount.toLocaleString()}</h3>
          <p>{raised.title}</p>
        </FundItem>
        <FundItem>
          <h3>${investment.amount.toLocaleString()}</h3>
          <p>{investment.title}</p>
        </FundItem>
        <FundItem>
          <h3>{investors.total.toLocaleString()}</h3>
          <p>{investors.title}</p>
        </FundItem>
        <FundItem>
          <h3>{deadline.total.toLocaleString()}</h3>
          <p>{deadline.title}</p>
        </FundItem>
      </div>
      <button>Fund project</button>
    </FundingContainer>
  );
};

export default FundProject;
