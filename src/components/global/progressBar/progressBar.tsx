import React from 'react';
import { ProgressBarContainer, Bar } from './progressBarStyles';

interface ProgressBarProps {
  value: number;
  max: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ value, max }) => {
  const width = max !== 0 ? (Number(value) / Number(max)) * 100 : 0;

  return (
    <ProgressBarContainer>
      <Bar style={{ width: `${width > 100 ? 100 : width}%` }} />
    </ProgressBarContainer>
  );
};

export default ProgressBar;
