import styled from 'styled-components';

export const SearchContainer = styled.form`
  border-radius: 12px;
  width: 400px;

  & > * {
    position: relative;
  }

  .input-overlay {
    position: absolute;
    top: 0;
    transform: translateX(8px) translateY(7px);
    color: var(--color-font-200);
    font-size: 14px;
    font-weight: 400;
    padding: 0px 8px;
  }

  input {
    border-radius: 12px;
    border: 0px solid transparent;
    height: 40px;
    width: 100%;
    background-color: var(--color-bg-300);
    color: var(--color-font-200);
    font-size: 14px;
    font-weight: 400;
    padding: 0px 8px;
  }
`;
