import styled, { css } from 'styled-components';
import { QUERIES } from '@/styles/mediaQueries';

export const ShareModalContainer = styled.ul`
  position: absolute;
  width: 10rem;
  background-color: var(--color-bg-500);
  border-radius: 0.5rem;
  z-index: 1000;
  right: 0;
`;

export const ShareItem = styled.li`
  padding: 0 0.8rem;
  border-bottom: 0.05rem solid var(--color-border-100);
  cursor: pointer;

  &:hover {
    background-color: var(--color-accent-100);
    border-radius: 0.5rem;
  }

  .share_item {
    height: 2.5rem;
    display: flex;
    align-items: center;
    gap: 1rem;

    & > * {
      height: 100%;
      display: flex;
      align-items: center;
    }
  }
`;

export const CopyItem = styled.li`
  padding: 0 0.8rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;

  & > * {
    height: 100%;
    display: flex;
    align-items: center;
  }

  &:hover {
    background-color: var(--color-accent-100);
    border-radius: 0.5rem;
  }
`;
