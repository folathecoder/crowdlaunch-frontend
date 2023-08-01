import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import moment from 'moment';
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
import { tags } from '@/data/guide/guideData';
import CatgoryTag from '@/components/guide/slices/categoryTag';
import ArticleCard from '@/components/guide/articleCard/articleCard';
import { DataType } from '@/types/blogTypes';

interface cornerStoneType {
  post: DataType;
}

const CornerStoneCard = ({ post }: cornerStoneType) => {
  return (
    <Link href={`/guides/${post.slug}`} passHref>
      <div>
        <ArticleCard cornerStone data={post} />
        <CardContainer>
          <CardImageWrap>
            <Image
              src={post.coverImage.url}
              layout="fill"
              alt="featured image"
            />
          </CardImageWrap>
          <CardContent>
            <CardContentCategory>
              {tags.slice(0, 3).map((tag: string) => {
                return <CatgoryTag title={tag} key={`tag-${tag}`} />;
              })}
            </CardContentCategory>
            <CardContentTitle>
              <h3>{post.title}</h3>
              <p>{post.excerpt}</p>
            </CardContentTitle>
            <CardDetails>
              <CardContentDate>
                <p>{moment(post.createdAt).format('DD MMM, YYYY')}</p>
              </CardContentDate>
              <CardContentAuthor>
                <div>
                  <CardAuthor>
                    <Image
                      src={post.author.picture.url}
                      layout="fill"
                      alt="author image"
                    />
                  </CardAuthor>
                </div>
                <div>
                  <h4>{post.author.name}</h4>
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
