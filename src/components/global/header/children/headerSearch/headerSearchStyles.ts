import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';

interface HeaderSearchStyleTypes {
  fullWidth?: boolean;
}

export const SearchContainer = styled.form<HeaderSearchStyleTypes>`
  border-radius: 12px;
  overflow: hidden;
  position: relative;

  ${({ fullWidth }) =>
    fullWidth
      ? css`
          width: 100%;
        `
      : css`
          width: 400px;
        `}

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
    line-break: no-break;
    opacity: 0.4;
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

export const SearchDropdown = styled(motion.div)`
  position: fixed;
  border-radius: 12px;
  top: 70px;
  height: 300px;
  width: 400px;
  background: var(--color-bg-500);
  border: 0.1rem solid var(--color-border-100);
  backdrop-filter: blur(3.5px);
  -webkit-backdrop-filter: blur(3.5px);
  z-index: 100;
`;
