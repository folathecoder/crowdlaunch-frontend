import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  CardContainer,
  CardImageWrap,
  CardContent,
  CardContentCategory,
  CardContentTitle,
  CardContentDate,
} from '@/components/guide/articleCard/articleCardStyles';
import { GuideBannerPlaceholder } from 'public/images';
import CatgoryTag from '@/components/guide/slices/categoryTag';
import { BiTime } from 'react-icons/bi';

interface ArticleCardTypes {
  cornerStone?: boolean;
}

const ArticleCard = ({ cornerStone }: ArticleCardTypes) => {
  return (
    <Link href="/blog/article" passHref>
      <CardContainer cornerStone={cornerStone}>
        <CardImageWrap>
          <Image
            src={GuideBannerPlaceholder}
            layout="fill"
            alt="featured image"
          />
          <CardContentCategory>
            <CatgoryTag title="Hosting" />
            <CatgoryTag title="Blockchain" />
            <CatgoryTag title="+5" />
          </CardContentCategory>
        </CardImageWrap>
        <CardContent>
          <CardContentTitle>
            <h3>How dapps can be used for online advertising</h3>
          </CardContentTitle>
          <CardContentDate>
            <div>
              <p>13 Sept, 2021</p>
            </div>
            <div>
              <p>
                <span>
                  <BiTime />
                </span>
                10m
              </p>
            </div>
          </CardContentDate>
        </CardContent>
      </CardContainer>
    </Link>
  );
};

export default ArticleCard;
