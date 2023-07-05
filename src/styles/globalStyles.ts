import styled, { createGlobalStyle } from 'styled-components';
import { QUERIES } from 'src/styles/mediaQueries';
import { ThemeTypes } from 'src/styles/theme';

export const GlobalStyles = createGlobalStyle<{ theme: ThemeTypes }>`
    :root {
        --color-bg-100: ${(props) => props.theme.bg100};
        --color-bg-200: ${(props) => props.theme.bg200};
        --color-bg-300: ${(props) => props.theme.bg300};
        --color-bg-400: ${(props) => props.theme.bg400};
        --color-bg-500: ${(props) => props.theme.bg500};
        --color-accent-100: ${(props) => props.theme.accent100};
        --color-accent-200: ${(props) => props.theme.accent200};
        --color-accent-300: ${(props) => props.theme.accent300};
        --color-accent-400: ${(props) => props.theme.accent400};
        --color-font-100: ${(props) => props.theme.font100};
        --color-font-200: ${(props) => props.theme.font200};
        --color-font-300: ${(props) => props.theme.font300};
        --color-font-400: ${(props) => props.theme.font400};
        --color-font-500: ${(props) => props.theme.font500};
        --color-font-600: ${(props) => props.theme.font600};
        --color-border-100: ${(props) => props.theme.border100};
        --font-pry-100: 'Lato', sans-serif;
        --font-pry-200: 'Poppins', sans-serif;
        --font-pry-300: 'Inter', sans-serif;
        --max-container: 82.5rem;
        --center-container: 0 auto;
        --border-radius: 0.5rem;
        --transition: all 0.5s;
        --section-space: 0rem 1.2rem;
        --box-shadow-100: ${(props) => props.theme.shadow100};
        --box-shadow-200: ${(props) => props.theme.shadow200};
        --box-shadow-300: ${(props) => props.theme.shadow300};
        --color-scroll-bar: ${(props) => props.theme.scrollBar100};
        --gradient-100: linear-gradient(19deg, #B721FF 0%, #21D4FD 1%, #356df3 78%, #356df3 95%);
        --gradient-200: linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%);
        --gradient-bg-100: #b721ff;
        --gradient-bg-200:#4158d0;
    }

    html {
        scrollbar-width: none;
        font-size: 100%;
    }
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    input,
    button,
    textarea,
    select {
        font: inherit;
}

    img {
        display: block;
        max-width: 100%;
        height: auto;
        object-fit: cover;
    }
    li {
        list-style: none;
    }

    ::-webkit-scrollbar {
      width: 8px;
      height: 4px;
    }

    ::-webkit-scrollbar-track {
      background: transparent;
    }

    ::-webkit-scrollbar-thumb {
      background: var(--color-scroll-bar);
      box-shadow: inset 2px 2px 5px 0 rgba(#fff, 0.5);
      border-radius: 100vw;
      margin: 1px;
    }

    @supports (scrollbar-color: var(--color-scroll-bar) var(--color-scroll-bar)) {
      * {
        scrollbar-color: var(--color-scroll-bar) transparent;
        scrollbar-width: thin;
      }
    }

    @media (prefers-reduced-motion: reduce) {
    html:focus-within {
      scroll-behavior: auto;
      }
      *,
      *::before,
      *::after {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
      }
    }

    body {
        font-family: var(--font-pry-100);
        font-weight: 700;
        background-color: var(--color-bg-100);
        color: var(--color-font-100);
        overflow-y: auto;
        overflow-x: hidden;
        min-height: 100vh;
        max-width: 100vw;
    }

    a {
      text-decoration: none;
      font-size: 1rem;
      color: var(--color-font-100);
      font-weight: 400;
      transition: var(--transition);
      font-family: var(--font-pry-300);

      &:hover {
        transition: var(--transition);
        color: var(--color-accent-100);
      }
    }

    p {
      color: var(--color-font-200);
      font-size: 1rem;
      line-height: 1.5rem;
      font-weight: 400;
    }

    h1, h2, h3 {
       text-transform: capitalize;
       font-family: var(--font-pry-200);
    }

    h1 {
      color: var(--color-font-100);
      font-size: 2.2rem;
      line-height: 3rem;
      font-weight: 700;
      
      

      @media ${QUERIES.tabletMini} {
        font-size: 3rem;
        line-height: 4rem;
      }

      @media ${QUERIES.desktop} {
        font-size: 3.5rem;
        line-height: 4.5rem;
      }
    }

    h2 {
      color: var(--color-font-100);
      font-size: 1.5rem;
      line-height: 2rem;
      font-weight: 600;
      font-family: var(--font-pry-200);

      @media ${QUERIES.tabletMini} {
        font-size: 1.7rem;
        line-height: 2.2rem;
      }

      @media ${QUERIES.desktop} {
        font-size: 2rem;
        line-height: 2.5rem;
      }
    }

    i:hover {
      background-color: var(--color-accent-100);
      background-image: var(--color-accent-100);
      -webkit-text-fill-color: transparent;
      -webkit-background-clip: text;
    }

    button:focus {
       outline: none;
    }
    
`;

export const HiddenHeader = styled.h1`
  border: 0 !important;
  clip: rect(1px, 1px, 1px, 1px) !important;
  -webkit-clip-path: inset(50%) !important;
  clip-path: inset(50%) !important;
  height: 1px !important;
  margin: -1px !important;
  overflow: hidden !important;
  padding: 0 !important;
  position: absolute !important;
  width: 1px !important;
  white-space: nowrap !important;
`;
