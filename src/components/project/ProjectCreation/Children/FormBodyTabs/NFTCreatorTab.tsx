import Image from 'next/image';
import React, { useState, useCallback, useRef, ChangeEvent } from 'react';
import { Button } from '@/components/global';
import { toPng } from 'html-to-image';
import {
  CreatorContainer,
  CreatorContent,
  CreatorImage,
  FormButtonContainer,
  ColorPicker,
} from './FormStyles';
import Barcode from 'public/images/global/project/barcode.png';

// to be refactored and removed
const PROJECT_NAME = 'Orange AI';

export interface NftStylesType {
  fontColor: string;
  backgroundColor: {
    color1: string;
    color2: string;
  };
}

const NFTCreatorTab: React.FC = () => {
  const [nftStyle, setNftStyle] = useState<NftStylesType>({
    fontColor: '#ffffff',
    backgroundColor: {
      color1: '#21d4fd',
      color2: '#b721ff',
    },
  });

  const handleFontColorInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNftStyle((prevStyle) => ({
      ...prevStyle,
      fontColor: e.target.value,
    }));
  };

  const handleFontColorPickerInputChange = (color: string) => {
    setNftStyle((prevStyle) => ({
      ...prevStyle,
      fontColor: color,
    }));
  };

  const handleBgColor1InputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNftStyle((prevStyle) => ({
      ...prevStyle,
      backgroundColor: {
        ...prevStyle.backgroundColor,
        color1: e.target.value,
      },
    }));
  };

  const handleBgColorPicker1InputChange = (color: string) => {
    setNftStyle((prevStyle) => ({
      ...prevStyle,
      backgroundColor: {
        ...prevStyle.backgroundColor,
        color1: color,
      },
    }));
  };

  const handleBgColor2InputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNftStyle((prevStyle) => ({
      ...prevStyle,
      backgroundColor: {
        ...prevStyle.backgroundColor,
        color2: e.target.value,
      },
    }));
  };

  const handleBgColorPicker2InputChange = (color: string) => {
    setNftStyle((prevStyle) => ({
      ...prevStyle,
      backgroundColor: {
        ...prevStyle.backgroundColor,
        color2: color,
      },
    }));
  };

  const ref = useRef<HTMLDivElement>(null);

  const onButtonClick = useCallback(() => {
    if (ref.current === null) {
      return;
    }

    toPng(ref.current, { cacheBust: true })
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = `${PROJECT_NAME}-nft-template.png`;
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  }, [ref]);

  return (
    <CreatorContainer>
      <CreatorImage>
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
                {` The holder of this NFT owns $894.90 worth of claimable shares in ${PROJECT_NAME}`}
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
              {PROJECT_NAME}
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
        {/* <NFTImageTemplate nftStyle={nftStyle} ref={ref} /> */}
      </CreatorImage>
      <CreatorContent>
        <h2>Customise your project&apos;s NFT</h2>
        <p>
          Customize your NFT by changing the background color and text color
          using HEX color codes for a unique and personalized design.
        </p>
        <div>
          <h3>Text Color</h3>
          <div className="color_input">
            <div className="color_input-container">
              <input
                type="text"
                value={nftStyle.fontColor}
                onChange={handleFontColorInputChange}
                placeholder="#000000"
              />
              <ColorPicker
                color={nftStyle.fontColor}
                onChange={handleFontColorPickerInputChange}
              />
            </div>
          </div>
        </div>
        <div>
          <h3>Background Color</h3>
          <div className="color_input">
            <div className="color_input-container">
              <input
                type="text"
                value={nftStyle.backgroundColor.color1}
                onChange={handleBgColor1InputChange}
                placeholder="#000000"
              />
              <ColorPicker
                color={nftStyle.backgroundColor.color1}
                onChange={handleBgColorPicker1InputChange}
              />
            </div>
            <div className="color_input-container">
              <input
                type="text"
                value={nftStyle.backgroundColor.color2}
                onChange={handleBgColor2InputChange}
                placeholder="#000000"
              />
              <ColorPicker
                color={nftStyle.backgroundColor.color2}
                onChange={handleBgColorPicker2InputChange}
              />
            </div>
          </div>
        </div>
        <FormButtonContainer>
          <Button
            buttonTitle="Save & Continue"
            buttonType="action"
            buttonFunction={onButtonClick}
          />
        </FormButtonContainer>
      </CreatorContent>
    </CreatorContainer>
  );
};

export default NFTCreatorTab;
