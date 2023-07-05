import React from 'react';
import Image, { StaticImageData } from 'next/image';
import {
  ProjectContainer,
  ProjectImage,
  ProjectTitle,
  ProjectInfo,
} from './projectCardStyles';
import { ProjectPlaceholder } from 'public/images';

const ProjectCard = () => {
  return (
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
      <ProjectInfo>
        <div>
          <h5>Min Investment</h5>
          <p>{`> $293`}</p>
        </div>
        <div>
          <h5>Amount Raised</h5>
          <p>$900,503,443</p>
        </div>
      </ProjectInfo>
    </ProjectContainer>
  );
};

export default ProjectCard;
