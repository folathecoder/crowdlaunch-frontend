import React, { useContext } from 'react';
import Link from 'next/link';
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
      {listedProjects && listedProjects.length > 0 ? (
        <div className="portfolio-cards">
          {listedProjects?.map((portfolio) => (
            <PortfolioCard
              key={portfolio.projectId}
              projectId={portfolio.projectId}
            />
          ))}
        </div>
      ) : (
        <p className="empty_message">
          You do not have listed projects,{' '}
          <Link href="/create-project">create a project.</Link>
        </p>
      )}
    </PortfolioSection>
  );
};

export default ListedProjects;
