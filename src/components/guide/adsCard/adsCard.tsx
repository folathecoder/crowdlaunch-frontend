import React, { useState } from 'react';
import Image from 'next/image';
import {
  CardContainer,
  CardImage,
  CardContent,
  CardImageInner,
} from './adsCardStyles';
import { GuideBannerPlaceholder } from 'public/images';

const AdsCard = () => {
  const [hoverCard, setHoverCard] = useState(false);

  return (
    <a href="/blog/article" rel="noreferrer" target="_blank">
      <CardContainer
        onMouseEnter={() => setHoverCard(true)}
        onMouseLeave={() => setHoverCard(false)}
      >
        <CardImage>
          <CardImageInner hoverCard={hoverCard}>
            <Image src={GuideBannerPlaceholder} alt="featured image" />
          </CardImageInner>
        </CardImage>
        <CardContent>
          <h3>Sponsored</h3>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore
            debitis temporibus nulla doloremque ducimus dignissimos.
          </p>
        </CardContent>
      </CardContainer>
    </a>
  );
};

export default AdsCard;
