import React, { useState } from 'react';
import Image from 'next/image';
import {
  CardContainer,
  CardImage,
  CardContent,
  CardImageInner,
} from './adsCardStyles';
import { AuthorPlaceholder } from 'public/images';

interface PropTypes {
  postImage: string;
  postTitle: string;
  postDescription: string;
  postUrl: string;
}

const AdsCard = ({
  postImage,
  postTitle,
  postDescription,
  postUrl,
}: PropTypes) => {
  const [hoverCard, setHoverCard] = useState(false);

  return (
    <a href={postUrl} rel="noreferrer" target="_blank">
      <CardContainer
        onMouseEnter={() => setHoverCard(true)}
        onMouseLeave={() => setHoverCard(false)}
      >
        <CardImage>
          <CardImageInner hoverCard={hoverCard}>
            <Image
              src={postImage}
              alt={postTitle}
              objectFit="cover"
              layout="fill"
            />
          </CardImageInner>
        </CardImage>
        <CardContent>
          <h3>{postTitle}</h3>
          <p>{postDescription}</p>
        </CardContent>
      </CardContainer>
    </a>
  );
};

export default AdsCard;
