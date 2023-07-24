import React from 'react';
import ProjectHeader from './Children/ProjectHeader/ProjectHeader';
import MainProject from './Children/MainProject/MainProject';

const ProjectPageTemplate = () => {
  return (
    <main>
      <ProjectHeader />
      <MainProject />
    </main>
  );
};

export default ProjectPageTemplate;
