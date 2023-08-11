import React from 'react';
import Image from 'next/image';
import Skeleton from '@mui/material/Skeleton';
import {
  ProjectContainer,
  ProjectImage,
  ProjectTitle,
  ProjectInfo,
  ProjectProgress,
  SkeletonContainer,
} from './projectCardStyles';
import { ProjectPlaceholder } from 'public/images';

const ProjectCardSkeleton = () => {
  return (
    <SkeletonContainer>
      <div>
        <Skeleton
          variant="rounded"
          height={267}
          width="100%"
          animation="wave"
          sx={{
            background: 'rgb(211 194 194 / 10%)',
          }}
        />
      </div>
    </SkeletonContainer>
  );
};

export default ProjectCardSkeleton;
