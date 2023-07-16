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

const targetAmount = 230200000;
const raisedAmount = 194555490;

const ProjectCard = () => {
  return (
    <Link href="/project/1" passHref>
      <ProjectContainer>
        <ProjectImage>
          <Image
            src={ProjectPlaceholder}
            alt="NeuroSynth Robotics"
            layout="fill"
            objectFit="cover"
            objectPosition="center"
          />
        </ProjectImage>
        <ProjectTitle>
          <h3 aria-label="project category">AI & Robotics</h3>
          <h4 aria-label="project name">NeuroSynth Robotics</h4>
        </ProjectTitle>
        <ProjectProgress>
          <ProgressBar max={targetAmount} value={raisedAmount} />
        </ProjectProgress>
        <ProjectInfo>
          <div>
            <h5>Min Investment</h5>
            <p>{`> $293`}</p>
          </div>
          <div>
            <h5>Amount Raised</h5>
            <p>${raisedAmount.toLocaleString()}</p>
          </div>
        </ProjectInfo>
      </ProjectContainer>
    </Link>
  );
};

export default ProjectCard;
