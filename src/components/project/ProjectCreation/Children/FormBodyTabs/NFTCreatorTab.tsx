import Image from 'next/image';
import React, {
  useState,
  useCallback,
  useRef,
  ChangeEvent,
  useContext,
  useEffect,
} from 'react';
import {
  ProjectCreactionContext,
  ProjectCreactionContextReturnTypes,
} from '@/components/project/ProjectCreation/ProjectCreationContext';
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

export interface NftStylesType {
  fontColor: string;
  backgroundColor: {
    color1: string;
    color2: string;
  };
}

const NFTCreatorTab: React.FC = () => {
  const { projectFormData, setProjectFormData, setActiveTab } = useContext(
    ProjectCreactionContext
  ) as ProjectCreactionContextReturnTypes;

  // Track font color change from input
  const handleFontColorInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setProjectFormData((prevState) => ({
      ...prevState,
      main: {
        ...prevState.main,
        customColour: {
          ...prevState.main.customColour,
          fontColour: e.target.value,
        },
      },
    }));
  };

  // Track font color change from color picker
  const handleFontColorPickerInputChange = (color: string) => {
    setProjectFormData((prevState) => ({
      ...prevState,
      main: {
        ...prevState.main,
        customColour: {
          ...prevState.main.customColour,
          fontColour: color,
        },
      },
    }));
  };

  const handleBgColor1InputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setProjectFormData((prevState) => ({
      ...prevState,
      main: {
        ...prevState.main,
        customColour: {
          ...prevState.main.customColour,
          bgColour1: e.target.value,
        },
      },
    }));
  };

  const handleBgColorPicker1InputChange = (color: string) => {
    setProjectFormData((prevState) => ({
      ...prevState,
      main: {
        ...prevState.main,
        customColour: {
          ...prevState.main.customColour,
          bgColour1: color,
        },
      },
    }));
  };

  const handleBgColor2InputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setProjectFormData((prevState) => ({
      ...prevState,
      main: {
        ...prevState.main,
        customColour: {
          ...prevState.main.customColour,
          bgColour2: e.target.value,
        },
      },
    }));
  };

  const handleBgColorPicker2InputChange = (color: string) => {
    setProjectFormData((prevState) => ({
      ...prevState,
      main: {
        ...prevState.main,
        customColour: {
          ...prevState.main.customColour,
          bgColour2: color,
        },
      },
    }));
  };

  const ref = useRef<HTMLDivElement>(null);

  const downloadNftTemplate = useCallback(() => {
    if (ref.current === null) {
      return;
    }

    toPng(ref.current, { cacheBust: true })
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = `${projectFormData.main.projectName}-nft-template.png`;
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  }, [ref]);

  const saveAndContinue = () => {
    if (projectFormData.detail.risks !== '') {
      setActiveTab(8);
    }
  };

  return (
    <CreatorContainer>
      <CreatorImage>
        <div
          ref={ref}
          style={{
            width: '330px',
            height: '370px',
            backgroundColor: projectFormData.main.customColour.bgColour1,
            backgroundImage: `linear-gradient(19deg, ${projectFormData.main.customColour.bgColour1} 0%, ${projectFormData.main.customColour.bgColour2} 100%)`,
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
                  color: projectFormData.main.customColour.fontColour,
                }}
              >
                {` The holder of this NFT owns 0 ETH worth of claimable shares in ${projectFormData.main.projectName}`}
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
              color: projectFormData.main.customColour.fontColour,
              fill: 'rgba(255, 255, 255, 0.744)',
              backdropFilter: 'blur(120px)',
            }}
          >
            <p
              style={{
                color: projectFormData.main.customColour.fontColour,
                fontSize: '30px',
                marginBottom: '20px',
              }}
            >
              000-0000-000-0000
            </p>
            <p
              style={{
                color: projectFormData.main.customColour.fontColour,
                fontSize: '16px',
                marginBottom: '10px',
              }}
            >
              {projectFormData.main.projectName}
            </p>
            <p
              style={{
                color: projectFormData.main.customColour.fontColour,
                fontSize: '14px',
              }}
            >
              Share Price: 0 ETH
            </p>
          </div>
        </div>
        <div className="download">
          <div>
            <Button
              buttonTitle="Download Template"
              buttonType="action"
              buttonFunction={downloadNftTemplate}
            />
          </div>
        </div>
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
                value={projectFormData.main.customColour.fontColour}
                onChange={handleFontColorInputChange}
                placeholder="#000000"
              />
              <ColorPicker
                color={projectFormData.main.customColour.fontColour}
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
                value={projectFormData.main.customColour.bgColour1}
                onChange={handleBgColor1InputChange}
                placeholder="#000000"
              />
              <ColorPicker
                color={projectFormData.main.customColour.bgColour1}
                onChange={handleBgColorPicker1InputChange}
              />
            </div>
            <div className="color_input-container">
              <input
                type="text"
                value={projectFormData.main.customColour.bgColour2}
                onChange={handleBgColor2InputChange}
                placeholder="#000000"
              />
              <ColorPicker
                color={projectFormData.main.customColour.bgColour2}
                onChange={handleBgColorPicker2InputChange}
              />
            </div>
          </div>
        </div>
        <FormButtonContainer>
          <Button
            buttonTitle="Previous"
            buttonType="action"
            buttonFunction={() => setActiveTab(6)}
          />
          <Button
            buttonTitle="Save & Continue"
            buttonType="action"
            buttonFunction={saveAndContinue}
          />
        </FormButtonContainer>
      </CreatorContent>
    </CreatorContainer>
  );
};

export default NFTCreatorTab;
