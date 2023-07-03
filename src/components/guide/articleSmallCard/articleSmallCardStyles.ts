import styled from 'styled-components';

export const CardContainer = styled.div`
  background-color: var(--color-bg-300);
  max-width: 100%;
  border-radius: 8px;
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
  width: 110px;
  height: 110px;
  border-radius: 8px;
  position: relative;

  img {
    object-fit: cover;
    border-radius: 8px;
  }
`;

export const CardContent = styled.div`
  flex: 3;
  border-radius: 0px 0px 8px 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 8px 12.8px;
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
  width: 25px;
  height: 25px;
  border-radius: 100%;
  margin-right: 8px;
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
