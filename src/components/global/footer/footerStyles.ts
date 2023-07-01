import styled, { css } from 'styled-components';
import { QUERIES } from '@/styles/mediaQueries';

interface UniqueLinkType {
  isActive?: boolean;
}

export const FooterContainer = styled.footer`
  max-width: 100%;
  background-color: var(--color-bg-200);
  font-family: var(--font-pry-300);
  font-weight: 400;
`;

export const FooterInner = styled.div`
  margin: var(--center-container);
  width: min(89.61%, var(--max-container));
  padding-block: 1.65rem;
  display: flex;
  flex-direction: column-reverse;
  justify-content: center;

  @media ${QUERIES.tablet} {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;
export const FooterCopyright = styled.div`
  p {
    text-align: center;
  }
`;
export const FooterNav = styled.nav`
  margin-bottom: 2rem;

  @media ${QUERIES.tablet} {
    margin-bottom: 0;
  }

  @media ${QUERIES.desktop} {
    width: 35%;
  }
`;
export const FooterLinks = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;

  @media ${QUERIES.tablet} {
    flex-direction: row;
    justify-content: space-between;
  }

  a {
    display: block;
    font-family: var(--font-pry-200);
  }
`;

export const FooterUniqueLink = styled.li<UniqueLinkType>`
  ${({ isActive }) =>
    isActive &&
    css`
      border-bottom: 2px solid var(--color-accent-100);
      a {
        color: var(--color-accent-100);
      }
    `}
`;

export const FooterSocialsContainer = styled.div`
  margin-bottom: 2rem;

  @media ${QUERIES.tablet} {
    margin-bottom: 0;
  }
`;

export const FooterSocials = styled.ul`
  display: flex;
  gap: 1.5rem;
  justify-content: center;

  li {
    border: 1px solid var(--color-font-600);
    border-radius: 100%;
    height: 2rem;
    width: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    padding: 0.5rem 0rem;

    a {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
`;
