import styled from 'styled-components';

export const CardContainer = styled.div`
  background-color: var(--color-bg-300);
  max-width: 100%;
  border-radius: 0.5rem;
  display: flex;
  transition: var(--transition);
  cursor: pointer;

  &:hover {
    transition: var(--transition);
    box-shadow: var(--box-shadow-200);

    h3 {
      color: var(--color-accent-100);
    }
  }
`;

export const CardImageWrap = styled.div`
  width: 6.875rem;
  height: 6.875rem;
  border-radius: 0.5rem;
  position: relative;

  img {
    object-fit: cover;
    border-radius: 0.5rem;
  }
`;

export const CardContent = styled.div`
  flex: 3;
  border-radius: 0px 0px 0.5rem 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0.5rem 0.8rem;
`;
export const CardContentCategory = styled.div``;
export const CardContentTitle = styled.div`
  h3 {
    font-size: 16px;
    line-height: 20px;
    font-weight: 700;
    color: var(--color-font-100);
  }
`;
export const CardContentAuthor = styled.div`
  display: flex;
  align-items: center;

  h4 {
    font-size: 12px;
    font-weight: 400;
    color: var(--color-font-300);
  }
`;
export const CardAuthor = styled.div`
  width: 1.56rem;
  height: 1.56rem;
  border-radius: 100%;
  margin-right: 0.5rem;
  position: relative;

  img {
    object-fit: cover;
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
