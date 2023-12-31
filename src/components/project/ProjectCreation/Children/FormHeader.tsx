import React, { useContext, useEffect, useState } from 'react';
import { FormHeaderNav } from '../ProjectCreationTemplateStyles';
import { campaignCategories } from '@/data/project/projectData';
import {
  ProjectCreactionContext,
  ProjectCreactionContextReturnTypes,
} from '../ProjectCreationContext';

const FormHeader = () => {
  const { activeTab, setActiveTab, formCompleted } = useContext(
    ProjectCreactionContext
  ) as ProjectCreactionContextReturnTypes;

  const handleClick = (tab: number) => {
    if (formCompleted) setActiveTab(tab);
  };

  return (
    <FormHeaderNav>
      {campaignCategories.map((category) => (
        <button
          key={category.id}
          className={activeTab === category.id ? 'active' : ''}
          onClick={() => handleClick(category.id)}
          role="tab"
          aria-selected={activeTab === category.id}
          tabIndex={activeTab === category.id ? 0 : -1}
        >
          {category.title}
        </button>
      ))}
    </FormHeaderNav>
  );
};

export default FormHeader;
