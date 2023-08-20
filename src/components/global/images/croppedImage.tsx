import React from 'react';
import { CldImage } from 'next-cloudinary';

interface PropType {
  src: string; // cloudinary image url
  height: number;
  width: number;
  alt: string;
}

const CroppedImage = ({ src, height, width, alt }: PropType) => {
  return (
    <CldImage src={src} height={height} width={width} alt={alt} crop="thumb" />
  );
};

export default CroppedImage;
