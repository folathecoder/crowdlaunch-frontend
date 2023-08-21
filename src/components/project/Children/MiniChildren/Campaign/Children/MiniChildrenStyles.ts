import styled from 'styled-components';
import { QUERIES } from '@/styles/mediaQueries';

///OVERVIEW STYLE
export const OverviewContainer = styled.div`
  width: 100%;

  p {
    font-size: 0.9375rem;
  }

  span {
    color: #ff4264;
    text-decoration: underline;
  }
`;
export const MainBookContainer = styled.div`
  margin-bottom: 2.3rem;

  h4 {
    font-size: 1.1875rem;
    margin-bottom: 2.56rem;
  }

  div {
    display: grid;
    gap: 2.5rem;
  }
`;
export const IsleBookContainer = styled.div`
  display: grid;
  gap: 2.25rem;

  h3 {
    margin-bottom: 0.2rem;
  }
`;

export const SecondBookContainer = styled.div`
  display: grid;
  gap: 2.19rem;
  margin-block: 2.75rem 11rem;

  & > h3 {
    margin-bottom: 0.2rem;
  }
`;

export const MiniBookContainer = styled.div`
  padding-inline: 1.25rem;

  display: grid;
  gap: 0.5rem;
`;

export const EBookWrapper = styled.div`
  display: grid;
  gap: 2.19rem;
  margin-bottom: 2.56rem;

  h3 {
    font-size: 0.9375rem;
  }
`;

export const Content = styled.div`
  h2 {
    font-size: 1.5rem;
    line-height: 2.5rem;
    text-decoration: underline;
    text-decoration: underline;
    text-decoration-color: var(--color-accent-100);
    text-decoration-skip-ink: none;
    text-underline-offset: 10px;
  }

  p,
  span {
    margin: 1rem 0rem;
    text-decoration: none !important;
    color: var(--color-font-100) !important;
  }

  li {
    list-style: lower-alpha;
    color: var(--color-font-200);
    font-size: 1rem;
    line-height: 1.5rem;
    font-weight: 400;
    margin: 1rem 0rem 1rem 1rem;
  }
`;
