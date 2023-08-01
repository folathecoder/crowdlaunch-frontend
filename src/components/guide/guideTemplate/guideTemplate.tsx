import React from 'react';
import Image from 'next/image';
import moment from 'moment';
import {
  ArticleContainer,
  ArticleMainWrap,
  ArticleInnerWrap,
  ArticleShareContainer,
  Article,
  ArticleSidebar,
  ArticleImage,
  ArticleInner,
  ArticleHeader,
  ArticleContent,
  CategoryTags,
  ArticleRelatedCards,
  ArticleShareMobile,
} from './guideTemplateStyles';
import {
  CardContentDate,
  FeaturedDetail,
  CardContentAuthor,
  CardAuthor,
} from '@/components/guide/heroSection/heroSectionStyles';
import CornerStoneCard from '@/components/guide/cornerStoneCard/cornerStoneCard';
import { tags } from '@/data/guide/guideData';
import CatgoryTag from '@/components/guide/slices/categoryTag';
import AdsCard from '@/components/guide/adsCard/adsCard';
import ArticleShare from '@/components/guide/articleShare/articleShare';
import CtaSection from '@/components/global/ctaSection/ctaSection';
import HTMLReactParser from 'html-react-parser';
import { PostDetailDataType } from '@/types/blogTypes';
import { APP_URL } from '@/data/appInfo';

const GuideTemplate = ({
  title,
  slug,
  publishedAt,
  coverImage,
  content,
  author,
}: PostDetailDataType) => {
  return (
    <>
      <ArticleContainer>
        <ArticleMainWrap>
          <ArticleInnerWrap>
            <ArticleShareContainer>
              <ArticleShare shareUrl={`${APP_URL}/guides/${slug}`} />
            </ArticleShareContainer>
            <Article>
              <ArticleInner>
                <ArticleHeader>
                  <CategoryTags>
                    {tags.map((tag, index) => {
                      return <CatgoryTag title={tag} key={index} />;
                    })}
                  </CategoryTags>
                  <div>
                    <h1>{title}</h1>
                  </div>
                  <FeaturedDetail>
                    <CardContentAuthor style={{ cursor: 'pointer' }}>
                      <div>
                        <CardAuthor>
                          <Image
                            src={author.picture.url}
                            layout="fill"
                            alt="author image"
                          />
                        </CardAuthor>
                      </div>
                      <div>
                        <h4>{author.name}</h4>
                      </div>
                    </CardContentAuthor>
                    <CardContentDate>
                      <div>
                        <p>{moment(publishedAt).format('DD MMM, YYYY')}</p>
                      </div>
                    </CardContentDate>
                  </FeaturedDetail>
                </ArticleHeader>
                <ArticleImage>
                  <Image src={coverImage.url} layout="fill" alt={title} />
                </ArticleImage>
                <ArticleContent>{HTMLReactParser(content.html)}</ArticleContent>
                <ArticleShareMobile>
                  <ArticleShare shareUrl="/" />
                </ArticleShareMobile>
                <div>
                  <ArticleRelatedCards>
                    {author?.posts
                      ?.filter((post) => post.slug !== slug)
                      .slice(0, 3)
                      .map((post) => (
                        <CornerStoneCard post={post} key={post.id} />
                      ))}
                  </ArticleRelatedCards>
                </div>
              </ArticleInner>
            </Article>
            <ArticleSidebar>
              <AdsCard />
            </ArticleSidebar>
          </ArticleInnerWrap>
        </ArticleMainWrap>
        <CtaSection />
      </ArticleContainer>
    </>
  );
};

export default GuideTemplate;
