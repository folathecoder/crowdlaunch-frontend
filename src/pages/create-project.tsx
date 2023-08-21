import React from 'react';
import withAuth from '@/auth/withAuth';
import { ProjectCreationTemplate } from '@/components/project/ProjectCreation';
import MetaData from '@/seo/metaData';

const CreateProject = () => {
  return (
    <>
      <MetaData
        title="Create Project"
        description="Unlock a global network of investors and empower your startup to soar."
      />
      <ProjectCreationTemplate />
    </>
  );
};

export default withAuth(CreateProject);
