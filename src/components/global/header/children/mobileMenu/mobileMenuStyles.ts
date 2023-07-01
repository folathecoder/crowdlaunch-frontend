import styled from 'styled-components';
import { QUERIES } from '@/styles/mediaQueries';

export const NavContainer = styled.nav`
  position: absolute;
  background: rgba(22, 22, 24);
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100vh;

  @media ${QUERIES.tabletMini} {
    top: 0;
    left: auto;
    right: 0;
    bottom: 0;
    width: 500px;
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

export const NavMenu = styled.div``;
