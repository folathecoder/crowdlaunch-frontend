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
import useGetCategoryById from '@/hooks/RequestHooks/GET/useGetCategoyById';
import { CURRENCY_SYMBOL } from '@/data/appInfo';
import { formatPriceValue } from '@/helpers/formatters';

interface ProjectCardTypes {
  projectName: string;
  projectId: string;
  bannerImageUrl: string;
  targetAmount: number;
  amountRaised: number;
  minInvestment: number;
  noOfLikes: number;
  categoryId: string;
}

const ProjectCard = ({
  projectName,
  projectId,
  bannerImageUrl,
  targetAmount,
  amountRaised,
  minInvestment,
  noOfLikes,
  categoryId,
}: ProjectCardTypes) => {
  const { category, fetchingStatus } = useGetCategoryById({ categoryId });

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
          {fetchingStatus === 2 && (
            <h3 aria-label="project category">{category?.categoryName}</h3>
          )}
          <h4 aria-label="project name">{projectName}</h4>
        </ProjectTitle>
        <ProjectProgress>
          <ProgressBar max={targetAmount} value={amountRaised} />
        </ProjectProgress>
        <ProjectInfo>
          <div>
            <h5>Min Investment</h5>
            {minInvestment && (
              <p>{`> ${formatPriceValue(minInvestment)} ${CURRENCY_SYMBOL}`}</p>
            )}
          </div>
          <div>
            <h5>Amount Raised</h5>
            {amountRaised ? (
              <p>{`${formatPriceValue(amountRaised)} ${CURRENCY_SYMBOL}`}</p>
            ) : (
              amountRaised === 0 && <p>{`0 ${CURRENCY_SYMBOL}`}</p>
            )}
          </div>
        </ProjectInfo>
      </ProjectContainer>
    </Link>
  );
};

export default ProjectCard;
