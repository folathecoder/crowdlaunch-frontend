import styled from 'styled-components';
import { QUERIES } from '@/styles/mediaQueries';

export const FundingContainer = styled.div`
  max-width: 26.6875rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  justify-content: center;
  border-radius: 1.25rem;
  background: var(--color-bg-300);

  h3 {
    font-size: 1.5rem;
    line-height: 1.5rem;
  }

  p {
    font-size: 0.8125rem;
    opacity: 0.5;
  }

  button {
    width: 100%;
    padding-block: 1rem;
    text-transform: uppercase;
    border-radius: 0.75rem;
    border: 1px solid #fff;
    display: flex;
    justify-content: center;

    span {
      margin-left: 1rem;
    }

    &:hover {
      background: black;
      color: #fff;
    }
  }

  .fund-item_container {
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
  }
`;

export const FundItem = styled.div<{ spaceUp?: boolean }>`
  width: 100%;
  margin-top: ${({ spaceUp }) => (spaceUp ? '1.5rem' : '0rem')};

  input {
    width: 100%;
    height: 50px;
    padding: 10px;
    border-radius: 0.5rem;
    border: 0.1rem solid var(--color-border-100);
    background-color: var(--color-bg-200);
    color: var(--color-font-100);
    margin-bottom: 1rem;

    &:active {
      outline: 0.1rem solid var(--color-accent-100);
    }

    &:focus {
      outline: 0.1rem solid var(--color-border-100);
    }

    &:hover {
      outline: 0.1rem solid var(--color-border-100);
    }
  }
`;

export const ProgressWrapper = styled.div`
  width: 100%;
`;

export const ProgressContainer = styled.div`
  max-width: 100%;
  width: 100%;
  height: 0.375rem;
  border-radius: 2px;
  background: white;

  div {
    will-change: transform;
    background: #ff4264;
    transition: all 0.15s ease-in-out 0s;
    height: 0.375rem;
    border-radius: 2px;
    width: 80%;
  }
`;
