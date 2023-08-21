import styled from 'styled-components';

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
  position: sticky;
  top: 0;
  backdrop-filter: blur(17.5px);
  -webkit-backdrop-filter: blur(17.5px);
`;

export const HeaderInner = styled.div`
  flex: 1;
  height: 40px;
  max-width: 1556px;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  padding: 0px 20px;

  & > * {
    display: flex;
    align-items: center;
  }
`;

export const HeaderLeft = styled.div`
  display: flex;
  gap: 24px;

  img {
    border-radius: 100%;
  }

  .profile-icon {
    border-radius: 100%;
    border: 2px solid var(--color-accent-100);
    cursor: pointer;
    overflow: hidden;
    height: 35px;
    width: 35px;
  }

  .mobile-nav_btn {
    background: transparent;
    border: none;
    cursor: pointer;
    color: var(--color-font-100);
    font-size: 25px;
  }

  .cart-button {
    background: transparent;
    color: var(--color-font-100);
    cursor: pointer;
    border: none;
    position: relative;

    div {
      position: absolute;
      height: 20px;
      width: 20px;
      background-color: var(--color-accent-100);
      border-radius: 100%;
      top: 0;
      right: 0;
      transform: translateX(10px) translateY(-10px);
      font-size: 12px;
      display: grid;
      place-items: center;
      line-height: 0px;
    }
  }
`;

export const HeaderRight = styled.div``;

export const HeaderLogo = styled.div``;

export const HeaderNav = styled.nav`
  margin-left: 2rem;
`;
