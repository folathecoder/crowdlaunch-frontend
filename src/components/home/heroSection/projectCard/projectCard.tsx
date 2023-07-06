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

interface ProjectCardTypes {
  data: ProjectCardObjTypes[];
}

interface ProjectCardObjTypes {
  img: StaticImageData;
  title: string;
  link: string;
  bgColor: string;
  paragraph: string;
  invest: INVESTMENT[];
}

interface INVESTMENT {
  title: string;
  amount: number;
}

const ProjectCard = ({ data }: ProjectCardTypes) => {
  return (
    <ProjectContainer>
      <ProjectWrapperScroll>
        {data.map((nft, index) => {
          return (
            <UniqueProject key={index} bgColor={nft.bgColor}>
              <ProjectLink href={nft.link} target="_blank">
                <ImageWrapper>
                  <Image src={nft.img} alt="token" layout="responsive" />
                </ImageWrapper>
                <ContentWrapper>
                  <div>
                    <h3>{nft.title}</h3>
                    <p>{nft.paragraph}</p>
                  </div>
                  <div>
                    {nft.invest.map(({ amount, title }, index) => {
                      return (
                        <div key={index}>
                          <p>{title}</p>
                          <h3>{`$${amount.toLocaleString()}`}</h3>
                        </div>
                      );
                    })}
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
