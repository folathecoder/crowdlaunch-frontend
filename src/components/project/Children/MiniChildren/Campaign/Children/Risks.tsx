import React, { useContext } from 'react';
import {
  ProjectDetailContext,
  ProjectDetailContextReturnTypes,
} from '@/contexts/ProjectDetailContext';
import { OverviewContainer, Content } from './MiniChildrenStyles';
import HTMLReactParser from 'html-react-parser';

const Risks = () => {
  const { project: data } = useContext(
    ProjectDetailContext
  ) as ProjectDetailContextReturnTypes;

  return (
    <OverviewContainer>
      <Content>
        {data?.projectDetails?.risks && (
          <Content>
            <h2>
              What are the major and minor risks associated with your project?
            </h2>
            <div>
              {HTMLReactParser(data?.projectDetails.risks.split('**')[0])}
            </div>
            <h2>What are the legal or regulatory terms of the project?</h2>
            <div>
              {HTMLReactParser(data?.projectDetails.risks.split('**')[1])}
            </div>
          </Content>
        )}
      </Content>
    </OverviewContainer>
  );
};

export default Risks;
