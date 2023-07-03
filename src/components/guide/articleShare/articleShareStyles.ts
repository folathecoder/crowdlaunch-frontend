import styled, { css } from 'styled-components';

export const ShareContainer = styled.div`
  background-color: var(--color-bg-200);
  width: 60px;
  position: sticky;
  top: 100px;
  padding: 0.5rem;
  display: grid;
  gap: 0.5rem;
  grid-template-columns: 1fr;

  div {
    padding: 0.7rem;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: var(--transition);

    &:hover {
      opacity: 0.6;
      transition: var(--transition);
    }
  }

  i {
    color: white;
  }

  @media screen and (max-width: 1000px) {
    grid-template-columns: repeat(6, 1fr);
  }
`;
