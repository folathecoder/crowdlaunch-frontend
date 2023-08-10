import React, { useContext } from 'react';
import {
  ProjectDetailContext,
  ProjectDetailContextReturnTypes,
} from '@/contexts/ProjectDetailContext';
import { OverviewContainer, Content } from './MiniChildrenStyles';
import HTMLReactParser from 'html-react-parser';

const Competitors = () => {
  const { project: data, fetchingStatus } = useContext(
    ProjectDetailContext
  ) as ProjectDetailContextReturnTypes;

  return (
    <OverviewContainer>
      {data?.projectDetails.competitors && (
        <Content>{HTMLReactParser(data?.projectDetails.competitors)}</Content>
      )}
    </OverviewContainer>
  );
};

export default Competitors;
