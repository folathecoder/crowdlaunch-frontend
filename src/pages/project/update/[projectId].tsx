import React from 'react';
import withAuth from '@/auth/withAuth';
import { ProjectCreationTemplate } from '@/components/project/ProjectCreation';

const UpdateProject = () => {
  return <ProjectCreationTemplate />;
};

export default withAuth(UpdateProject);
