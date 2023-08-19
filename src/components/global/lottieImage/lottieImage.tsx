import { StaticImageData } from 'next/image';
import React from 'react';
import Lottie from 'react-lottie';

interface LottieImageTypes {
  animationData: any;
}

const LottieImage = ({ animationData }: LottieImageTypes) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return <Lottie options={defaultOptions} />;
};

export default LottieImage;
