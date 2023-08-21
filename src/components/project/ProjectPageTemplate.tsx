import React, { useContext } from 'react';
import {
  ProjectDetailContext,
  ProjectDetailContextReturnTypes,
} from '@/contexts/ProjectDetailContext';
import ProjectHeader from './Children/ProjectHeader/ProjectHeader';
import MainProject from './Children/MainProject/MainProject';
import MetaData from '@/seo/metaData';

const ProjectPageTemplate = () => {
  const { project } = useContext(
    ProjectDetailContext
  ) as ProjectDetailContextReturnTypes;
  return (
    <>
      <MetaData
        title={project?.project.projectName || ''}
        description={project?.projectDetails.overview || ''}
      />
      <main>
        <ProjectHeader />
        <MainProject />
      </main>
    </>
  );
};

export default ProjectPageTemplate;
