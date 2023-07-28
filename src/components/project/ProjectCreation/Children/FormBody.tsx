import React, { useState, useContext } from 'react';
import {
  ProjectCreactionContext,
  ProjectCreactionContextReturnTypes,
} from '../ProjectCreationContext';
import { FormBodyContainer } from '../ProjectCreationTemplateStyles';
import {
  OverviewTab,
  CompetitorTab,
  StrategyTab,
  DividendTab,
  PerformanceTab,
  FinancialTab,
  RiskTab,
  ProjectCreatorTab,
  NFTCreatorTab,
} from './FormBodyTabs';

const FormBody = () => {
  const { activeTab } = useContext(
    ProjectCreactionContext
  ) as ProjectCreactionContextReturnTypes;

  const [tabPanels] = useState<React.ReactNode[]>([
    <OverviewTab key="overview" />,
    <CompetitorTab key="competitor" />,
    <StrategyTab key="strategy" />,
    <FinancialTab key="financial" />,
    <DividendTab key="dividend" />,
    <PerformanceTab key="performance" />,
    <RiskTab key="risk" />,
    <NFTCreatorTab key="creator" />,
    <ProjectCreatorTab key="project" />,
  ]);

  return <FormBodyContainer>{tabPanels[activeTab]}</FormBodyContainer>;
};

export default FormBody;
