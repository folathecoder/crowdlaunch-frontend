import React, { ReactElement, ReactNode, useState, useEffect } from 'react';
import useGetProjectById from '@/hooks/RequestHooks/GET/useGetProjectById';
import { ProjectDetailType } from '@/types/projectTypes';
import { FetchingStatus } from '@/types/fetchingTypes';
import usePostAuth from '@/hooks/RequestHooks/POST/usePostAuth';
import useGetUserByAddress from '@/hooks/RequestHooks/GET/useGetUserByAddress';
import useWallet from '@/wallet/useWallet';

export interface ProjectDetailContextReturnTypes {
  project: ProjectDetailType | null;
  fetchingStatus: FetchingStatus;
  error: string | null;
  isProjectCreator: boolean;
  refetch: () => void;
  projectId: string;
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
  const { wallet } = useWallet();
  const { userData } = usePostAuth();
  const { user } = useGetUserByAddress({
    jwtToken: userData?.token,
  });
  const { project, fetchingStatus, error, refetch } = useGetProjectById({
    projectId: projectId,
  });

  const [isProjectCreator, setIsProjectCreator] = useState(false);

  useEffect(() => {
    setIsProjectCreator(
      user?.user.userId === project?.project.userId &&
        wallet.walletStatus.isConnected
    );
  }, [
    user?.user.userId,
    project?.project.userId,
    wallet.walletStatus.isConnected,
  ]);

  return (
    <ProjectDetailContext.Provider
      value={{
        project,
        fetchingStatus,
        error,
        isProjectCreator,
        refetch,
        projectId,
      }}
    >
      {children}
    </ProjectDetailContext.Provider>
  );
};

export default ProjectDetailProvider;
