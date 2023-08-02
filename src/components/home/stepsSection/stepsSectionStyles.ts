import styled from 'styled-components';
import { QUERIES } from '@/styles/mediaQueries';

export const StepsContainer = styled.section`
  font-family: var(--font-pry-300);
  margin-block: 3rem;

  @media ${QUERIES.desktop} {
    margin-block: 7rem;
  }
`;

export const StepsWrapper = styled.div`
  margin: var(--center-container);
  width: min(89.61%, 79.25rem);

  display: grid;
  gap: 1.75rem;

  @media ${QUERIES.tabletMini} {
    grid-template-columns: repeat(auto-fit, minmax(18.5rem, 1fr));
  }
`;

export const UniqueStep = styled.div`
  border-radius: 0.5rem;
  background: rgba(33, 33, 35, 0.4);
  padding: 1.5rem;
  height: 19rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  img {
    width: 5rem;
    height: auto;
  }

  h3 {
    margin-block: 1.6rem 0.5rem;
    font-size: 1.6875rem;
  }

  p {
    opacity: 0.6;
    font-size: 1.06rem;

    @media ${QUERIES.tabletMini} {
      max-width: 31ch;
    }
  }
`;
