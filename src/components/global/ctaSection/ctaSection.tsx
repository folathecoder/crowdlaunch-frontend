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
          <h2>Empower Creativity. Revolutionize Funding.</h2>
          <Button
            buttonTitle="Explore Projects"
            buttonType="link"
            buttonLink="/explore"
          />
        </div>
      </CtaInner>
    </CtaContainer>
  );
};

export default CtaSection;
