import styled from 'styled-components';
import { QUERIES } from '@/styles/mediaQueries';

export const CtaContainer = styled.section`
  background-color: var(--color-bg-200);
  padding-block: 3rem;
  margin-top: 4rem;
`;

export const CtaInner = styled.div`
  margin: 0 Auto;
  width: min(89.61%, var(--max-container));
  min-height: 18.75rem;
  display: flex;
  align-items: center;
  justify-content: center;

  div {
    max-width: 36.23rem;
    text-align: center;

    h2 {
      font-size: 2rem;
      line-height: 2.5rem;
      text-transform: lowercase;
      margin-bottom: 1.875rem;

      &::first-letter {
        text-transform: uppercase;
      }

      @media ${QUERIES.tabletMini} {
        font-size: 2.5rem;
        line-height: 3rem;
      }

      @media ${QUERIES.desktop} {
        font-size: 2.8rem;
        line-height: 3.2rem;
      }
    }
  }
`;
