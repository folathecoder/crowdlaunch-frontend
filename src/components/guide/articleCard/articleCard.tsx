import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import moment from 'moment';
import {
  CardContainer,
  CardImageWrap,
  CardContent,
  CardContentCategory,
  CardContentTitle,
  CardContentDate,
} from '@/components/guide/articleCard/articleCardStyles';
import { tags } from '@/data/guide/guideData';
import CatgoryTag from '@/components/guide/slices/categoryTag';
import { DataType } from '@/types/blogTypes';

interface ArticleCardTypes {
  cornerStone?: boolean;
  data: DataType;
}

const ArticleCard = ({
  cornerStone,
  data: { title, createdAt, slug, coverImage },
}: ArticleCardTypes) => {
  return (
    <Link href={`/guides/${slug}`} passHref>
      <CardContainer cornerStone={cornerStone}>
        <CardImageWrap>
          <Image src={coverImage.url} layout="fill" alt="featured image" />
          <CardContentCategory>
            {tags.slice(0, 2).map((tag: string) => {
              return <CatgoryTag title={tag} key={`tag-${tag}`} />;
            })}
            {tags.length > 2 && <CatgoryTag title={`+${tags.length - 2}`} />}
          </CardContentCategory>
        </CardImageWrap>
        <CardContent>
          <CardContentTitle>
            <h3>{title}</h3>
          </CardContentTitle>
          <CardContentDate>
            <div>
              <p>{moment(createdAt).format('DD MMM, YYYY')}</p>
            </div>
          </CardContentDate>
        </CardContent>
      </CardContainer>
    </Link>
  );
};

export default ArticleCard;
