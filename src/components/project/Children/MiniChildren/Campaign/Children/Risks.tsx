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
        {data?.projectDetails.risks && (
          <Content>{HTMLReactParser(data?.projectDetails.risks)}</Content>
        )}
      </Content>
    </OverviewContainer>
  );
};

export default Risks;
