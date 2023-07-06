import styled, { css } from 'styled-components';

interface HeaderSearchStyleTypes {
  fullWidth?: boolean;
}

export const SearchContainer = styled.form<HeaderSearchStyleTypes>`
  border-radius: 12px;
  overflow: hidden;
  width: 100%;
  display: flex;
  align-items: center;
  background-color: var(--color-bg-300);

  & > * {
    position: relative;
  }

  .search_input {
    flex: 100;
  }

  .search_icons {
    margin: 0px 20px;
    flex: 1;
  }

  .input-overlay {
    position: absolute;
    top: 0;
    transform: translateX(8px) translateY(7px);
    color: var(--color-font-200);
    font-size: 14px;
    font-weight: 400;
    padding: 0px 8px;
    line-break: no-break;
    opacity: 0.4
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

    &:active,
    &:focus {
      outline: none;
    }
    &:hover {
      border: none;
    }
  }
`;
