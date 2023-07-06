import React from 'react';
import { StaticImageData } from 'next/image';
import Image from 'next/image';
import { StepsContainer, StepsWrapper, UniqueStep } from './stepsSectionStyles';

interface StepsArrayProps {
  data: StepsProps[];
}

interface StepsProps {
  img: StaticImageData;
  title: string;
  paragraph: string;
}

const StepsSection = ({ data }: StepsArrayProps) => {
  return (
    <StepsContainer>
      <StepsWrapper>
        {data.map((step, index) => {
          return (
            <UniqueStep key={index}>
              <Image src={step.img} alt="steps for investing" />
              <h3>{step.title}</h3>
              <p>{step.paragraph}</p>
            </UniqueStep>
          );
        })}
      </StepsWrapper>
    </StepsContainer>
  );
};

export default StepsSection;
