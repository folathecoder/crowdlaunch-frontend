import styled, { css } from 'styled-components';

interface HeaderStylesTypes {
  lastMenu?: boolean;
  mobileNavToggle?: boolean;
  mobileMenuToggle?: boolean;
  isActive?: boolean;
}

export const HeaderContainer = styled.header`
  max-width: 100%;
  background: var(--color-bg-200);
  height: 80px;
  display: flex;
  align-items: center;
  backdrop-filter: blur(13.5px);
  -webkit-backdrop-filter: blur(13.5px);
  border-bottom: 0.1rem solid var(--color-border-100);
  z-index: 1000;
`;

export const HeaderInner = styled.div`
  flex: 1;
  height: 40px;
  max-width: 1556px;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;

  & > * {
    display: flex;
    align-items: center;
  }
`;

export const HeaderLeft = styled.div`
  /* background-color: black; */
`;

export const HeaderRight = styled.div`
  /* background-color: green; */
`;

export const HeaderLogo = styled.div`
  /* background-color: black; */
`;

export const HeaderSearch = styled.div`
  /* background-color: black; */
  padding: 0px 24px;
`;

export const HeaderNav = styled.nav`
  /* background-color: black; */
`;
