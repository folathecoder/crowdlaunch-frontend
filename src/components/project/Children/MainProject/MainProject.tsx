import React, { useContext, useState } from 'react';
import {
  ProjectDetailContext,
  ProjectDetailContextReturnTypes,
} from '@/contexts/ProjectDetailContext';
import Link from 'next/link';
import Campaign from '../MiniChildren/Campaign/Campaign';
import Updates from '../MiniChildren/Updates/Updates';
import Wallet from '../MiniChildren/Wallet/Wallet';
import { APP_URL } from '@/data/appInfo';
import {
  MajorSection,
  TabsContainer,
  TabsWrapper,
  ActiveTab,
  TabContentsWrapper,
  TabContentLayout,
  VotingWrapper,
} from './MainProjectStyles';
import Tilt from 'react-parallax-tilt';
import { NFTImageTemplate } from '@/components/global';
import useGetCampaign from '@/hooks/ContractHooks/useGetCampaign';
import { checkAddressIsValid } from '@/helpers/checkAddressIsValid';

interface InternalDataTypes {
  link: string;
  value?: number;
}

const internalLinkData: InternalDataTypes[] = [
  {
    link: 'Campaign',
  },
  {
    link: 'Updates',
    value: 2,
  },
  {
    link: 'Wallet',
  },
];

const MainProject: React.FC = () => {
  const { project, updateCount, fundAmount, tokenURI } = useContext(
    ProjectDetailContext
  ) as ProjectDetailContextReturnTypes;

  const [contents] = useState<React.ReactNode[]>([
    <Campaign key="campaign" />,
    <Updates key="updates" />,
    <Wallet key="wallet" />,
  ]);

  const [activeContent, setActiveContent] = useState<number>(0);

  const handleActive = (active: number) => {
    setActiveContent(active);
  };

  // Get updated campaign funding data from the smart contract
  const { campaign } = useGetCampaign({
    projectAddress: project?.project.projectWalletAddress as `0x${string}`,
    project: project,
    token: tokenURI || '',
  });

  // Check if the campaign has a wallet activated by the smart contract
  const isWalletAvailable = campaign?.depositAddress
    ? checkAddressIsValid(campaign.depositAddress)
    : false;

  return (
    <MajorSection>
      <div>
        <TabsWrapper>
          <TabsContainer>
            <ul>
              {(isWalletAvailable
                ? internalLinkData
                : internalLinkData.slice(0, 2)
              ).map((data, index) => {
                const isActive = activeContent === index;
                return (
                  <ActiveTab
                    key={index}
                    isActive={isActive}
                    onClick={() => handleActive(index)}
                  >
                    <p>{data.link}</p>
                    {data.value && (
                      <span>
                        {updateCount === 0
                          ? project?.projectUpdates.length
                          : updateCount}
                      </span>
                    )}
                  </ActiveTab>
                );
              })}
            </ul>
            <Link href="/explore" className="gradient-link">
              Explore NFTs
            </Link>
          </TabsContainer>
        </TabsWrapper>
        <TabContentLayout>
          <TabContentsWrapper>{contents[activeContent]}</TabContentsWrapper>
          <VotingWrapper>
            <div>
              <Tilt glareEnable glareMaxOpacity={0.4} >
                <NFTImageTemplate
                  projectName={project?.project.projectName || ''}
                  nftStyle={{
                    fontColor: project?.project.customColour.fontColour || '',
                    backgroundColor: {
                      color1: project?.project.customColour.bgColour1 || '',
                      color2: project?.project.customColour.bgColour2 || '',
                    },
                  }}
                  projectURL={`${APP_URL}/project/${project?.project.projectId}`}
                  nftValue={fundAmount}
                />
              </Tilt>
              {project?.project.projectName && (
                <p className="nft_info">
                  {`This is a unique design of ${project?.project.projectName} Shares NFT. When you get one,
              it will have all your investment details, like share price and ID.
              The NFT also has a one-of-a-kind barcode that links to the project on Crowdlaunch.`}
                </p>
              )}
            </div>
          </VotingWrapper>
        </TabContentLayout>
      </div>
    </MajorSection>
  );
};

export default MainProject;
