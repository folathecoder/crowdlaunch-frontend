import React, { useContext } from 'react';
import {
  ProfileContext,
  ProfileReturnTypes,
} from '@/components/profile/context/ProfileContext';
import { PortfolioSection } from '@/components/profile/children/ProfileTabSection/ProfileTabSectionStyles';
import { PortfolioCard } from '@/components/explore';

const ListedProjects = () => {
  const { user } = useContext(ProfileContext) as ProfileReturnTypes;
  const { listedProjects } = user || {};

  return (
    <PortfolioSection>
      <div className="portfolio-cards">
        {listedProjects?.map((portfolio) => (
          <PortfolioCard
            key={portfolio.projectId}
            projectId={portfolio.projectId}
          />
        ))}
      </div>
    </PortfolioSection>
  );
};

export default ListedProjects;
