import React, { useContext, useState } from 'react';
import {
  ProjectDetailContext,
  ProjectDetailContextReturnTypes,
} from '@/contexts/ProjectDetailContext';
import Link from 'next/link';
import Campaign from '../MiniChildren/Campaign/Campaign';
import Updates from '../MiniChildren/Updates/Updates';
import { VoteProject } from '@/components/project';
import {
  votingData,
  votingData2,
} from '@/components/project/Children/VoteProject/VoteProject';
import {
  MajorSection,
  TabsContainer,
  TabsWrapper,
  ActiveTab,
  TabContentsWrapper,
  TabContentLayout,
  VotingWrapper,
} from './MainProjectStyles';

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
];

const MainProject: React.FC = () => {
  const { project, updateCount } = useContext(
    ProjectDetailContext
  ) as ProjectDetailContextReturnTypes;

  const [contents, setContents] = useState<React.ReactNode[]>([
    <Campaign key="campaign" />,
    <Updates key="updates" />,
  ]);

  const [activeContent, setActiveContent] = useState<number>(0);

  const handleActive = (active: number) => {
    setActiveContent(active);
  };

  return (
    <MajorSection>
      <div>
        <TabsWrapper>
          <TabsContainer>
            <ul>
              {internalLinkData.map((data, index) => {
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
              <VoteProject {...votingData} />
              <VoteProject {...votingData2} />
            </div>
          </VotingWrapper>
        </TabContentLayout>
      </div>
    </MajorSection>
  );
};

export default MainProject;
