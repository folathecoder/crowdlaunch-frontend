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

export const FilterMenu = styled(motion.div)`
  width: 100%;
  min-height: 50px;
  display: flex;
  align-items: center;
  overflow: hidden;
  border-bottom: 1px solid var(--color-border-100);
  padding: 0px 15px;
  gap: 0.5rem;

  button {
    padding: 0.2rem 0.5rem;
    border-radius: 0.5rem;
    border: 1px solid var(--color-border-100);
    background: transparent;
    color: var(--color-font-100);
    font-size: 1rem;
    display: grid;
    place-items: center;
    font-weight: 500;
    line-height: 0px;
    height: 2rem;
    cursor: pointer;
  }

  .apply_btn_active {
    border: 1px solid var(--color-accent-200);
  }

  .clear_btn {
    border: 1px solid var(--color-accent-100);
  }
`;
