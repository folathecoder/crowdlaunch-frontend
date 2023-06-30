import styled, { css } from 'styled-components';

interface HeaderMenuStyleTypes {
  active: boolean;
}

export const MenuList = styled.ul`
  display: flex;
  gap: 24px;
`;

export const MenuItem = styled.li<HeaderMenuStyleTypes>`
  a {
    font-size: 15px;
    font-weight: 700;
    line-height: 22px;

    ${({ active }) =>
      active
        ? css`
            color: var(--color-accent-100);
          `
        : css`
            color: var(--color-font-300);
          `}

    &:hover {
      color: var(--color-accent-100);
    }
  }
`;
