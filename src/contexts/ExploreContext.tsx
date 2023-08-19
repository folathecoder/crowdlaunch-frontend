import React, { ReactElement, ReactNode, useState, useEffect } from 'react';
import { FetchingStatus } from '@/types/fetchingTypes';
import useGetProjects from '@/hooks/RequestHooks/GET/useGetProjects';
import { ProjectType } from '@/types/projectTypes';
import { ExploreFilterType, initialExploreFilter } from '@/types/exploreTypes';

export interface ExploreContextReturnTypes {
  filteredProjects: ProjectType[] | null;
  fetchingStatus: FetchingStatus;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  exploreFilter: ExploreFilterType;
  setExploreFilter: React.Dispatch<React.SetStateAction<ExploreFilterType>>;
  handleClearFilter: () => void;
}

interface PropTypes {
  children: ReactNode;
}

export const ExploreContext =
  React.createContext<ExploreContextReturnTypes | null>(null);

const ExploreProvider = ({ children }: PropTypes): ReactElement => {
  const { projects, fetchingStatus } = useGetProjects();
  const [searchTerm, setSearchTerm] = useState('');

  // Initialize exploreFilter state from localStorage or use initialExploreFilter
  const [exploreFilter, setExploreFilter] = useState<ExploreFilterType>(() => {
    try {
      const storedValue = localStorage.getItem('exploreFilter');
      return storedValue ? JSON.parse(storedValue) : initialExploreFilter;
    } catch {
      return initialExploreFilter;
    }
  });

  const sortProjectsByName = (projects: ProjectType[]): ProjectType[] | [] => {
    return projects.sort((a, b) => a.projectName.localeCompare(b.projectName));
  };

  const filteredProjects = sortProjectsByName(projects || []).filter(
    (project) =>
      project.projectName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    if (exploreFilter) {
      localStorage.setItem('exploreFilter', JSON.stringify(exploreFilter));
    }
  }, [exploreFilter]);

  // Function that clears the filter and sets it to initial state
  const handleClearFilter = () => {
    setExploreFilter(initialExploreFilter);
  };

  return (
    <ExploreContext.Provider
      value={{
        filteredProjects,
        fetchingStatus,
        searchTerm,
        setSearchTerm,
        exploreFilter,
        setExploreFilter,
        handleClearFilter,
      }}
    >
      {children}
    </ExploreContext.Provider>
  );
};

export default ExploreProvider;
