import styled from 'styled-components';
import { QUERIES } from '@/styles/mediaQueries';
import Link from 'next/link';

interface UniqueTokenStylesTypes {
  bgColor: string;
}

export const ProjectContainer = styled.div`
  width: 100%;
  overflow-x: auto;
`;

export const ProjectWrapperScroll = styled.div`
  width: 100%;
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: 100%;
  gap: 1rem;
  overflow-x: auto;

  @media only screen and (min-width: 500px) {
    grid-auto-columns: 48%;
  }

  @media ${QUERIES.tablet} {
    grid-auto-columns: 32%;
  }

  @media screen and (min-width: 1380px) {
    grid-auto-columns: 23.5%;
  }
`;

export const UniqueProject = styled.div<UniqueTokenStylesTypes>`
  padding: 0.5rem 0.5rem 1.25rem 0.5rem;
  border-radius: 0.5rem;
  background: ${(props) => props.bgColor};

  &:hover {
    img {
      opacity: 0.8;
    }
  }
`;

export const ProjectLink = styled(Link)`
  display: grid;
  gap: 1.5rem;

  &:hover {
    color: var(--color-font-100);
  }
`;

export const ImageWrapper = styled.div`
  border-radius: 0.5rem;
  position: relative;
  width: 100%;
  height: 300px;

  img {
    border-radius: 0.5rem;
    object-fit: cover;
  }
`;
export const ContentWrapper = styled.div`
  display: grid;
  gap: 1rem;

  & > *:first-child {
    h3 {
      font-size: 1.125rem;
    }

    p {
      font-size: 0.8125rem;
      opacity: 0.9;
    }
  }

  & > *:last-child {
    display: flex;
    gap: 1rem;

    & > * {
      flex: 1;
    }

    & > *:first-child {
      border-right: 1px solid rgba(255, 255, 255, 0.08);
    }

    h3 {
      font-size: 0.9375rem;
    }

    p {
      font-size: 0.8125rem;
      opacity: 0.9;
    }
  }

  .amount_raised {
    text-align: right;
  }
`;
