import styled from 'styled-components';
import { QUERIES } from '@/styles/mediaQueries';

export const HeaderSection = styled.section`
  margin-block: 2.62rem 1.84rem;
`;

export const HeaderWrapper = styled.div`
  width: min(89.61%, 79rem);
  margin-inline: auto;
`;

export const HeaderMinContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  text-align: center;
  margin-bottom: 1rem;

  h1 {
    font-size: 2.5rem;
    line-height: 1;
  }

  h2 {
    color: rgba(255, 255, 255, 0.8);
    font-size: 1.0625rem;
  }

  @media ${QUERIES.tabletMini} {
    flex-direction: row;
    justify-content: space-between;
    text-align: left;
    align-items: flex-start;
  }
`;

export const IconWrapper = styled.div`
  display: flex;
  gap: 1rem;

  button {
    background-color: transparent;
    border: none;
    color: var(--font-color-100);
    cursor: pointer;
    font-size: 1.5rem;

    &:hover {
      color: var(--color-accent-100);
    }
  }

  .favorite_btn {
    position: relative;

    div {
      position: absolute;
      top: -0.3rem;
      right: -0.4rem;
      background-color: var(--color-bg-400);
      font-size: 0.6rem;
      height: 1rem;
      width: 1rem;
      display: grid;
      place-items: center;
      border-radius: 100%;
      color: var(--color-font-500);
      border: 0.05rem solid var(--color-accent-100);
    }
  }

  .favorite_btn_liked {
    color: var(--color-accent-100);
  }

  .favorite_btn_unliked {
    color: var(--color-bg-400);
  }

  .share_btn {
    position: relative;
  }
`;

export const HeaderMainContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;

  @media ${QUERIES.tablet} {
    display: grid;
    grid-template-columns: 1fr 34%;
  }
`;
export const FundWrapper = styled.div`
  & > p {
    color: rgba(255, 255, 255, 0.5);
    font-size: 0.875rem;
    text-align: center;
    margin-top: 1rem;

    @media ${QUERIES.tablet} {
      text-align: left;
    }
  }
`;

export const ImageWrapper = styled.div`
  position: relative;
  border-radius: 0.5rem;

  img {
    object-fit: fit;
    border-radius: 0.5rem;
  }
`;
