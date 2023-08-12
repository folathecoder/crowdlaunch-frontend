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

  return (
    <FundingContainer>
      <ProgressWrapper>
        {data?.project.targetAmount && data?.project.amountRaised && (
          <ProgressBar
            max={data.project.targetAmount}
            value={data.project.amountRaised}
          />
        )}
      </ProgressWrapper>
      <div className="fund-item_container">
        <FundItem>
          <h3>
            {data?.project.targetAmount
              ? `$
              ${data?.project.targetAmount.toLocaleString()}`
              : '--'}
          </h3>
          <p>{target.title}</p>
        </FundItem>
        <FundItem>
          <h3>
            {data?.project.amountRaised
              ? `$
              ${data?.project.amountRaised.toLocaleString()}`
              : '--'}
          </h3>
          <p>{raised.title}</p>
        </FundItem>
        <FundItem>
          <h3>
            {data?.project.minInvestment
              ? `$
              ${data?.project.minInvestment.toLocaleString()}`
              : '--'}
          </h3>
          <p>{investment.title}</p>
        </FundItem>
        <FundItem>
          <h3>
            {data?.project.noOfInvestors
              ? `${data?.project.noOfInvestors.toLocaleString()}`
              : '--'}
          </h3>
          <p>{investors.title}</p>
        </FundItem>
        <FundItem>
          <h3>
            {data?.project.noOfDaysLeft
              ? `${data?.project.noOfDaysLeft.toLocaleString()}`
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
