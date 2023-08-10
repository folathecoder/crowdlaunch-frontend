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
import { ProjectPlaceholder } from 'public/images';
import { ProgressBar } from '@/components/global';
import { MdFavorite } from 'react-icons/md';

interface ProjectCardTypes {
  projectName: string;
  projectId: string;
  bannerImageUrl: string;
  targetAmount: number;
  amountRaised: number;
  minInvestment: number;
  noOfLikes: number;
}

const ProjectCard = ({
  projectName,
  projectId,
  bannerImageUrl,
  targetAmount,
  amountRaised,
  minInvestment,
  noOfLikes,
}: ProjectCardTypes) => {
  return (
    <Link href={`/project/${projectId}`} passHref>
      <ProjectContainer>
        <ProjectImage>
          <Image
            src={bannerImageUrl}
            alt={projectName}
            layout="fill"
            objectFit="cover"
            objectPosition="center"
          />
        </ProjectImage>
        <ProjectTitle>
          <h3 aria-label="project category">AI</h3>
          <h4 aria-label="project name">{projectName}</h4>
        </ProjectTitle>
        <ProjectProgress>
          <ProgressBar max={targetAmount} value={amountRaised} />
        </ProjectProgress>
        <ProjectInfo>
          <div>
            <h5>Min Investment</h5>
            <p>{`> ${minInvestment}`}</p>
          </div>
          <div>
            <h5>Amount Raised</h5>
            <p>${amountRaised.toLocaleString()}</p>
          </div>
        </ProjectInfo>
      </ProjectContainer>
    </Link>
  );
};

export default ProjectCard;
