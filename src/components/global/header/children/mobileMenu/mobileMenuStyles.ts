import styled from 'styled-components';
import { QUERIES } from '@/styles/mediaQueries';
import { motion } from 'framer-motion';

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

  button {
    background: transparent;
    border: none;
    cursor: pointer;
    color: var(--color-font-100);
    font-size: 25px;
  }
`;

export const NavSearchContainer = styled.div`
  padding: 0px 20px;
`;
