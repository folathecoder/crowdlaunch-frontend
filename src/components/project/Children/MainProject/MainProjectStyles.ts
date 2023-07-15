import styled, { css } from 'styled-components';
import { QUERIES } from '@/styles/mediaQueries';

interface UniqueLinkType {
  isActive?: boolean;
}

export const MajorSection = styled.section`
  margin-bottom: 1.84rem;
`;

export const TabsWrapper = styled.div`
  width: 100%;
  background: var(--color-bg-300);
`;
export const TabsContainer = styled.div`
  display: flex;
  max-width: 79rem;
  margin-inline: auto;
  height: 4.60375rem;
  justify-content: space-between;
  overflow-x: auto;
  gap: 2.15rem;

  ul {
    display: flex;
    gap: 2.15rem;
  }

  a {
    display: grid;
    place-items: center;
    white-space: nowrap;
    padding-right: 1rem;
  }
`;

export const ActiveTab = styled.li<UniqueLinkType>`
  display: flex;
  align-items: center;
  position: relative;
  padding-inline: 0.5rem;
  cursor: pointer;
  transition: all ease-out 0.2s;

  p {
    font-size: 0.875rem;
  }

  span {
    position: absolute;
    top: 35%;
    right: 0;
    font-size: 0.625rem;
    color: #ff4264;
  }

  ${({ isActive }) =>
    isActive &&
    css`
      border-bottom: 3px solid #ff4264;
    `}
`;

export const TabContentsWrapper = styled.div`
  width: min(89.61%, 79rem);
  margin-inline: auto;
`;
