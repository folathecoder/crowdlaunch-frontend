import React, { Ref } from 'react';
import Image from 'next/image';
import { NftStylesType } from '@/components/project/ProjectCreation/Children/FormBodyTabs/NFTCreatorTab';
import Barcode from 'public/images/global/project/barcode.png';

interface NFTImageTypes {
  nftStyle: NftStylesType;
  projectName: string;
}

const NFTImageTemplate = ({ nftStyle, projectName }: NFTImageTypes) => {
  return (
    <div
      style={{
        width: '330px',
        height: '370px',
        backgroundColor: nftStyle.backgroundColor.color1,
        backgroundImage: `linear-gradient(19deg, ${nftStyle.backgroundColor.color1} 0%, ${nftStyle.backgroundColor.color2} 100%)`,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderRadius: '8px',
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
            {` The holder of this NFT owns 0 ETH worth of claimable shares in ${projectName}`}
          </p>
        </div>
        <div
          style={{
            marginTop: '30px',
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
          {projectName}
        </p>
        <p
          style={{
            color: nftStyle.fontColor,
            fontSize: '14px',
          }}
        >
          Share Price: 0 ETH
        </p>
      </div>
    </div>
  );
};

export default NFTImageTemplate;
