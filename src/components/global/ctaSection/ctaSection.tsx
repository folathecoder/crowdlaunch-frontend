import React from 'react';
import {
  CtaContainer,
  CtaInner,
} from '@/components/global/ctaSection/ctaSectionStyles';
import { Button } from '@/components/global';

const CtaSection = () => {
  return (
    <CtaContainer>
      <CtaInner>
        <div>
          <h2>Take your business to the next level with a dapp.</h2>
          <Button
            buttonTitle="Explore Projects"
            buttonType="link"
            buttonLink="/"
          />
        </div>
      </CtaInner>
    </CtaContainer>
  );
};

export default CtaSection;
