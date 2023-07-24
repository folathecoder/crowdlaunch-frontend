import React from 'react';
import { ProjectSection } from './ProjectCreationTemplateStyles';
import { FormHeader, FormBody } from '@/components/project/ProjectCreation';

const ProjectCreationTemplate = () => {
  return (
    <main>
      <ProjectSection>
        <FormHeader />
        <FormBody />
      </ProjectSection>
    </main>
  );
};

export default ProjectCreationTemplate;
