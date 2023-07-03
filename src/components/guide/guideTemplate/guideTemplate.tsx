import React from 'react';
import Image from 'next/image';
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
  ArticleRelated,
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
import { Button } from '@/components/global';
import { BiTime } from 'react-icons/bi';
import CatgoryTag from '@/components/guide/slices/catgoryTag';
import AuthorImage from 'public/images/author.png';
import AdsCard from '@/components/guide/adsCard/adsCard';
// import ArticleShare from 'components/blog/ArticleShare/ArticleShare';
import Tooltip from '@mui/material/Tooltip';
import CtaSection from '@/components/global/ctaSection/ctaSection';
// import NewsLetter from 'components/global/news-letter/NewsLetter';
import { GuideBannerPlaceholder, AuthorPlaceholder } from 'public/images';

const GuideTemplate = () => {
  return (
    <>
      {/* <ArticleHead title="How dapps can be used for online voting and e-democracy" /> */}
      <ArticleContainer>
        <ArticleMainWrap>
          <ArticleInnerWrap>
            <ArticleShareContainer>
              <ArticleShare shareUrl="/" />
            </ArticleShareContainer>
            <Article>
              <ArticleInner>
                <ArticleHeader>
                  <CategoryTags>
                    <CatgoryTag title="Hosting" />
                    <CatgoryTag title="Blockchain" />
                    <CatgoryTag title="Affiliate Marketing" />
                    <CatgoryTag title="Money" />
                    <CatgoryTag title="Invest" />
                    <CatgoryTag title="Business" />
                  </CategoryTags>
                  <div>
                    <h1>
                      How dapps can be used for online voting and e-democracy
                    </h1>
                  </div>
                  <FeaturedDetail>
                    <Tooltip
                      title="Joan Webster, is an example of author bio/description. Beard fashion axe trust fund, post-ironic listicle scenester. Uniquely mesh maintainable users rather than plug-and-play testing procedures."
                      placement="bottom"
                      arrow
                      PopperProps={{
                        sx: {
                          '& .MuiTooltip-tooltip': {
                            border: 'none',
                            color: 'var(--color-font-200)',
                            fontSize: '14px',
                            padding: '16px',
                            lineHeight: '21px',
                            backgroundColor: 'var(--color-bg-200)',
                          },

                          '& .MuiTooltip-popperArrow': {
                            backgroundColor: 'var(--color-bg-200) !important',
                          },
                        },
                      }}
                    >
                      <CardContentAuthor style={{ cursor: 'pointer' }}>
                        <div>
                          <CardAuthor>
                            <Image
                              src={AuthorImage}
                              layout="fill"
                              alt="featured image"
                            />
                          </CardAuthor>
                        </div>
                        <div>
                          <h4>Joan Webster</h4>
                        </div>
                      </CardContentAuthor>
                    </Tooltip>
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
                  </FeaturedDetail>
                </ArticleHeader>
                <ArticleImage>
                  <Image
                    src={FeaturedImage}
                    layout="fill"
                    alt="featured image"
                  />
                </ArticleImage>
                <ArticleContent>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Consequuntur perspiciatis nisi culpa saepe minima fugiat
                    perferendis reiciendis, modi dolorem eius natus cumque iusto
                    sunt hic dolores voluptatibus, possimus quidem quibusdam.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Consequuntur perspiciatis nisi culpa saepe minima fugiat
                    perferendis reiciendis, modi dolorem eius natus cumque iusto
                    sunt hic dolores voluptatibus, possimus quidem quibusdam.
                  </p>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Consequuntur perspiciatis nisi culpa saepe minima fugiat
                    perferendis reiciendis, modi dolorem eius natus cumque iusto
                    sunt hic dolores voluptatibus, possimus quidem quibusdam.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Consequuntur perspiciatis nisi culpa saepe minima fugiat
                    perferendis reiciendis, modi dolorem eius natus cumque iusto
                    sunt hic dolores voluptatibus, possimus quidem quibusdam.
                  </p>
                  <h2>Heading 2</h2>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Consequuntur perspiciatis nisi culpa saepe minima fugiat
                    perferendis reiciendis, modi dolorem eius natus cumque iusto
                    sunt hic dolores voluptatibus, possimus quidem quibusdam.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Consequuntur perspiciatis nisi culpa saepe minima fugiat
                    perferendis reiciendis, modi dolorem eius natus cumque iusto
                    sunt hic dolores voluptatibus, possimus quidem quibusdam.
                  </p>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Consequuntur perspiciatis nisi culpa saepe minima fugiat
                    perferendis reiciendis, modi dolorem eius natus cumque iusto
                    sunt hic dolores voluptatibus, possimus quidem quibusdam.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Consequuntur perspiciatis nisi culpa saepe minima fugiat
                    perferendis reiciendis, modi dolorem eius natus cumque iusto
                    sunt hic dolores voluptatibus, possimus quidem quibusdam.
                  </p>
                  <h2>Heading 2</h2>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Consequuntur perspiciatis nisi culpa saepe minima fugiat
                    perferendis reiciendis, modi dolorem eius natus cumque iusto
                    sunt hic dolores voluptatibus, possimus quidem quibusdam.
                  </p>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Consequuntur perspiciatis nisi culpa saepe minima fugiat
                    perferendis reiciendis, modi dolorem eius natus cumque iusto
                    sunt hic dolores voluptatibus, possimus quidem quibusdam.
                  </p>
                  <h2>Heading 2</h2>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Consequuntur perspiciatis nisi culpa saepe minima fugiat
                    perferendis reiciendis, modi dolorem eius natus cumque iusto
                    sunt hic dolores voluptatibus, possimus quidem quibusdam.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Consequuntur perspiciatis nisi culpa saepe minima fugiat
                    perferendis reiciendis, modi dolorem eius natus cumque iusto
                    sunt hic dolores voluptatibus, possimus quidem quibusdam.
                  </p>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Consequuntur perspiciatis nisi culpa saepe minima fugiat
                    perferendis reiciendis, modi dolorem eius natus cumque iusto
                    sunt hic dolores voluptatibus, possimus quidem quibusdam.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Consequuntur perspiciatis nisi culpa saepe minima fugiat
                    perferendis reiciendis, modi dolorem eius natus cumque iusto
                    sunt hic dolores voluptatibus, possimus quidem quibusdam.
                  </p>
                  <h2>Heading 2</h2>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Consequuntur perspiciatis nisi culpa saepe minima fugiat
                    perferendis reiciendis, modi dolorem eius natus cumque iusto
                    sunt hic dolores voluptatibus, possimus quidem quibusdam.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Consequuntur perspiciatis nisi culpa saepe minima fugiat
                    perferendis reiciendis, modi dolorem eius natus cumque iusto
                    sunt hic dolores voluptatibus, possimus quidem quibusdam.
                  </p>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Consequuntur perspiciatis nisi culpa saepe minima fugiat
                    perferendis reiciendis, modi dolorem eius natus cumque iusto
                    sunt hic dolores voluptatibus, possimus quidem quibusdam.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Consequuntur perspiciatis nisi culpa saepe minima fugiat
                    perferendis reiciendis, modi dolorem eius natus cumque iusto
                    sunt hic dolores voluptatibus, possimus quidem quibusdam.
                  </p>
                </ArticleContent>
                <ArticleShareMobile>
                  <ArticleShare shareUrl="/" />
                </ArticleShareMobile>

                <NewsLetter />

                <ArticleRelated>
                  <ArticleRelatedCards>
                    <CornerStoneCard />
                    <CornerStoneCard />
                    <CornerStoneCard />
                  </ArticleRelatedCards>
                </ArticleRelated>
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
