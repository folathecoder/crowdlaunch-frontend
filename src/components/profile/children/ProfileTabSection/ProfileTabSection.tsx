import React, { useState, useEffect } from 'react';
import {
  TabContainer,
  TabInner,
  TabHeader,
  TabButton,
} from './ProfileTabSectionStyles';

const tabs = [
  {
    id: 'portfolio',
    title: 'Portfolio',
    content: 'All projects invested and status, with yield report',
  },
  {
    id: 'nfts',
    title: 'Collected NFTs',
    content: 'All NFT collections and status',
  },
  {
    id: 'listed-projects',
    title: 'Listed Projects',
    content: 'Your personal listed projects for crowdfunding',
  },
  {
    id: 'watchlist',
    title: 'Watchlist',
    content: 'All projects and NFTs you have liked',
  },
  {
    id: 'orders',
    title: 'Orders',
    content: 'All filled and pending orders',
  },
];

type Tab = {
  id: string;
  title: string;
  content: string;
};

type TabsProps = {
  tabs: Tab[];
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
