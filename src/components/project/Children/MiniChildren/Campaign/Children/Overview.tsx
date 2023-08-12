import React, { useContext } from 'react';
import { Skeleton } from '@mui/material';
import {
  ProjectDetailContext,
  ProjectDetailContextReturnTypes,
} from '@/contexts/ProjectDetailContext';
import HTMLReactParser from 'html-react-parser';
import { OverviewContainer, Content } from './MiniChildrenStyles';

const Overview = () => {
  const { project: data } = useContext(
    ProjectDetailContext
  ) as ProjectDetailContextReturnTypes;

  return (
    <OverviewContainer>
      {data?.projectDetails?.overview ? (
        <Content>{HTMLReactParser(data?.projectDetails.overview)}</Content>
      ) : (
        <Content>
          <React.Fragment>
            {new Array(5).fill(null).map((item, index) => (
              <div key={index}>
                <div>
                  <Skeleton
                    variant="rounded"
                    height={30}
                    width="100%"
                    animation="wave"
                    sx={{
                      background: 'rgb(211 194 194 / 10%)',
                    }}
                  />
                  <Skeleton
                    variant="rounded"
                    height={100}
                    width="100%"
                    animation="wave"
                    sx={{
                      background: 'rgb(211 194 194 / 10%)',
                      margin: '1rem 0rem',
                    }}
                  />
                </div>
              </div>
            ))}
          </React.Fragment>
        </Content>
      )}
    </OverviewContainer>
  );
};

export default Overview;
