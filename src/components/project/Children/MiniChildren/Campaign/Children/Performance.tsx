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
        <Content>{HTMLReactParser(data?.projectDetails.performance)}</Content>
      )}
    </OverviewContainer>
  );
};

export default Performance;
