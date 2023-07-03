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
import { BiTime } from 'react-icons/bi';
import CatgoryTag from '@/components/guide/slices/categoryTag';
import AdsCard from '@/components/guide/adsCard/adsCard';
import ArticleShare from '@/components/guide/articleShare/articleShare';
import CtaSection from '@/components/global/ctaSection/ctaSection';
import { GuideBannerPlaceholder, AuthorPlaceholder } from 'public/images';

const GuideTemplate = () => {
  return (
    <>
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
                    <CatgoryTag title="Blockchain" />
                    <CatgoryTag title="Money" />
                    <CatgoryTag title="Invest" />
                    <CatgoryTag title="Business" />
                  </CategoryTags>
                  <div>
                    <h1>
                      How to Create a Metamask De-Fi Wallet
                    </h1>
                  </div>
                  <FeaturedDetail>
                    <CardContentAuthor style={{ cursor: 'pointer' }}>
                      <div>
                        <CardAuthor>
                          <Image src={AuthorPlaceholder} alt="featured image" />
                        </CardAuthor>
                      </div>
                      <div>
                        <h4>Folarin Akinloye</h4>
                      </div>
                    </CardContentAuthor>
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
                    src={GuideBannerPlaceholder}
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

                <div>
                  <ArticleRelatedCards>
                    <CornerStoneCard />
                    <CornerStoneCard />
                    <CornerStoneCard />
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
