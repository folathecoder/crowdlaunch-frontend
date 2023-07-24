import React, { useState } from 'react';
import { FormBodyContainer } from '../ProjectCreationTemplateStyles';
import { OverviewTab } from './FormBodyTabs';

const FormBody = () => {
  const [tabPanels] = useState<React.ReactNode[]>([
    <OverviewTab key="overview" />,
  ]);
  const [activeTab, setActiveTab] = useState<number>(0);

  return <FormBodyContainer>{tabPanels[activeTab]}</FormBodyContainer>;
};

export default FormBody;
