import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';

export const FilterContainer = styled(motion.div)`
  max-width: 100%;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: #212123;
  position: sticky;
  top: 130px;
  overflow: hidden;

  & > * {
    height: 380px;
  }
`;
