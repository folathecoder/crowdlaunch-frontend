import React, { useContext } from 'react';
import {
  ProjectDetailContext,
  ProjectDetailContextReturnTypes,
} from '@/contexts/ProjectDetailContext';
import {
  FundingContainer,
  ProgressWrapper,
  FundItem,
} from './FundProjectStyles';
import { ProgressBar } from '@/components/global';
import { secondsToDays } from '@/helpers/formatters';
import { CURRENCY_SYMBOL } from '@/data/appInfo';

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
  const { project: data } = useContext(
    ProjectDetailContext
  ) as ProjectDetailContextReturnTypes;

  console.log(data?.project.amountRaised);

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
      </div>
      <button>Fund project</button>
    </FundingContainer>
  );
};

export default FundProject;
