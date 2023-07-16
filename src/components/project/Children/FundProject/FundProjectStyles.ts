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

    &:hover {
      background: black;
      color: #fff;
    }
  }

  .fund-item_container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
`;

export const FundItem = styled.div`
  width: 100%;
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
