import styled, { css } from 'styled-components';

interface AdCardStylesTypes {
  hoverCard?: boolean;
}

export const CardContainer = styled.div`
  background-color: var(--color-bg-300);
  width: 300px;
  min-height: 300px;
  position: sticky;
  top: 100px;
  border-radius: 8px;
  padding: 8px;
  cursor: pointer;
  margin-left: 20px;
`;

export const CardImage = styled.div`
  width: 100%;
  height: 250px;
  border-radius: 8px;
`;

export const CardImageInner = styled.div<AdCardStylesTypes>`
  width: 100%;
  height: 250px;
  border-radius: 8px;
  position: relative;
  transition: var(--transition);

  img {
    object-fit: fill;
    border-radius: 8px;
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
    font-size: 16px;
    margin-bottom: 8px;
    color: var(--color-font-100);
  }

  p {
    font-size: 14px;
  }
`;
