import React, { ReactElement, ReactNode } from 'react';
import useGetProjectById from '@/hooks/RequestHooks/GET/useGetProjectById';
import { ProjectDetailType } from '@/types/projectTypes';
import { FetchingStatus } from '@/types/fetchingTypes';

export interface ProjectDetailContextReturnTypes {
  project: ProjectDetailType | null;
  fetchingStatus: FetchingStatus;
  error: string | null;
}

interface PropTypes {
  children: ReactNode;
  projectId: string;
}

export const ProjectDetailContext =
  React.createContext<ProjectDetailContextReturnTypes | null>(null);

const ProjectDetailProvider = ({
  children,
  projectId,
}: PropTypes): ReactElement => {
  const { project, fetchingStatus, error } = useGetProjectById({
    projectId: projectId,
  });

  return (
    <ProjectDetailContext.Provider value={{ project, fetchingStatus, error }}>
      {children}
    </ProjectDetailContext.Provider>
  );
};

export default ProjectDetailProvider;
