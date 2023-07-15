import React, { useState } from 'react';
import Link from 'next/link';
import Campaign from '../MiniChildren/Campaign/Campaign';
import FaqMini from '../MiniChildren/Faq/FaqMini';
import Updates from '../MiniChildren/Updates/Updates';
import Reviews from '../MiniChildren/Reviews/Reviews';

import {
  MajorSection,
  TabsContainer,
  TabsWrapper,
  ActiveTab,
  TabContentsWrapper,
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
                    {data.value && <span>{data.value}</span>}
                  </ActiveTab>
                );
              })}
            </ul>
            <Link href="/explore" className="gradient-link">
              Explore NFTs
            </Link>
          </TabsContainer>
        </TabsWrapper>
        <TabContentsWrapper>{contents[activeContent]}</TabContentsWrapper>
      </div>
    </MajorSection>
  );
};

export default MainProject;
