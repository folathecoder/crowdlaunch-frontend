import styled from 'styled-components';
import { QUERIES } from '@/styles/mediaQueries';

export const BenefitContainer = styled.section`
  margin-block: 7.2rem;
  font-family: var(--font-pry-300);
`;
export const BenefitWrapper = styled.div`
  margin: var(--center-container);
  width: min(89.61%, 81.25rem);
`;

export const BenefitHeader = styled.div`
  max-width: 45rem;
  text-align: center;
  margin-bottom: 3rem;
  margin-inline: auto;

  h3 {
    font-family: var(--font-pry-100);
    background-color: var(--gradient-bg-200);
    background-image: var(--gradient-200);
    -webkit-text-fill-color: transparent;
    -webkit-background-clip: text;

    font-size: 1.17rem;
    text-align: center;
    margin-inline: auto;
    width: -webkit-fit-content;
    width: -moz-fit-content;
    width: fit-content;
    margin-bottom: 1rem;
  }

  h2 {
    font-size: clamp(2rem, calc(4vw - 0.2rem), 3.375rem);
    line-height: 2.5rem;
    margin-bottom: 1.5rem;
  }

  p {
    line-height: 1.5rem;
    opacity: 0.8;
  }
`;

export const MainBenefitContainer = styled.div`
  display: grid;
  gap: 1.5rem;

  @media ${QUERIES.tabletMini} {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const UniqueBenefit = styled.div`
  background: var(--color-bg-300);
  height: 20.3rem;
  padding-block: 2.38rem 3.75rem;
  border-radius: 0.5rem;

  display: grid;
  place-items: center;
  gap: 1.31rem;

  h3 {
    max-width: 13ch;

    text-align: center;

    @media ${QUERIES.desktop} {
      font-size: 1.4375rem;
    }
  }
`;

export const ExchangeContainer = styled.div`
  background: var(--color-bg-300);
  padding: 1rem;
  margin-block: 2rem;
  border-radius: 0.5rem;

  @media ${QUERIES.tabletMini} {
    padding: 3.38rem 3.25rem;
  }
`;

export const ExchangeHeader = styled.div`
  display: grid;
  gap: 1rem;
  margin-bottom: 3.5rem;

  @media ${QUERIES.tablet} {
    grid-template-columns: repeat(2, 1fr);
  }

  h2 {
    font-size: clamp(2rem, calc(3.5vw - 0.1rem), 3.125rem);
    line-height: 3rem;

    @media ${QUERIES.desktop} {
      line-height: 4rem;
    }
  }

  p {
    @media ${QUERIES.desktop} {
      line-height: 1.75rem;
      font-size: 1.2rem;
      max-width: 49.3ch;
    }
  }
`;

export const ExchangeContent = styled.div`
  display: grid;
  gap: 1rem;
  margin-bottom: 3.5rem;

  & > * {
    display: flex;
    gap: 1rem;
    align-items: center;
    height: 5rem;
    padding: 0rem 1.5rem;
    border-radius: 2.25rem;
    background: rgba(242, 245, 250, 0.05);

    @media ${QUERIES.mobile} {
      padding-left: 1.2rem;
      gap: 1rem;
    }
  }

  @media ${QUERIES.tablet} {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const BenefitCardsWrapper = styled.div`
  display: grid;
  gap: 1.5rem;

  @media ${QUERIES.tablet} {
    grid-template-columns: repeat(3, 1fr);
  }

  & > * {
    padding: 0.8rem;
    border-radius: 0.5rem;
    background: var(--color-bg-300);

    h3 {
      font-size: 2rem;
      line-height: 2.5rem;
    }

    @media ${QUERIES.tablet} {
      padding: 1.88rem;
    }
  }
`;

export const MarketContainer = styled.div`
  display: flex;
  flex-direction: column;

  h3 {
    margin-bottom: 6.62rem;
  }

  p {
    margin-top: auto;

    @media ${QUERIES.desktop} {
      font-size: 1.25rem;
      max-width: 30ch;
    }
  }

  i {
    background-color: var(--color-accent-100);
    background-image: var(--color-accent-100);
    -webkit-text-fill-color: transparent;
    -webkit-background-clip: text;
  }
`;
export const ExperienceContainer = styled.div`
  display: grid;
  gap: 4.75rem;
  background: var(--color-accent-100);

  h3 {
    color: var(--color-font-100);
  }
  div {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;

    & > span {
      padding: 0.625rem 1.01438rem 0.625rem 1rem;
      align-items: flex-start;
      border-radius: 1.375rem;
      background: var(--color-font-100);

      p {
        font-size: 0.8rem;
        font-weight: 700;
        color: var(--color-accent-100);
      }
    }
  }
`;
export const RevenueContainer = styled.div`
  display: flex;
  flex-direction: column;

  p {
    margin-top: auto;

    @media ${QUERIES.desktop} {
      font-size: 1.25rem;
      line-height: 1.75rem;
      max-width: 30ch;
    }
  }
`;
