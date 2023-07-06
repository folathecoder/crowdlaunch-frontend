import React from 'react';
import Image from 'next/image';
import {
  DetailContent,
  DetailPrice,
  Creator,
  CreatorImage,
} from '@/components/marketplace/NFTDetail/NFTDetailStyles';
import image from 'public/images/nft';
import { Button } from '@/components/global';

const NFTInfo = () => {
  return (
    <DetailContent>
      <h1>NFT Name #389</h1>
      <DetailPrice>
        <div>
          <div>
            <h2>23 ETH</h2>
          </div>
          <div>
            <Button buttonTitle="BUY" buttonType="link" buttonLink="/" />
          </div>
        </div>
      </DetailPrice>
      <Creator>
        <div>
          <CreatorImage>
            <Image src={image.creator4} alt={''} layout="responsive" />
          </CreatorImage>
          <div>
            <h4>Creator</h4>
            <p>Ghost Rider</p>
          </div>
        </div>
      </Creator>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo delectus
        laborum, similique perferendis debitis blanditiis doloribus, minima quia
        molestias voluptatem repudiandae eaque, illo libero labore enim porro
        dolorem nam aperiam. Lorem ipsum dolor sit amet, consectetur adipisicing
        elit. Nemo delectus laborum, similique perferendis debitis blanditiis
        doloribus, minima quia molestias voluptatem repudiandae eaque, illo
        libero labore enim porro dolorem nam aperiam.
      </p>
    </DetailContent>
  );
};

export default NFTInfo;
