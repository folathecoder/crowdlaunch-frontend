import React from 'react';
import { PortfolioSection } from '@/components/profile/children/ProfileTabSection/ProfileTabSectionStyles';
import { ProjectCard } from '@/components/explore';

const Portfolio = () => {
  return (
    <PortfolioSection>
      <div className="portfolio-header">
        <p>Active Investments: 4 projects</p>
      </div>
      <div className="portfolio-cards">
        {/* {[1, 2, 3, 4].map((item) => (
          <ProjectCard key={item} />
        ))} */}
      </div>
    </PortfolioSection>
  );
};

export default Portfolio;
