import React, { Ref } from 'react';
import Image from 'next/image';
import { NftStylesType } from '@/components/project/ProjectCreation/Children/FormBodyTabs/NFTCreatorTab';
import Barcode from 'public/images/global/project/barcode.png';

interface NFTImageTypes {
  nftStyle: NftStylesType;
  ref: Ref<HTMLDivElement>;
}

const NFTImageTemplate = ({ nftStyle, ref }: NFTImageTypes) => {
  return (
    <div
      ref={ref}
      style={{
        maxWidth: '400px',
        height: '500px',
        backgroundColor: nftStyle.backgroundColor.color1,
        backgroundImage: `linear-gradient(19deg, ${nftStyle.backgroundColor.color1} 0%, ${nftStyle.backgroundColor.color2} 100%)`,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <div
        style={{
          textAlign: 'center',
          padding: '16px',
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <div>
          <p
            style={{
              fontSize: '12px',
              lineHeight: '16px',
              maxWidth: '18rem',
              color: nftStyle.fontColor,
            }}
          >
            The holder of this NFT owns $894.90 worth of claimable shares in
            Orange AI
          </p>
        </div>
        <div
          style={{
            marginTop: '50px',
          }}
        >
          <Image src={Barcode} alt="barcode" width="150" height="150" />
        </div>
      </div>
      <div
        className="nft_content"
        style={{
          width: '100%',
          padding: '16px',
          borderRadius: '0px 0px 8px 8px',
          textAlign: 'center',
          color: nftStyle.fontColor,
          fill: 'rgba(255, 255, 255, 0.744)',
          backdropFilter: 'blur(120px)',
        }}
      >
        <p
          style={{
            color: nftStyle.fontColor,
            fontSize: '30px',
            marginBottom: '20px',
          }}
        >
          000-0000-000-0000
        </p>
        <p
          style={{
            color: nftStyle.fontColor,
            fontSize: '16px',
            marginBottom: '10px',
          }}
        >
          Orange AI
        </p>
        <p
          style={{
            color: nftStyle.fontColor,
            fontSize: '14px',
          }}
        >
          Share Price: $894.90
        </p>
      </div>
    </div>
  );
};

export default NFTImageTemplate;
