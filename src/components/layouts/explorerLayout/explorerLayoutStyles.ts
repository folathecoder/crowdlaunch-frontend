import styled, { css } from 'styled-components';
import { QUERIES } from '@/styles/mediaQueries';

export const ExploreContainer = styled.section`
  width: 100%;
`;

export const ExploreWrapper = styled.section`
  max-width: 1556px;
  margin: 0 auto;
  padding: 36px 20px;
`;

export const ExploreHeader = styled.section`
  h1 {
    color: #fff;
    font-size: 22px;
    font-weight: 700;
    line-height: 28px;
  }
`;

export const ExploreMenu = styled.section`
  height: 40px;
  width: 100%;
  margin: 20px 0px;
  background-color: blue;
`;

export const ExploreMain = styled.section`
  display: flex;
  gap: 15px;
`;

export const ExploreFilterContainer = styled.section`
  & > * {
    width: 376px;
    height: 380px;
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    background: #212123;
    position: sticky;
    top: 90px;
  }
`;

export const ExploreCardsContainer = styled.section`
  width: 100%;
  min-height: 100vh;
  gap: 15px;
  display: grid;

  @media ${QUERIES.desktop} {
    grid-template-columns: repeat(4, 1fr);
  }
`;
