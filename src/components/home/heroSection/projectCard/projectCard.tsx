import { StaticImageData } from 'next/image';
import Image from 'next/image';
import React from 'react';
import {
  ProjectWrapperScroll,
  ProjectContainer,
  UniqueProject,
  ImageWrapper,
  ContentWrapper,
  ProjectLink,
} from './projectCardStyles';
import useGetProjects from '@/hooks/RequestHooks/GET/useGetProjects';
import { heroCardColors } from '@/data/home/heroData';

const ProjectCard = () => {
  const { projects, fetchingStatus: fetchingProjects } = useGetProjects();

  return (
    <ProjectContainer>
      <ProjectWrapperScroll>
        {fetchingProjects === 2 &&
          projects?.slice(0, 6).map((project, index) => {
            return (
              <UniqueProject
                key={project.projectId}
                bgColor={heroCardColors[index]}
              >
                <ProjectLink
                  href={`/project/${project.projectId}`}
                  target="_blank"
                >
                  <ImageWrapper>
                    <Image
                      src={project.bannerImageUrl}
                      alt={project.projectName}
                      layout="fill"
                      objectFit="cover"
                      objectPosition="center"
                    />
                  </ImageWrapper>
                  <ContentWrapper>
                    <div>
                      <h3>{project.projectName}</h3>
                      <p>{project.noOfInvestors.toLocaleString()} investors</p>
                    </div>
                    <div>
                      <div>
                        <p>Min Investment</p>
                        <h3>{`$${project.minInvestment.toLocaleString()}`}</h3>
                      </div>
                      <div className="amount_raised">
                        <p>Amount Raised</p>
                        <h3>{`$${project.amountRaised.toLocaleString()}`}</h3>
                      </div>
                    </div>
                  </ContentWrapper>
                </ProjectLink>
              </UniqueProject>
            );
          })}
      </ProjectWrapperScroll>
    </ProjectContainer>
  );
};

export default ProjectCard;
