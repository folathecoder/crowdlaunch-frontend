import React, { ReactElement, ReactNode, useState, useEffect } from 'react';
import { FetchingStatus } from '@/types/fetchingTypes';
import {
  ExploreFilterType,
  initialExploreFilter,
} from '@/types/marketplaceTypes';
import { useRouter } from 'next/router';
import useGetNfts from '@/hooks/RequestHooks/GET/useGetNfts';
import { NftMainType } from '@/types/projectTypes';

export interface MarketplaceContextReturnTypes {
  nfts: NftMainType[] | null;
  filteredNfts: NftMainType[] | [];
  fetchingStatus: FetchingStatus;
  exploreFilter: ExploreFilterType;
  setExploreFilter: React.Dispatch<React.SetStateAction<ExploreFilterType>>;
  handleClearFilter: () => void;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

interface PropTypes {
  children: ReactNode;
}

export const MarketplaceContext =
  React.createContext<MarketplaceContextReturnTypes | null>(null);

const MarketplaceProvider = ({ children }: PropTypes): ReactElement => {
  const router = useRouter();
  const { nfts, fetchingStatus } = useGetNfts();
  const [searchTerm, setSearchTerm] = useState('');

  const [exploreFilter, setExploreFilter] = useState<ExploreFilterType>(() => {
    try {
      const storedValue = localStorage.getItem('marketplaceFilter');
      return storedValue ? JSON.parse(storedValue) : initialExploreFilter;
    } catch {
      return initialExploreFilter;
    }
  });

  useEffect(() => {
    if (exploreFilter) {
      localStorage.setItem('marketplaceFilter', JSON.stringify(exploreFilter));
    }
  }, [exploreFilter]);

  // Function that clears the filter and sets it to initial state
  const handleClearFilter = () => {
    setExploreFilter(initialExploreFilter);
  };

  useEffect(() => {
    const query: Record<string, any> = {};

    // For price filter:
    if (
      exploreFilter.price.min !== initialExploreFilter.price.min &&
      exploreFilter.price.min < exploreFilter.price.max
    ) {
      query.priceMin = exploreFilter.price.min;
    }
    if (
      exploreFilter.price.max !== initialExploreFilter.price.max &&
      exploreFilter.price.max > exploreFilter.price.min
    ) {
      query.priceMax = exploreFilter.price.max;
    }

    // Since 'ascending' is always set to false
    query.ascending = false;

    router.push({
      pathname: router.pathname,
      query,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exploreFilter]);

  const sortNftsByName = (nfts: NftMainType[]): NftMainType[] | [] => {
    return nfts.sort((a, b) => a.nftName?.localeCompare(b.nftName));
  };

  const filteredNfts = sortNftsByName(nfts || []).filter((project) =>
    project.nftName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <MarketplaceContext.Provider
      value={{
        nfts,
        filteredNfts,
        fetchingStatus,
        exploreFilter,
        setExploreFilter,
        handleClearFilter,
        searchTerm,
        setSearchTerm,
      }}
    >
      {children}
    </MarketplaceContext.Provider>
  );
};

export default MarketplaceProvider;
