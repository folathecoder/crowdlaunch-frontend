import React, { useContext } from 'react';
import {
  ProjectDetailContext,
  ProjectDetailContextReturnTypes,
} from '@/contexts/ProjectDetailContext';
import { OverviewContainer, Content } from './MiniChildrenStyles';
import HTMLReactParser from 'html-react-parser';

const Strategy = () => {
  const { project: data } = useContext(
    ProjectDetailContext
  ) as ProjectDetailContextReturnTypes;

  return (
    <OverviewContainer>
      <Content>
        {data?.projectDetails?.strategy && (
          <Content>
            <h2>Explain your core business strategy?</h2>
            <div>
              {HTMLReactParser(data?.projectDetails.strategy.split('**')[0])}
            </div>
            <h2>What is your customer acquistion and retention strategy?</h2>
            <div>
              {HTMLReactParser(data?.projectDetails.strategy.split('**')[1])}
            </div>
            <h2>What is your marketing strategy?</h2>
            <div>
              {HTMLReactParser(data?.projectDetails.strategy.split('**')[2])}
            </div>
            <h2>What is your growth strategy?</h2>
            <div>
              {HTMLReactParser(data?.projectDetails.strategy.split('**')[3])}
            </div>
          </Content>
        )}
      </Content>
    </OverviewContainer>
  );
};

export default Strategy;
