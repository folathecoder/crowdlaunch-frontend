import styled from 'styled-components';
import { QUERIES } from '@/styles/mediaQueries';

export const CtaContainer = styled.section`
  background-color: var(--color-bg-200);
  padding-block: 48px;
  margin-top: 64px;
`;

export const CtaInner = styled.div`
  margin: 0 auto;
  width: min(89.61%, 1089.6px);
  min-height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;

  div {
    max-width: 579.68px;
    text-align: center;

    h2 {
      font-size: 32px;
      line-height: 40px;
      text-transform: lowercase;
      margin-bottom: 30px;

      &::first-letter {
        text-transform: uppercase;
      }

      @media ${QUERIES.tabletMini} {
        font-size: 40px;
        line-height: 48px;
      }

      @media ${QUERIES.desktop} {
        font-size: 44.8px;
        line-height: 51.2px;
      }
    }
  }
`;
