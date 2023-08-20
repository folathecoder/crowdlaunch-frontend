import React from 'react';
import Skeleton from '@mui/material/Skeleton';

interface PropType {
  height: number | string;
  width: number | string;
  marginTop?: number;
  marginBottom?: number;
  variant?: 'rounded' | 'circular';
}

const CustomSkeleton = ({
  height,
  width,
  marginTop,
  marginBottom,
  variant,
}: PropType) => {
  return (
    <Skeleton
      variant={variant || 'rounded'}
      height={height}
      width={width}
      animation="wave"
      sx={{
        background: 'rgb(211 194 194 / 10%)',
        marginTop: `${marginTop || 0}rem`,
        marginBottom: `${marginBottom || 0}rem`,
        minWidth: `${width}px`,
      }}
    />
  );
};

export default CustomSkeleton;
