import styled from 'styled-components';
import { QUERIES } from '@/styles/mediaQueries';

export const ArticleContainer = styled.main`
  min-height: 100vh;
  position: relative;
`;

export const ArticleImageContainer = styled.section`
  background-color: transparent;
  max-width: 100%;
  min-height: 31.25rem;
  position: relative;

  img {
    object-fit: cover;
  }
`;

export const ArticleMainWrap = styled.section`
  max-width: 100%;
  padding-top: 1.12rem;
`;

export const ArticleInnerWrap = styled.div`
  margin: var(--center-container);
  width: min(89.61%, var(--max-container));
  display: flex;
`;

export const ArticleShareContainer = styled.div`
  width: 5rem;
  margin: 0 auto;
  position: relative;

  @media screen and (max-width: 1000px) {
    display: none;
  }
`;

export const ArticleShareMobile = styled.div`
  display: none;
  margin-bottom: 3.125rem;

  @media screen and (max-width: 1000px) {
    display: block;
    max-width: 40.625rem;
  }
`;

export const Article = styled.article`
  flex: 1;

  @media screen and (max-width: 1000px) {
    max-width: 30.625rem;
    margin: 0 auto;
  }
`;

export const ArticleInner = styled.div``;

export const ArticleHeader = styled.div`
  padding: 0 1rem 2rem 1rem;

  h1 {
    color: var(--color-font-100);
    font-size: 2rem;
    line-height: 2.5rem;
    font-weight: 700;
    font-family: var(--font-pry-200);

    @media ${QUERIES.tabletMini} {
      font-size: 3rem;
      line-height: 4rem;
    }

    @media ${QUERIES.desktop} {
      font-size: 2.5rem;
      line-height: 3.5rem;
    }
  }
`;

export const ArticleImage = styled.div`
  position: relative;
  height: 30.625rem;

  @media screen and (max-width: 1000px) {
    height: 25rem;
  }

  @media screen and (max-width: 600px) {
    height: 21.875rem;
  }

  img {
    object-fit: cover;
  }
`;

export const ArticleContent = styled.div`
  padding: 2rem 0rem;

  p,
  li {
    font-size: 1.2rem;
    line-height: 1.7rem;
    margin-bottom: 1.5rem;
  }

  li {
    list-style: lower-alpha;
    margin-left: 1rem;
  }

  h2,
  h3 {
    margin-bottom: 1.2rem;
    color: var(--color-font-100);
  }

  img {
    margin-bottom: 2rem;
  }
`;

export const ArticleRelatedCards = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const CategoryTags = styled.div`
  padding: 10px 0px;

  & > * {
    margin-bottom: 0.5rem;
  }
`;

export const ArticleSidebar = styled.aside`
  width: 21.875rem;
  position: relative;

  @media screen and (max-width: 1000px) {
    display: none;
  }
`;
