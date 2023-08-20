import styled, { css } from 'styled-components';
import { QUERIES } from '@/styles/mediaQueries';
import { motion } from 'framer-motion';

interface UserMenuStyleTypes {
  active: boolean;
  menuItemIndex: number;
}

export const NavContainer = styled(motion.nav)`
  position: absolute;
  background: var(--color-bg-500);
  top: 0;
  left: auto;
  right: 0;
  bottom: 0;
  height: 100vh;
  overflow: hidden;
  width: 100vw;
  z-index: 999999;
  white-space: nowrap;

  @media ${QUERIES.mobile} {
    top: 0;
    left: auto;
    right: 0;
    bottom: 0;
    width: 500px;
    border-radius: 20px 0px 0px 20px;
  }
`;

export const NavHeader = styled.div`
  height: 80px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 20px;
  border-bottom: 0.1rem solid var(--color-border-100);
  overflow: hidden;

  div:first-of-type {
    display: flex;
    align-items: center;
    gap: 20px;

    p {
      color: var(--color-font-100);
      font-size: 20px;
      font-weight: 700;
      letter-spacing: 1px;
    }
  }

  .profile-icon {
    border-radius: 100%;
    border: 2px solid var(--color-accent-100);
    cursor: pointer;

    img {
      border-radius: 100%;
    }
  }

  .disconnect-button {
    background: var(--color-bg-100);
    display: grid;
    place-items: center;
    font-size: 16px;
    padding: 8px;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 300;
    cursor: pointer;

    &:hover {
      color: var(--color-accent-100);
    }
  }

  button {
    background: transparent;
    border: none;
    cursor: pointer;
    color: var(--color-font-100);
    font-size: 25px;
  }
`;

export const MenuList = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 0px 20px;
  overflow: hidden;
`;

export const MenuItem = styled.li<UserMenuStyleTypes>`
  a {
    font-weight: 700;
    font-size: 30px;
    line-height: 35px;
    display: flex;
    overflow: hidden;
    white-space: nowrap;

    .icon {
      margin-left: 10px;
    }

    ${({ menuItemIndex }) =>
      menuItemIndex === 1
        ? css`
            margin-bottom: 20px;
            border-bottom: 0.1rem solid var(--color-border-100);
            padding: 20px 0px;
          `
        : css`
            margin-bottom: 20px;
          `}

    ${({ active }) =>
      active
        ? css`
            color: var(--color-accent-100);
          `
        : css`
            color: var(--color-font-100);
          `}

    &:hover {
      color: var(--color-accent-100);
    }
  }
`;
