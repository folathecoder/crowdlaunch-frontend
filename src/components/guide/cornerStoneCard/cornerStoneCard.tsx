import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
} from '@/components/guide/cornerStoneCard/cornerStoneCardStyles';
import { GuideBannerPlaceholder } from 'public/images';
import CatgoryTag from '@/components/guide/slices/categoryTag';
import ArticleCard from '@/components/guide/articleCard/articleCard';

const CornerStoneCard = () => {
  return (
    <Link href="/blog/article" passHref>
      <div>
        <ArticleCard cornerStone />
        <CardContainer>
          <CardImageWrap>
            <Image
              src={GuideBannerPlaceholder}
              layout="fill"
              alt="featured image"
            />
          </CardImageWrap>
          <CardContent>
            <CardContentCategory>
              <CatgoryTag title="Hosting" />
              <CatgoryTag title="Blockchain" />
              <CatgoryTag title="+5" />
            </CardContentCategory>

            <CardContentTitle>
              <h3>
                Porttitor pharetra, consectetur viverra est nisl a, vulputate
                id...
              </h3>
              <p>
                Dui massa sapien ornare leo. Sagittis, sollicitudin sed integer
                maecenas sit. Nibh suspendisse lectus hendrerit pretium...
              </p>
            </CardContentTitle>
            <CardDetails>
              <CardContentDate>
                <p>13 Sept, 2021</p>
              </CardContentDate>
              <CardContentAuthor>
                <div>
                  <CardAuthor>
                    <Image
                      src={""}
                      layout="fill"
                      alt="featured image"
                    />
                  </CardAuthor>
                </div>
                <div>
                  <h4>Joan Webster</h4>
                </div>
              </CardContentAuthor>
            </CardDetails>
          </CardContent>
        </CardContainer>
      </div>
    </Link>
  );
};

export default CornerStoneCard;
