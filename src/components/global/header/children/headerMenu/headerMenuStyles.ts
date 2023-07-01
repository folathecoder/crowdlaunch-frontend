import styled, { css } from 'styled-components';

interface HeaderMenuStyleTypes {
  active: boolean;
}

export const MenuList = styled.ul`
  display: flex;
  gap: 24px;

  @media screen and (max-width: 1117px) {
    flex-direction: column;
    padding: 40px 20px;
  }
`;

export const MenuItem = styled.li<HeaderMenuStyleTypes>`
  a {
    font-size: 15px;
    font-weight: 700;
    line-height: 22px;

    @media screen and (max-width: 1117px) {
      font-size: 30px;
      line-height: 35px;
    }

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
