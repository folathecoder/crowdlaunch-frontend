import React, { ReactElement, ReactNode, useState } from 'react';
import { FetchingStatus } from '@/types/fetchingTypes';
import useGetProjects from '@/hooks/RequestHooks/GET/useGetProjects';
import { ProjectType } from '@/types/projectTypes';

export interface ExploreContextReturnTypes {
  filteredProjects: ProjectType[] | null;
  fetchingStatus: FetchingStatus;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

interface PropTypes {
  children: ReactNode;
}

// Create ExploreContext with initial value set to null
export const ExploreContext =
  React.createContext<ExploreContextReturnTypes | null>(null);

const ExploreProvider = ({ children }: PropTypes): ReactElement => {
  const { projects, fetchingStatus } = useGetProjects();
  const [searchTerm, setSearchTerm] = useState('');

  // Function to sort projects by name
  const sortProjectsByName = (projects: ProjectType[]): ProjectType[] | [] => {
    return projects.sort((a, b) => a.projectName.localeCompare(b.projectName));
  };

  // Compute filtered projects based on search term
  const filteredProjects = sortProjectsByName(projects || []).filter(
    (project) =>
      project.projectName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <ExploreContext.Provider
      value={{
        filteredProjects,
        fetchingStatus,
        searchTerm,
        setSearchTerm,
      }}
    >
      {children}
    </ExploreContext.Provider>
  );
};

export default ExploreProvider;
