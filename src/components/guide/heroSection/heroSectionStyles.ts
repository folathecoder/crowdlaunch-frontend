import styled from 'styled-components';
import { QUERIES } from '@/styles/mediaQueries';

export const HeroContainer = styled.section`
  margin-top: 4.5rem;
`;

export const HeroInner = styled.div`
  margin: var(--center-container);
  width: min(89.61%, 67.6rem);
  display: grid;
  gap: 1.5rem;

  @media ${QUERIES.tablet} {
    grid-template-columns: 1fr 1fr;
  }
`;

export const HeroContent = styled.div`
  min-height: 20rem;
  text-align: center;

  display: grid;
  justify-items: center;

  @media ${QUERIES.tablet} {
    align-self: center;
    text-align: left;
    justify-items: start;
  }

  h3 {
    background-color: var(--gradient-bg-200);
    background-image: var(--gradient-200);
    -webkit-text-fill-color: transparent;
    -webkit-background-clip: text;

    font-size: 1rem;
    margin-bottom: 1rem;
    width: 20ch;
  }

  h1 {
    margin-bottom: 1.2rem;
    max-width: 15ch;

    @media ${QUERIES.tabletMini} {
      margin-bottom: 1.5rem;
    }
  }
`;

export const HeroFeatured = styled.div`
  background-color: var(--color-bg-300);
  padding: 1.2rem;
  border-radius: 8px;

  h2 {
    padding-bottom: 16px;
  }

  p {
    color: var(--color-font-300);
  }

  &:hover {
    h2 {
      color: var(--color-accent-100);
    }
  }
`;

export const CardContentDate = styled.div`
  display: flex;
  align-items: center;

  p {
    font-size: 12px;
    color: var(--color-font-300);
    letter-spacing: 0.2px;
    display: flex;
    align-items: center;
  }

  span {
    transform: translateY(2px);
    margin-right: 2px;
    margin-left: 16px;
  }
`;

export const CardImageWrap = styled.div`
  width: 100%;
  height: 300px;
  border-radius: 0.5rem;
  position: relative;
  margin: 1rem 0rem 1.5rem 0rem;
  cursor: pointer;

  img {
    object-fit: cover;
    border-radius: 0.5rem;
  }
`;

export const CardContentCategory = styled.div`
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  margin: 16px;
  cursor: pointer;
`;

export const FeaturedDetail = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
  cursor: pointer;
`;

export const CardContentAuthor = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;

  h3 {
    font-size: 14px;
    font-weight: 400;
    color: var(--color-accent-200);
  }

  h4 {
    color: var(--color-font-300);
    font-weight: 400;
    font-size: 12px;
  }
`;

export const CardAuthor = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 100%;
  margin-right: 0.5rem;
  position: relative;
  cursor: pointer;

  img {
    object-fit: cover;
    border-radius: 100%;
  }
`;
