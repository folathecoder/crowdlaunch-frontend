import styled, { css } from 'styled-components';
import { QUERIES } from '@/styles/mediaQueries';

export const ProjectSection = styled.section`
  max-width: 79rem;
  margin: 0 auto;
  padding: 1.5rem 0rem;
`;

export const FormHeaderNav = styled.div`
  max-width: 100%;
  min-height: 30px;
  display: flex;
  gap: 0.5rem;
  overflow-x: scroll;
  border-bottom: 2px solid var(--color-border-100);

  button {
    background-color: transparent;
    border: none;
    padding: 0 1rem;
    border-bottom: 2px solid transparent;
    color: var(--color-font-100);
    white-space: nowrap;
    padding-bottom: 1rem;
  }

  .active {
    color: var(--color-accent-100);
    border-bottom: 2px solid var(--color-accent-100);
  }
`;

export const FormBodyContainer = styled.section`
  max-width: 79rem;
  margin: 0 auto;
  padding: 1.5rem;
`;
