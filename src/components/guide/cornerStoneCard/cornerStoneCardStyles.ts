import styled from 'styled-components';

export const CardContainer = styled.div`
  background-color: var(--color-bg-300);
  max-width: 100%;
  height: 360px;
  border-radius: 0.5rem;
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
  border-radius: 0.5rem 0px 0px 0.5rem;
  position: relative;

  img {
    object-fit: cover;
    border-radius: 0.5rem 0px 0px 0.5rem;
  }

  @media screen and (max-width: 620px) {
    border-radius: 0.5rem 0.5rem 0px 0px;

    img {
      border-radius: 0.5rem 0.5rem 0px 0px;
    }
  }
`;

export const CardContent = styled.div`
  flex: 1;
  border-radius: 0px 0px 0.5rem 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1.2rem;
`;
export const CardContentCategory = styled.div``;
export const CardContentTitle = styled.div`
  h3 {
    font-size: 1.5rem;
    line-height: 1.93rem;
    font-weight: 700;
    color: var(--color-font-100);
  }

  p {
    margin-top: 1rem;
    color: var(--color-font-300);
  }
`;
export const CardContentAuthor = styled.div`
  display: flex;
  align-items: center;

  h3 {
    font-size: 0.875rem;
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
  width: 2rem;
  height: 2rem;
  border-radius: 100%;
  margin-right: 0.5rem;
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
