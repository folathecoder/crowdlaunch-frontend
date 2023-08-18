import React, { useContext } from 'react';
import {
  ProjectDetailContext,
  ProjectDetailContextReturnTypes,
} from '@/contexts/ProjectDetailContext';
import { OverviewContainer, Content } from './MiniChildrenStyles';
import HTMLReactParser from 'html-react-parser';

const Dividend = () => {
  const { project: data } = useContext(
    ProjectDetailContext
  ) as ProjectDetailContextReturnTypes;

  return (
    <OverviewContainer>
      <Content>
        {data?.projectDetails?.dividend && (
          <Content>
            <h2>What are the features of your project&apos;s NFT share?</h2>
            <div>
              {HTMLReactParser(data?.projectDetails.dividend.split('**')[0])}
            </div>
            <h2>Dividend breakdown and payout period.</h2>
            <div>
              {HTMLReactParser(data?.projectDetails.dividend.split('**')[1])}
            </div>
          </Content>
        )}
      </Content>
    </OverviewContainer>
  );
};

export default Dividend;
