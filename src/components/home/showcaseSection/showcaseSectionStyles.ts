import styled, { css } from 'styled-components';

interface ShowcaseStylesTypes {
  itemNumber: number;
}

export const ShowcaseContainer = styled.section`
  font-family: var(--font-pry-300);
`;

export const ShowcaseWrapper = styled.div`
  width: 100vw;

  & > * {
    display: flex;
    gap: 0.5rem;
    white-space: nowrap;
  }
`;

export const PositiveContainer = styled.div<ShowcaseStylesTypes>`
  margin-bottom: 0.5rem;
  animation: scroll-left 250s linear infinite running;

  ${({ itemNumber }) =>
    itemNumber &&
    css`
      @keyframes scroll-left {
        0% {
          transform: translateX(0);
        }
        50% {
          transform: translateX(${-(itemNumber - 10) * 15.6}rem);
        }
        100% {
          transform: translateX(0);
        }
      }
    `}
`;

export const NegativeContainer = styled.div<ShowcaseStylesTypes>`
  animation: scroll-right 250s linear infinite running;

  ${({ itemNumber }) =>
    itemNumber &&
    css`
      @keyframes scroll-right {
        0% {
          transform: translateX(${-(itemNumber - 10) * 15.6}rem);
        }
        50% {
          transform: translateX(0);
        }
        100% {
          transform: translateX(${-(itemNumber - 10) * 15.6}rem);
        }
      }
    `}
`;

export const Uniquenology = styled.div`
  min-width: 15.6rem;
  height: 5.5rem;
  padding-left: 1.41rem;
  border-radius: 0.5rem;
  background: var(--color-bg-300);
  display: flex;
  gap: 1rem;
  align-items: center;
`;
