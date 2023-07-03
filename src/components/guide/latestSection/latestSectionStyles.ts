import styled from 'styled-components';
import { QUERIES } from '@/styles/mediaQueries';

export const SectionWrap = styled.section`
  margin-block: 3rem;
`;
export const ContainerWrap = styled.div`
  margin: var(--center-container);
  width: min(89.61%, 67.6rem);
`;

export const SectionContainer = styled.div`
  min-height: 31.25rem;

  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr;
  grid-template-rows: 380px;
  grid-template-areas:
    'A'
    'B'
    'C'
    'D'
    'E'
    'F'
    'G'
    'H';

  @media screen and (min-width: 620px) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-areas:
      'A A'
      'B C'
      'D E'
      'F G'
      'H .';
  }

  @media ${QUERIES.tablet} {
    grid-template-columns: repeat(3, 1fr);
    grid-template-areas:
      'A A B'
      'C D E'
      'F G H';
  }
`;

export const CardOne = styled.div`
  grid-area: A;
`;

export const CardTwo = styled.div`
  grid-area: B;
`;

export const CardThree = styled.div`
  grid-area: C;
`;

export const CardFour = styled.div`
  grid-area: D;
`;

export const CardFive = styled.div`
  grid-area: E;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media screen and (max-width: 620px) {
    & > * {
      margin-bottom: 1rem;
    }
  }

  @media screen and (max-width: 400px) {
    display: none;
  }
`;
export const CardSix = styled.div`
  grid-area: F;
`;
export const CardSeven = styled.div`
  grid-area: G;
`;
export const CardEight = styled.div`
  grid-area: H;
`;

export const SectionHeader = styled.div`
  padding: 1rem 0rem;

  h2 {
    font-size: 1.5rem;
    font-weight: 600;
  }
`;
