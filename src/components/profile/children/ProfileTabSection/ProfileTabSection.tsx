import React, { useState, useEffect } from 'react';
import {
  TabContainer,
  TabInner,
  TabHeader,
  TabButton,
} from './ProfileTabSectionStyles';
import {
  Portfolio,
  NFTCollection,
  ListedProjects,
  Watchlist,
  Order,
} from './children';

const tabs = [
  {
    id: 'portfolio',
    title: 'Portfolio',
    content: <Portfolio />,
  },
  {
    id: 'nfts',
    title: 'Collected NFTs',
    content: <NFTCollection />,
  },
  {
    id: 'listed-projects',
    title: 'Listed Projects',
    content: <ListedProjects />,
  },
  {
    id: 'watchlist',
    title: 'Watchlist',
    content: <Watchlist />,
  },
  {
    id: 'orders',
    title: 'Orders',
    content: <Order />,
  },
];

type Tab = {
  id: string;
  title: string;
  content: string;
};

const ProfileTabSection = () => {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  useEffect(() => {
    const handleHashChange = () => {
      const tabId = window.location.hash.substring(1);
      setActiveTab(tabId || tabs[0].id);
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    window.location.hash = tabId;
  };

  return (
    <TabContainer>
      <TabInner>
        <div>
          <TabHeader role="tablist" aria-label="Tabs">
            {tabs.map((tab) => (
              <TabButton
                key={tab.id}
                role="tab"
                aria-selected={tab.id === activeTab ? 'true' : 'false'}
                onClick={() => handleTabClick(tab.id)}
                activeTab={tab.id === activeTab}
              >
                {tab.title}
              </TabButton>
            ))}
          </TabHeader>
          <div>
            {tabs.map((tab) => (
              <div
                key={tab.id}
                role="tabpanel"
                aria-labelledby={tab.id}
                hidden={tab.id !== activeTab}
              >
                {tab.content}
              </div>
            ))}
          </div>
        </div>
      </TabInner>
    </TabContainer>
  );
};

export default ProfileTabSection;
