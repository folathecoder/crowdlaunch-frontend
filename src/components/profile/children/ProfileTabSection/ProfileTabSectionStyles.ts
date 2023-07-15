import styled, { css } from 'styled-components';

interface ProfileTabTypes {
  activeTab: boolean;
}

export const TabContainer = styled.section`
  width: 100%;
  position: relative;
`;

export const TabInner = styled.section`
  max-width: var(--max-container);
  margin: var(--center-container);
  padding: 0 20px;
`;

export const TabHeader = styled.div`
  width: 100%;
  margin-bottom: 20px;
  border-bottom: 1px solid var(--color-scroll-bar);
  overflow-x: auto;
  display: inline-flex;
  -ms-overflow-style: none;
  scrollbar-width: none;
  scroll-snap-type: x proximity;
  -webkit-overflow-scrolling: touch;
  overflow: -moz-scrollbars-horizontal;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const TabButton = styled.button<ProfileTabTypes>`
  border: none;
  height: 50px;
  padding: 0 20px;
  font-size: 800;
  color: var(--color-font-100);
  background-color: transparent;
  white-space: nowrap;

  ${({ activeTab }) =>
    activeTab &&
    css`
      color: var(--color-accent-100);
      border-bottom: 2px solid var(--color-accent-100);
    `}
`;

export const PortfolioSection = styled.div`
  max-width: var(--max-container);
  margin: var(--center-container);
  padding: 20px 0px 50px 0px;

  .portfolio-header {
    margin-bottom: 20px;
  }

  .portfolio-cards {
    display: grid;
    gap: 15px;
    grid-template-columns: repeat(4, 1fr);

    @media screen and (max-width: 1231px) {
      grid-template-columns: repeat(3, 1fr);
    }

    @media screen and (max-width: 1006px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media screen and (max-width: 513px) {
      grid-template-columns: 1fr;
    }
  }
`;

export const NFTCollectionSection = styled.div`
  max-width: var(--max-container);
  margin: var(--center-container);
  padding: 20px 0px 50px 0px;

  .nft-header {
    margin-bottom: 20px;
  }

  .nft-cards {
    display: grid;
    gap: 15px;
    grid-template-columns: repeat(4, 1fr);

    @media screen and (max-width: 1231px) {
      grid-template-columns: repeat(3, 1fr);
    }

    @media screen and (max-width: 1006px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media screen and (max-width: 513px) {
      grid-template-columns: 1fr;
    }
  }
`;

export const WatchlistSection = styled.div`
  max-width: var(--max-container);
  margin: var(--center-container);
  padding: 20px 0px 50px 0px;

  .portfolio-header {
    margin-bottom: 20px;
  }

  .portfolio-cards {
    display: grid;
    gap: 15px;
    grid-template-columns: repeat(4, 1fr);

    @media screen and (max-width: 1231px) {
      grid-template-columns: repeat(3, 1fr);
    }

    @media screen and (max-width: 1006px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media screen and (max-width: 513px) {
      grid-template-columns: 1fr;
    }
  }

  .nft-header {
    margin: 40px 0px 20px 0px;
  }

  .nft-cards {
    display: grid;
    gap: 15px;
    grid-template-columns: repeat(4, 1fr);

    @media screen and (max-width: 1231px) {
      grid-template-columns: repeat(3, 1fr);
    }

    @media screen and (max-width: 1006px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media screen and (max-width: 513px) {
      grid-template-columns: 1fr;
    }
  }
`;
