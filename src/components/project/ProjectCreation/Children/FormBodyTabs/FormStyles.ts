import styled, { css } from 'styled-components';
import { QUERIES } from '@/styles/mediaQueries';

export const InputDivider = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1.5rem;

  & > * {
    flex: 1;
  }

  @media ${QUERIES.tabletMini} {
    flex-direction: row;
    margin-bottom: 0rem;

  }
`;

export const InputContainer = styled.div`
  max-width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  input {
    width: 100%;
    height: 50px;
    padding: 10px;
    border-radius: 0.5rem;
    border: 0.1rem solid var(--color-border-100);
    background-color: var(--color-bg-200);
    color: var(--color-font-100);
    margin-bottom: 1rem;

    &:active {
      outline: 0.1rem solid var(--color-accent-100);
    }

    &:focus {
      outline: 0.1rem solid var(--color-border-100);
    }

    &:hover {
      outline: 0.1rem solid var(--color-border-100);
    }
  }

  select {
    width: 100%;
    height: 50px;
    padding: 5px;
    border-radius: 0.5rem;
    border: 0.1rem solid var(--color-border-100);
    background-color: var(--color-bg-200);
    color: var(--color-font-100);

    &:active {
      outline: 0.1rem solid var(--color-border-100);
    }

    &:focus {
      outline: 0.1rem solid var(--color-border-100);
    }

    &:hover {
      outline: 0.1rem solid var(--color-border-100);
    }
  }

  .quill:nth-child(2) {
    display: none !important;
  }

  .custom-label {
    margin: 1.5rem 0rem;
  }

  .editor_container {
    margin-bottom: 16px;
  }
`;

export const FormButtonContainer = styled.div`
  margin: 2rem 0rem;
  display: flex;
  justify-content: flex-end;
`;
