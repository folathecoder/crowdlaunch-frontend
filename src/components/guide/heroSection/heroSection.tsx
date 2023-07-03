import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
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
import CatgoryTag from '@/components/guide/slices/categoryTag';
import { GuideBannerPlaceholder, AuthorPlaceholder } from 'public/images';
import { Button } from '@/components/global';
import { FaRegClock } from 'react-icons/fa';

const HeroSection = () => {
  return (
    <HeroContainer>
      <HeroInner>
        <HeroContent>
          <h3>LEARN ALL ABOUT WEB3</h3>
          <h1>Discover the Latest Insights in Web3</h1>
          <div>
            <Button
              buttonTitle="Explore Guides"
              buttonLink=""
              buttonType="link"
            />
          </div>
        </HeroContent>

        <>
          <Link href="/blog/article" passHref>
            <HeroFeatured>
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
              <div>
                <h2>What is the Metaverse?</h2>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Voluptate nemo sit veniam animi doloremque sed, provident
                  labore ea magni placeat.
                </p>
              </div>
              <FeaturedDetail>
                <CardContentAuthor>
                  <div>
                    <CardAuthor>
                      <Image
                        src={AuthorPlaceholder}
                        layout="fill"
                        alt="featured image"
                      />
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
                        <FaRegClock />
                      </span>
                      10m
                    </p>
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
