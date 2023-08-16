import React, { useContext } from 'react';
import {
  ProjectDetailContext,
  ProjectDetailContextReturnTypes,
} from '@/contexts/ProjectDetailContext';
import { OverviewContainer, Content } from './MiniChildrenStyles';
import HTMLReactParser from 'html-react-parser';

const Financials = () => {
  const { project: data } = useContext(
    ProjectDetailContext
  ) as ProjectDetailContextReturnTypes;

  return (
    <OverviewContainer>
      <Content>
        {data?.projectDetails?.financials && (
          <Content>
            <h2>What is your projected revenue and expenses?</h2>
            <div>
              {HTMLReactParser(data?.projectDetails.financials.split('**')[0])}
            </div>
            <h2>What is your expected profitability timeline?</h2>
            <div>
              {HTMLReactParser(data?.projectDetails.financials.split('**')[1])}
            </div>
            <h2>Explain your key financial metrics and milestones.</h2>
            <div>
              {HTMLReactParser(data?.projectDetails.financials.split('**')[2])}
            </div>
          </Content>
        )}
      </Content>
    </OverviewContainer>
  );
};

export default Financials;
