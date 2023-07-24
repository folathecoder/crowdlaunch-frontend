import React from 'react';
import { ProjectSection } from './ProjectCreationTemplateStyles';
import { FormHeader, FormBody } from '@/components/project/ProjectCreation';
import ProjectCreactionProvider from './ProjectCreationContext';

const ProjectCreationTemplate = () => {
  return (
    <main>
      <ProjectCreactionProvider>
        <ProjectSection>
          <FormHeader />
          <FormBody />
        </ProjectSection>
      </ProjectCreactionProvider>
    </main>
  );
};

export default ProjectCreationTemplate;
