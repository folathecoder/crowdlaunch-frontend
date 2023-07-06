import styled from 'styled-components';

export const RelatedContainer = styled.section`
  max-width: var(--max-container);
  margin: var(--center-container);
  min-height: 500px;
  padding: 50px 20px;
`;

export const RelatedCards = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 15px;
  margin-top: 20px;

  @media screen and (min-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (min-width: 790px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const RelatedButton = styled.div`
  display: flex;
  justify-content: center;
  padding: 40px;
`;
