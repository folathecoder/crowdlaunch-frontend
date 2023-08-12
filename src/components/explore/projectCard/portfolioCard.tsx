import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ProjectContainer,
  ProjectImage,
  ProjectTitle,
  ProjectInfo,
  ProjectProgress,
} from './projectCardStyles';
import { ProgressBar } from '@/components/global';
import useGetProjectById from '@/hooks/RequestHooks/GET/useGetProjectById';
import ProjectCardSkeleton from './projectCardSkeleton';

interface ProjectCardTypes {
  projectId: string;
}

const PortfolioCard = ({ projectId }: ProjectCardTypes) => {
  const { project, fetchingStatus } = useGetProjectById({ projectId });

  return (
    <>
      {fetchingStatus === 1 && <ProjectCardSkeleton />}
      {fetchingStatus === 2 && (
        <Link href={`/project/${projectId}`} passHref>
          <ProjectContainer>
            <ProjectImage>
              {project?.project?.bannerImageUrl &&
                project?.project?.projectName && (
                  <Image
                    src={project.project.bannerImageUrl}
                    alt={project.project.projectName}
                    layout="fill"
                    objectFit="cover"
                    objectPosition="center"
                  />
                )}
            </ProjectImage>
            <ProjectTitle>
              {project?.category?.categoryName && (
                <h3 aria-label="project category">
                  {project.category.categoryName}
                </h3>
              )}
              <h4 aria-label="project name">{project?.project?.projectName}</h4>
            </ProjectTitle>
            <ProjectProgress>
              {project?.project?.targetAmount &&
                project?.project?.amountRaised && (
                  <ProgressBar
                    max={project.project.targetAmount}
                    value={project.project.amountRaised}
                  />
                )}
            </ProjectProgress>
            <ProjectInfo>
              <div>
                <h5>Min Investment</h5>
                {project?.project?.minInvestment && (
                  <p>{`> ${project.project.minInvestment}`}</p>
                )}
              </div>
              <div>
                <h5>Amount Raised</h5>
                {project?.project?.amountRaised && (
                  <p>${project.project.amountRaised.toLocaleString()}</p>
                )}
              </div>
            </ProjectInfo>
          </ProjectContainer>
        </Link>
      )}
    </>
  );
};

export default PortfolioCard;
