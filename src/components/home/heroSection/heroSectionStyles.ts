import styled from 'styled-components';
import { QUERIES } from '@/styles/mediaQueries';

export const NftMarketContainer = styled.section`
  font-family: var(--font-pry-300);
  margin-block: 3rem;
`;

export const NftMarketWrapper = styled.div`
  margin: var(--center-container);
  width: min(89.61%, 116.5625rem);
  padding: 1rem;
  border-radius: 0.5rem;
  background: #161618;

  @media ${QUERIES.desktop} {
    display: flex;
    padding: 2rem;
    gap: 2rem;
  }
`;

export const NftMarketHeader = styled.div`
  margin-bottom: 4rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media ${QUERIES.desktop} {
    text-align: left;
    align-items: flex-start;
    margin-bottom: 0rem;
  }

  h3 {
    background-color: var(--gradient-bg-200);
    background-image: var(--gradient-200);
    -webkit-text-fill-color: transparent;
    -webkit-background-clip: text;

    font-size: 0.8rem;
    margin-bottom: 1rem;
    width: 20ch;

    @media screen and (min-width: 916px) {
      font-size: 1rem;
    }
  }

  h1 {
    margin-bottom: 1.2rem;
    max-width: 15ch;

    @media screen and (min-width: 916px) {
      margin-bottom: 1.5rem;
      font-size: 3rem;
      line-height: 3.5rem;
    }

    span {
      opacity: 0.9;
    }
  }

  p {
    font-size: 1.2rem;
    line-height: 1.8rem;
    margin-bottom: 1.6rem;
    max-width: 35rem;

    @media screen and (min-width: 916px) {
      margin-bottom: 2rem;
      padding-right: 5rem;
    }
  }

  button {
    display: grid;
    padding-inline: 1.01875rem 1.4375rem;
    height: 3.5rem;
    place-items: center;
    border-radius: 0.5rem;
    font-family: inherit;
    transition: all 0.2s ease-in;
    cursor: pointer;
    transition: 0.5s linear;
    border: 1px solid var(--color-bg-400);
    background: var(--color-bg-400);
    color: var(--color-font-500);
    font-weight: 900;

    &:hover {
      opacity: 0.8;
      transition: 0.5s linear;
    }
  }
`;
