import React, { useContext } from 'react';
import {
  ProjectDetailContext,
  ProjectDetailContextReturnTypes,
} from '@/contexts/ProjectDetailContext';
import HTMLReactParser from 'html-react-parser';
import { OverviewContainer, Content } from './MiniChildrenStyles';

const Performance = () => {
  const { project: data } = useContext(
    ProjectDetailContext
  ) as ProjectDetailContextReturnTypes;

  return (
    <OverviewContainer>
      {data?.projectDetails?.performance && (
        <Content>
          <h2>How do you plan to track and measure performance?</h2>
          <div>
            {HTMLReactParser(data?.projectDetails.performance.split('**')[0])}
          </div>
          <h2>How is your project different from other competitors?</h2>
          <div>
            {HTMLReactParser(data?.projectDetails.performance.split('**')[1])}
          </div>
          <h2>Explain your project&apos;s unique features.</h2>
          <div>
            {HTMLReactParser(data?.projectDetails.performance.split('**')[2])}
          </div>
        </Content>
      )}
    </OverviewContainer>
  );
};

export default Performance;
