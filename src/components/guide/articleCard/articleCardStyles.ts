import styled, { css } from 'styled-components';

interface ArticleCardStylesTypes {
  cornerStone?: boolean;
}

export const CardContainer = styled.div<ArticleCardStylesTypes>`
  background-color: var(--color-bg-300);
  max-width: 100%;
  min-height: 22.5rem;
  border-radius: 0.5rem;
  transition: var(--transition);
  cursor: pointer;

  &:hover {
    transition: var(--transition);
    box-shadow: var(--box-shadow-300);

    h3 {
      color: var(--color-accent-100);
    }
  }

  @media screen and (min-width: 620px) {
    ${({ cornerStone }) =>
      cornerStone &&
      css`
        display: none;
      `}
  }
`;

export const CardImageWrap = styled.div`
  width: 100%;
  height: 14.37rem;
  border-radius: 0.5rem 0.5rem 0px 0px;
  position: relative;

  img {
    object-fit: cover;
    border-radius: 0.5rem 0.5rem 0px 0px;
  }
`;

export const CardContent = styled.div`
  height: 8.13rem;
  border-radius: 0px 0px 0.5rem 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1.2rem;
`;

export const CardContentCategory = styled.div`
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  margin: 1rem;
`;
export const CardContentTitle = styled.div`
  h3 {
    font-size: 1.2rem;
    font-weight: 700;
    max-width: 25ch;
    color: var(--color-font-100);
  }
`;
export const CardContentAuthor = styled.div`
  display: flex;
  align-items: center;

  h3 {
    font-size: 14px;
    font-weight: 400;
    color: var(--color-accent-100);
  }
`;
export const CardAuthor = styled.div`
  width: 2rem;
  height: 2rem;
  border-radius: 100%;
  margin-right: 0.5rem;
  position: relative;

  img {
    object-fit: cover;
  }
`;
export const CardContentDate = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  p {
    letter-spacing: 0.2px;
    display: flex;
    align-items: center;
    color: var(--color-font-300);
    font-weight: 400;
    font-size: 12px;
  }

  span {
    transform: translateY(2px);
    margin-right: 2px;
  }
`;
