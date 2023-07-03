import styled from 'styled-components';

export const CardContainer = styled.div`
  background-color: var(--color-bg-300);
  max-width: 100%;
  height: 360px;
  border-radius: 8px;
  transition: var(--transition);
  display: flex;
  cursor: pointer;

  &:hover {
    transition: var(--transition);
    box-shadow: var(--box-shadow-200);

    h3 {
      color: var(--color-accent-100);
    }
  }

  @media screen and (max-width: 620px) {
    flex-direction: column;
    display: none;
  }
`;

export const CardImageWrap = styled.div`
  flex: 1;
  width: 100%;
  border-radius: 8px 0px 0px 8px;
  position: relative;

  img {
    object-fit: cover;
    border-radius: 8px 0px 0px 8px;
  }

  @media screen and (max-width: 620px) {
    border-radius: 8px 8px 0px 0px;

    img {
      border-radius: 8px 8px 0px 0px;
    }
  }
`;

export const CardContent = styled.div`
  flex: 1;
  border-radius: 0px 0px 8px 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 19.2px;
`;
export const CardContentCategory = styled.div``;
export const CardContentTitle = styled.div`
  h3 {
    font-size: 24px;
    line-height: 30.72px;
    font-weight: 700;
    color: var(--color-font-100);
  }

  p {
    margin-top: 16px;
    color: var(--color-font-300);
  }
`;
export const CardContentAuthor = styled.div`
  display: flex;
  align-items: center;

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
  margin-right: 8px;
  position: relative;

  img {
    object-fit: cover;
  }

  img {
    border-radius: 100%;
  }
`;
export const CardContentDate = styled.div`
  p {
    letter-spacing: 0.2px;
    color: var(--color-font-300);
    font-weight: 400;
    font-size: 12px;
  }
`;

export const CardDetails = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
