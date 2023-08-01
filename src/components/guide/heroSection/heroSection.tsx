import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import moment from 'moment';
import {
  HeroContainer,
  HeroContent,
  HeroInner,
  HeroFeatured,
  CardContentDate,
  CardImageWrap,
  CardContentCategory,
  FeaturedDetail,
  CardContentAuthor,
  CardAuthor,
} from '@/components/guide/heroSection/heroSectionStyles';
import { tags } from '@/data/guide/guideData';
import CatgoryTag from '@/components/guide/slices/categoryTag';
import { Button } from '@/components/global';
import { DataType } from '@/types/blogTypes';

const HeroSection = ({
  title,
  createdAt,
  slug,
  excerpt,
  coverImage,
  author,
}: DataType) => {
  return (
    <HeroContainer>
      <HeroInner>
        <HeroContent>
          <h3>LEARN ALL ABOUT WEB3</h3>
          <h1>Discover the Latest Insights in Web3</h1>
          <div>
            <Button
              buttonTitle="Explore Guides"
              buttonLink={`/guides/${slug}`}
              buttonType="link"
            />
          </div>
        </HeroContent>

        <>
          <Link href={`/guides/${slug}`} passHref>
            <HeroFeatured>
              <CardImageWrap>
                <Image src={coverImage.url} layout="fill" alt="cover image" />
                <CardContentCategory>
                  {tags.slice(0, 2).map((tag: string) => {
                    return <CatgoryTag title={tag} key={`tag-${tag}`} />;
                  })}
                  {tags.length > 2 && (
                    <CatgoryTag title={`+${tags.length - 2}`} />
                  )}
                </CardContentCategory>
              </CardImageWrap>
              <div>
                <h2>{title}</h2>
                <p>{excerpt}</p>
              </div>
              <FeaturedDetail>
                <CardContentAuthor>
                  <div>
                    <CardAuthor>
                      <Image
                        src={author.picture.url}
                        layout="fill"
                        alt="Author image"
                      />
                    </CardAuthor>
                  </div>
                  <div>
                    <h4>{author.name}</h4>
                  </div>
                </CardContentAuthor>
                <CardContentDate>
                  <div>
                    <p>{moment(createdAt).format('DD MMM, YYYY')}</p>
                  </div>
                </CardContentDate>
              </FeaturedDetail>
            </HeroFeatured>
          </Link>
        </>
      </HeroInner>
    </HeroContainer>
  );
};

export default HeroSection;
