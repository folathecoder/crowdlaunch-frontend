import styled from 'styled-components';

export const ExploreContainer = styled.section`
  width: 100%;
`;

export const ExploreWrapper = styled.section`
  max-width: 1556px;
  margin: 0 auto;
  padding: 36px 0px;
`;

export const ExploreHeader = styled.section`
  padding: 0px 20px;
  h1 {
    border-left: unset;
    color: #fff;
    font-size: 22px;
    font-weight: 700;
    line-height: 28px;
    margin-bottom: 20px;
  }
`;

export const ExploreMenu = styled.section`
  width: 100%;
  margin: 20px 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 15px;
`;

export const ExploreOptions = styled.div`
  min-width: 100%;
  display: flex;
  gap: 5px;
  margin-bottom: 15px;
  align-items: center;
  justify-content: space-between;

  & > * {
    display: flex;
    gap: 5px;
  }

  .filter_button {
    border: none;
    display: grid;
    place-items: center;
    height: 28px;
    width: 28px;
    border-radius: 8px;
    background-color: var(--color-bg-300);
    color: var(--color-font-100);

    &:hover {
      background-color: var(--color-bg-400);
      color: var(--color-font-500);
    }
  }
`;

export const ExploreSearchWrap = styled.div`
  height: 40px;
  width: 100%;
  margin-bottom: 15px;
`;

export const ExploreMain = styled.section`
  display: flex;
  flex-direction: row;
  gap: 15px;

  @media screen and (max-width: 798px) {
    flex-direction: column;
  }
`;

export const ExploreWrap = styled.section`
  flex: 10;
  padding: 0px 20px;
`;

export const ExploreFilterContainer = styled.section`
  padding: 0px 20px;

  & > * {
    position: sticky;
    top: 90px;
  }
`;

export const ExploreCardsContainer = styled.section`
  width: 100%;
  min-height: 100vh;
  gap: 15px;
  display: grid;
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
`;

export const ExploreHolders = styled.section`
  display: inline-flex;
  gap: 10px;
  flex-wrap: nowrap;
  width: 100%;
  overflow-x: scroll !important;
  white-space: nowrap;
  margin-bottom: 70px;
  -ms-overflow-style: none;
  scrollbar-width: none;
  scroll-snap-type: x proximity;
  -webkit-overflow-scrolling: touch;
  overflow: -moz-scrollbars-horizontal;

  &::-webkit-scrollbar {
    display: none;
  }

  & > * {
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
  }
`;

export const Holder = styled.div`
  height: 150px;
  min-width: 150px;
  background-color: black;
  border-radius: 100%;
  border: 2px solid var(--color-accent-100);
  position: relative;
  margin-bottom: 10px;

  img {
    border-radius: 100%;
  }
`;
