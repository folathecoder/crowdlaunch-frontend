import styled from 'styled-components';

export const ProgressBarContainer = styled.div`
  width: 100%;
  height: 6px;
  background-color: #f3f3f3;
  border-radius: 5px;
`;

export const Bar = styled.div`
  height: 100%;
  background-color: var(--color-accent-100);
  border-radius: 5px;
  transition: width 0.4s ease-in-out;
`;
