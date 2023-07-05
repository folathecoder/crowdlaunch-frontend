import Image from 'next/image';
import { BenefitContentTypes } from '@/types/homeTypes';

import {
  BenefitContainer,
  BenefitWrapper,
  BenefitHeader,
  MainBenefitContainer,
  UniqueBenefit,
  ExchangeContainer,
  ExchangeHeader,
  ExchangeContent,
  BenefitCardsWrapper,
  MarketContainer,
  ExperienceContainer,
  RevenueContainer,
} from '@/components/home/benefitSection/benefitSectionStyles';

const BenefitSection = ({
  subHeading,
  mainHeading,
  description,
  mainBenefit,
  primaryContent,
  secondaryContent: { marketContent, experienceContent, revenueContent },
}: BenefitContentTypes) => {
  return (
    <BenefitContainer>
      <BenefitWrapper>
        <BenefitHeader>
          <h3>{subHeading}</h3>
          <h2>{mainHeading}</h2>
          <p>{description}</p>
        </BenefitHeader>

        <MainBenefitContainer>
          {mainBenefit.map((benefit) => {
            return (
              <UniqueBenefit key={benefit.id}>
                <div>
                  <Image src={benefit.icon} alt="benefit icon" />
                </div>
                <h3>{benefit.title}</h3>
              </UniqueBenefit>
            );
          })}
        </MainBenefitContainer>

        <ExchangeContainer>
          <ExchangeHeader>
            <h2>{primaryContent.heading}</h2>
            <p>{primaryContent.mainDescription}</p>
          </ExchangeHeader>

          <ExchangeContent>
            {primaryContent.miniService.map((content) => {
              return (
                <div key={content.id}>
                  <div>
                    <Image src={content.icon} alt="mini service icon" />
                  </div>
                  <p>{content.title}</p>
                </div>
              );
            })}
          </ExchangeContent>

          <p>{primaryContent.miniDescription}</p>
        </ExchangeContainer>

        <BenefitCardsWrapper>
          <MarketContainer>
            <h3>{marketContent.heading}</h3>
            <span>
              <i className={marketContent.icon}></i>
            </span>
            <p>{marketContent.title}</p>
          </MarketContainer>

          <ExperienceContainer>
            <h3>{experienceContent.heading}</h3>
            <div>
              {experienceContent.miniContent.map((minicontent, index) => {
                return (
                  <span key={index}>
                    <p>{minicontent}</p>
                  </span>
                );
              })}
            </div>
          </ExperienceContainer>

          <RevenueContainer>
            <h3>{revenueContent.heading}</h3>
            <p>{revenueContent.title}</p>
          </RevenueContainer>
        </BenefitCardsWrapper>
      </BenefitWrapper>
    </BenefitContainer>
  );
};

export default BenefitSection;
