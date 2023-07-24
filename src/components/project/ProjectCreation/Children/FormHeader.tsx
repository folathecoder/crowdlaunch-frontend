import React, { useState } from 'react';
import { FormHeaderNav } from '../ProjectCreationTemplateStyles';
import { campaignCategories } from '@/data/project/projectData';

const FormHeader = () => {
  const [activeTab, setActiveTab] = useState('Overview');

  const handleClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <FormHeaderNav>
      {campaignCategories.map((category) => (
        <button
          key={category.id}
          className={activeTab === category.title ? 'active' : ''}
          onClick={() => handleClick(category.title)}
          role="tab"
          aria-selected={activeTab === category.title}
          tabIndex={activeTab === category.title ? 0 : -1}
        >
          {category.title}
        </button>
      ))}
    </FormHeaderNav>
  );
};

export default FormHeader;
