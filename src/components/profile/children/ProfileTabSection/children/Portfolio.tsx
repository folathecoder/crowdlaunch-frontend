import React, { useContext } from 'react';
import {
  ProfileContext,
  ProfileReturnTypes,
} from '@/components/profile/context/ProfileContext';
import { PortfolioSection } from '@/components/profile/children/ProfileTabSection/ProfileTabSectionStyles';
import { PortfolioCard } from '@/components/explore';

const Portfolio = () => {
  const { user } = useContext(ProfileContext) as ProfileReturnTypes;
  const { portfolios } = user || {};

  return (
    <PortfolioSection>
      <div className="portfolio-cards">
        {portfolios?.map((portfolio) => (
          <PortfolioCard
            key={portfolio.projectId}
            projectId={portfolio.projectId}
          />
        ))}
      </div>
    </PortfolioSection>
  );
};

export default Portfolio;
