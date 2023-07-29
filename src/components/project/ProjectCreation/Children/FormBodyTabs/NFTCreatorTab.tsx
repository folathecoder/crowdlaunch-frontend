import React, { useState, useCallback, useRef, ChangeEvent } from 'react';
import { Button, NFTImageTemplate } from '@/components/global';
import { toPng } from 'html-to-image';
import {
  CreatorContainer,
  CreatorContent,
  CreatorImage,
  FormButtonContainer,
  ColorPicker,
} from './FormStyles';

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
        link.download = 'my-image-name.png';
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
        <NFTImageTemplate nftStyle={nftStyle} ref={ref} />
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
