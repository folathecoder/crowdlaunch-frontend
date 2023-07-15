import React, { useState } from 'react';
import Overview from './Children/Overview';
import Competitors from './Children/Competitors';
import Strategy from './Children/Strategy';
import Financials from './Children/Financials';
import Dividend from './Children/Dividend';
import Performance from './Children/Performance';
import Risks from './Children/Risks';
import VoteProject from '../../VoteProject/VoteProject';
import { votingData, votingData2 } from '../../VoteProject/VoteProject';

import {
  CampaignContainer,
  ActiveMiniTab,
  MiniTabContainer,
  ActiveContentWrapper,
  VotingWrapper,
} from './CampaignStyles';

type Props = {};

const campaignMiniData = [
  'OVERVIEW',
  'COMPETITORS',
  'STRATEGY',
  'FINANCIALS',
  'DIVIDEND',
  'PERFORMANCE',
  'RISKS',
];

const Campaign = (props: Props) => {
  const [contents, setContents] = useState<React.ReactNode[]>([
    <Overview key="overview" />,
    <Competitors key="competitors" />,
    <Strategy key="strategy" />,
    <Financials key="financials" />,
    <Dividend key="dividend" />,
    <Performance key="performance" />,
    <Risks key="risks" />,
  ]);

  const [activeContent, setActiveContent] = useState<number>(0);

  const handleActive = (active: number) => {
    setActiveContent(active);
  };

  return (
    <CampaignContainer>
      <MiniTabContainer>
        <div>
          <ul>
            {campaignMiniData.map((data, index) => {
              const isActive = activeContent === index;

              return (
                <ActiveMiniTab
                  isActive={isActive}
                  onClick={() => handleActive(index)}
                  key={index}
                >
                  {data}
                </ActiveMiniTab>
              );
            })}
          </ul>
        </div>
      </MiniTabContainer>

      <ActiveContentWrapper>{contents[activeContent]}</ActiveContentWrapper>

      <VotingWrapper>
        <div>
          <VoteProject {...votingData} />
          <VoteProject {...votingData2} />
        </div>
      </VotingWrapper>
    </CampaignContainer>
  );
};

export default Campaign;
