import Image, { StaticImageData } from 'next/image';
import React from 'react';
import {
  ShowcaseContainer,
  ShowcaseWrapper,
  PositiveContainer,
  NegativeContainer,
  Uniquenology,
} from '@/components/home/showcaseSection/showcaseSectionStyles';

interface ShowcaseTypes {
  icon: StaticImageData;
  title: string;
}

interface ShowcaseArrayTypes {
  data: ShowcaseTypes[];
}

const ShowcaseSection = ({ data }: ShowcaseArrayTypes) => {
  return (
    <ShowcaseContainer>
      <ShowcaseWrapper>
        <PositiveContainer itemNumber={data.length}>
          {data.map((content, index) => {
            return (
              <Uniquenology key={index}>
                <Image src={content.icon} alt="Showcase technology icon" />
                <p>{content.title}</p>
              </Uniquenology>
            );
          })}
        </PositiveContainer>
        <NegativeContainer itemNumber={data.length}>
          {data.map((content, index) => {
            return (
              <Uniquenology key={index}>
                <Image src={content.icon} alt="Showcase technology icon" />
                <p>{content.title}</p>
              </Uniquenology>
            );
          })}
        </NegativeContainer>
      </ShowcaseWrapper>
    </ShowcaseContainer>
  );
};

export default ShowcaseSection;
