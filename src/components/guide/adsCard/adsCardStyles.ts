import styled, { css } from 'styled-components';

interface AdCardStylesTypes {
  hoverCard?: boolean;
}

export const CardContainer = styled.div`
  background-color: var(--color-bg-300);
  width: 18.75rem;
  min-height: 18.75rem;
  position: sticky;
  top: 6.25rem;
  border-radius: 0.5rem;
  padding: 0.5rem;
  cursor: pointer;
  margin-left: 1.25rem;
`;

export const CardImage = styled.div`
  width: 100%;
  height: 15.625rem;
  border-radius: 0.5rem;
`;

export const CardImageInner = styled.div<AdCardStylesTypes>`
  width: 100%;
  height: 15.625rem;
  border-radius: 0.5rem;
  position: relative;
  transition: var(--transition);

  img {
    object-fit: fill;
    border-radius: 0.5rem;
  }

  ${({ hoverCard }) =>
    hoverCard &&
    css`
      transform: rotateZ(5deg);
      transition: var(--transition);
    `}
`;

export const CardContent = styled.div`
  padding: 16px 0px;

  h3 {
    font-size: 1rem;
    margin-bottom: 0.5rem;
  }

  p {
    font-size: 0.875rem;
  }
`;
