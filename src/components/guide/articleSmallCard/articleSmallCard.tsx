import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  CardContainer,
  CardImageWrap,
  CardContent,
  CardContentCategory,
  CardContentTitle,
  CardContentAuthor,
  CardContentDate,
  CardAuthor,
  CardDetails,
} from '@/components/guide/articleSmallCard/articleSmallCardStyles';
import { GuideBannerPlaceholder } from 'public/images';
import CatgoryTag from '@/components/guide/slices/categoryTag';

const ArticleSmallCard = () => {
  return (
    <Link href="/blog/article" passHref>
      <CardContainer>
        <CardImageWrap>
          <Image
            src={GuideBannerPlaceholder}
            layout="fill"
            alt="featured image"
          />
        </CardImageWrap>
        <CardContent>
          <CardContentTitle>
            <h3>How dapps can be used for online advertising</h3>
          </CardContentTitle>
          <CardContentAuthor>
            <div>
              <CardAuthor>
                <Image src={''} layout="fill" alt="featured image" />
              </CardAuthor>
            </div>
            <div>
              <h4>Joan Webster</h4>
            </div>
          </CardContentAuthor>
          <CardDetails>
            <CardContentDate>
              <p>13 Sept, 2021</p>
            </CardContentDate>
            <CardContentCategory>
              <CatgoryTag title="Hosting" small />
            </CardContentCategory>
          </CardDetails>
        </CardContent>
      </CardContainer>
    </Link>
  );
};

export default ArticleSmallCard;
