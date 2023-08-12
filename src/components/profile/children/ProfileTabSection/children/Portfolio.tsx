import React, { useContext } from 'react';
import Link from 'next/link';
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
      {portfolios && portfolios.length > 0 ? (
        <div className="portfolio-cards">
          {portfolios?.map((portfolio) => (
            <PortfolioCard
              key={portfolio.projectId}
              projectId={portfolio.projectId}
            />
          ))}
        </div>
      ) : (
        <p className="empty_message">
          You do not have listed projects,{' '}
          <Link href="/explore">explore projects.</Link>
        </p>
      )}
    </PortfolioSection>
  );
};

export default Portfolio;
