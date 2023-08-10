import React, { useContext } from 'react';
import {
  ProjectDetailContext,
  ProjectDetailContextReturnTypes,
} from '@/contexts/ProjectDetailContext';
import HTMLReactParser from 'html-react-parser';
import { OverviewContainer, Content } from './MiniChildrenStyles';

type Props = {};

const Overview = (props: Props) => {
  const { project: data } = useContext(
    ProjectDetailContext
  ) as ProjectDetailContextReturnTypes;

  return (
    <OverviewContainer>
      {data?.projectDetails.overview && (
        <Content>{HTMLReactParser(data?.projectDetails.overview)}</Content>
      )}
    </OverviewContainer>
  );
};

export default Overview;
