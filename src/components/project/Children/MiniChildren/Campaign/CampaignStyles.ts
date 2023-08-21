import styled, { css } from 'styled-components';
import { QUERIES } from '@/styles/mediaQueries';

interface UniqueLinkType {
  isActive?: boolean;
}

export const CampaignContainer = styled.div`
  margin-top: 1rem;

  @media ${QUERIES.desktop} {
    margin-top: 2.77rem;
    gap: 1rem;

    display: flex;
  }
`;
export const MiniTabContainer = styled.div`
  max-width: 100%;
  overflow-x: auto;
  margin-bottom: 1.5rem;
  position: relative;
  border-bottom: 1px solid var(--color-border-100);

  @media ${QUERIES.desktop} {
    border-bottom: 1px solid transparent;
    width: 7.69rem;
    height: 28rem;
  }

  & > div {
    overflow-x: auto;
    width: 100%;

    display: flex;

    @media ${QUERIES.desktop} {
      height: 100%;
      position: sticky;
      top: 2rem;
    }

    ul {
      display: flex;
      gap: 1.25rem;

      @media ${QUERIES.desktop} {
        flex-direction: column;
      }
    }
  }
`;
export const ActiveMiniTab = styled.li<UniqueLinkType>`
  height: 2.3125rem;
  width: 7.69rem;
  cursor: pointer;
  transition: all ease-out 0.2s;
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.75rem;
  display: flex;
  justify-content: center;

  ${({ isActive }) =>
    isActive &&
    css`
      color: #ff4264;
    `}

  @media ${QUERIES.desktop} {
    justify-content: flex-start;
    border-bottom: 1px solid var(--color-border-100);
  }
`;

export const ActiveContentWrapper = styled.div`
  max-width: 100%;

  @media ${QUERIES.desktop} {
    flex: 1;
  }
`;

export const VotingWrapper = styled.div`
  max-width: 100%;

  & > div {
    width: 100%;
    display: grid;
    gap: 1rem;
  }

  @media ${QUERIES.desktop} {
    flex-basis: 34%;
  }
`;
