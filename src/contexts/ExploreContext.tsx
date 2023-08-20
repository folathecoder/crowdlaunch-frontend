import React, { ReactElement, ReactNode, useState, useEffect } from 'react';
import { FetchingStatus } from '@/types/fetchingTypes';
import useGetProjects from '@/hooks/RequestHooks/GET/useGetProjects';
import { ProjectType } from '@/types/projectTypes';
import { ExploreFilterType, initialExploreFilter } from '@/types/exploreTypes';
import { useRouter } from 'next/router';

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

  const router = useRouter();

  useEffect(() => {
    const query: Record<string, any> = {};

    // For boolean and other values:
    if (exploreFilter.newest !== initialExploreFilter.newest) {
      query.newest = exploreFilter.newest;
    }
    if (exploreFilter.trending !== initialExploreFilter.trending) {
      query.trending = exploreFilter.trending;
    }
    if (exploreFilter.active !== initialExploreFilter.active) {
      query.active = exploreFilter.active;
    }
    if (exploreFilter.mostLiked !== initialExploreFilter.mostLiked) {
      query.mostLiked = exploreFilter.mostLiked;
    }

    // For minInvestment:
    if (
      exploreFilter.minInvestment.gt !==
        initialExploreFilter.minInvestment.gt &&
      exploreFilter.minInvestment.gt < exploreFilter.minInvestment.lt
    ) {
      query.minInvestmentMin = exploreFilter.minInvestment.gt;
    }
    if (
      exploreFilter.minInvestment.lt !==
        initialExploreFilter.minInvestment.lt &&
      exploreFilter.minInvestment.gt < exploreFilter.minInvestment.lt
    ) {
      query.minInvestmentMax = exploreFilter.minInvestment.lt;
    }
    // For amountRaised:
    if (
      exploreFilter.amountRaised.gt !== initialExploreFilter.amountRaised.gt &&
      exploreFilter.amountRaised.gt < exploreFilter.amountRaised.lt
    ) {
      query.amountRaisedMin = exploreFilter.amountRaised.gt;
    }
    if (
      exploreFilter.amountRaised.lt !== initialExploreFilter.amountRaised.lt &&
      exploreFilter.amountRaised.gt < exploreFilter.amountRaised.lt
    ) {
      query.amountRaisedMax = exploreFilter.amountRaised.lt;
    }

    // For targetAmount:
    if (
      exploreFilter.targetAmount.gt !== initialExploreFilter.targetAmount.gt &&
      exploreFilter.targetAmount.gt < exploreFilter.targetAmount.lt
    ) {
      query.targetAmountMin = exploreFilter.targetAmount.gt;
    }
    if (
      exploreFilter.targetAmount.lt !== initialExploreFilter.targetAmount.lt &&
      exploreFilter.targetAmount.gt < exploreFilter.targetAmount.lt
    ) {
      query.targetAmountMax = exploreFilter.targetAmount.lt;
    }

    // For noOfInvestors:
    if (
      exploreFilter.noOfInvestors.gt !==
        initialExploreFilter.noOfInvestors.gt &&
      exploreFilter.noOfInvestors.gt < exploreFilter.noOfInvestors.lt
    ) {
      query.noOfInvestorsMin = exploreFilter.noOfInvestors.gt;
    }
    if (
      exploreFilter.noOfInvestors.lt !==
        initialExploreFilter.noOfInvestors.lt &&
      exploreFilter.noOfInvestors.gt < exploreFilter.noOfInvestors.lt
    ) {
      query.noOfInvestorsMax = exploreFilter.noOfInvestors.lt;
    }

    // For noOfDaysLeft:
    if (
      exploreFilter.noOfDaysLeft.gt !== initialExploreFilter.noOfDaysLeft.gt &&
      exploreFilter.noOfDaysLeft.gt < exploreFilter.noOfDaysLeft.lt
    ) {
      query.noOfDaysLeftMin = exploreFilter.noOfDaysLeft.gt;
    }
    if (
      exploreFilter.noOfDaysLeft.lt !== initialExploreFilter.noOfDaysLeft.lt &&
      exploreFilter.noOfDaysLeft.gt < exploreFilter.noOfDaysLeft.lt
    ) {
      query.noOfDaysLeftMax = exploreFilter.noOfDaysLeft.lt;
    }

    // For CategoryId

    if (exploreFilter.categoryId.length > 0) {
      for (let i = 0; i < exploreFilter.categoryId.length; i++) {
        query.categoryIds = exploreFilter.categoryId[i];
      }
    }

    // Since 'ascending' is always set to false
    query.ascending = false;

    router.push({
      pathname: router.pathname,
      query,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exploreFilter]);

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
