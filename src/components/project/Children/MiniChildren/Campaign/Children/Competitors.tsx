import React, { useContext } from 'react';
import {
  ProjectDetailContext,
  ProjectDetailContextReturnTypes,
} from '@/contexts/ProjectDetailContext';
import { OverviewContainer, Content } from './MiniChildrenStyles';
import HTMLReactParser from 'html-react-parser';

const Competitors = () => {
  const { project: data } = useContext(
    ProjectDetailContext
  ) as ProjectDetailContextReturnTypes;

  return (
    <OverviewContainer>
      {data?.projectDetails?.competitors && (
        <Content>
          <h2>Who are your core competitors?</h2>
          <div>
            {HTMLReactParser(data?.projectDetails.competitors.split('**')[0])}
          </div>
          <h2>How is your project different from other competitors?</h2>
          <div>
            {HTMLReactParser(data?.projectDetails.competitors.split('**')[1])}
          </div>
          <h2>Explain your projectt&apos;s unique features.</h2>
          <div>
            {HTMLReactParser(data?.projectDetails.competitors.split('**')[2])}
          </div>
        </Content>
      )}
    </OverviewContainer>
  );
};

export default Competitors;
