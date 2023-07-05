import React from 'react';
import { ProgressBarContainer, Bar } from './progressBarStyles';

interface ProgressBarProps {
  value: number;
  max: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ value, max }) => {
  const width = (value / max) * 100;

  return (
    <ProgressBarContainer>
      <Bar style={{ width: `${width}%` }} />
    </ProgressBarContainer>
  );
};

export default ProgressBar;
