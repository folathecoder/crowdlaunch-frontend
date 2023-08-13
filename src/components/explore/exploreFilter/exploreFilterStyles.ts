import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';

export const FilterContainer = styled(motion.div)`
  max-width: 100%;
  border-radius: 8px;
  border: 1px solid var(--color-border-100);
  background: #212123;
  position: sticky;
  top: 130px;
  overflow: hidden;
  width: 280px;
`;

export const FilterItem = styled.div<{ removeBorder?: boolean }>`
  min-height: 50px;
  width: 100%;
  border-bottom: 1px solid var(--color-border-100);

  ${({ removeBorder }) =>
    removeBorder &&
    css`
      border-bottom: 0px;
    `}
`;

export const FilterItemShow = styled.div`
  min-height: 50px;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0px 15px;
  justify-content: space-between;
  color: var(--color-bg-400);
  cursor: pointer;

  button {
    display: grid;
    place-items: center;
    border: none;
    background-color: transparent;
    color: var(--color-bg-400);
  }

  .rotate_start {
    transform: rotate(180deg);
  }

  .rotate_end {
    transform: rotate(0deg);
  }
`;

export const FilterItemHidden = styled(motion.div)`
  width: 100%;
  display: flex;
  align-items: center;
  overflow: hidden;
`;
