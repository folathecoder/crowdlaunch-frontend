import React, { useContext } from 'react';
import useGetTokenId from '@/hooks/ContractHooks/useGetTokenId';
import { NftStylesType } from '@/components/project/ProjectCreation/Children/FormBodyTabs/NFTCreatorTab';
import { BarcodeGenerator } from '@/components/global';
import { CURRENCY_SYMBOL } from '@/data/appInfo';
import {
  ProjectDetailContext,
  ProjectDetailContextReturnTypes,
} from '@/contexts/ProjectDetailContext';
import { formatNumberWithDashes } from '@/helpers/formatters';

interface NFTImageTypes {
  nftStyle: NftStylesType;
  projectName: string;
  projectURL: string;
  nftValue: number | '';
}

const NFTImageTemplate = ({
  nftStyle,
  projectName,
  projectURL,
  nftValue,
}: NFTImageTypes) => {
  const { nftImageRef } = useContext(
    ProjectDetailContext
  ) as ProjectDetailContextReturnTypes;

  // Get the next available NFT token ID from the smart contract
  const { nextTokenId } = useGetTokenId();

  return (
    <div
      ref={nftImageRef}
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
            {`The holder of this NFT owns ${
              nftValue === '' ? 0 : nftValue
            } ${CURRENCY_SYMBOL} worth of claimable shares in ${projectName}`}
          </p>
        </div>
        <div
          style={{
            marginTop: '30px',
          }}
        >
          <BarcodeGenerator value={projectURL} />
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
          {formatNumberWithDashes(nextTokenId)}
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
          Share Price: {nftValue === '' ? 0 : nftValue} {CURRENCY_SYMBOL}
        </p>
      </div>
    </div>
  );
};

export default NFTImageTemplate;
