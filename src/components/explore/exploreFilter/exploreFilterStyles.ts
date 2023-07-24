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
  /* background-color: red; */
  min-height: 50px;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0px 15px;
`;

export const FilterItemHidden = styled.div`
  background-color: blue;
  min-height: 50px;
  width: 250px;
  display: flex;
  align-items: center;
  padding: 5px;
`;
