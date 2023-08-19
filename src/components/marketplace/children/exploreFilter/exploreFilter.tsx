import React, { useState, useContext } from 'react';
import {
  MarketplaceContextReturnTypes,
  MarketplaceContext,
} from '@/contexts/MarketplaceContext';
import {
  FilterContainer,
  FilterItem,
  FilterItemShow,
  FilterItemHidden,
  FilterMenu,
} from '@/components/explore/exploreFilter/exploreFilterStyles';
import { filterToggleVariant } from '@/styles/animation/filterToggleVariant';
import { useBreakPointDown } from '@/hooks/useBreakPoint';
import { AnimatePresence } from 'framer-motion';
import { FaChevronDown } from 'react-icons/fa';
import RangeInput from '@/components/marketplace/children/exploreFilter/rangeInput';
import SelectTags from '@/components/global/form/InputFields/selectTags';
import useGetCategories from '@/hooks/RequestHooks/GET/useGetCategories';
import { deepEqual } from '@/helpers/deepEqual';
import {
  ExploreFilterType,
  initialExploreFilter,
} from '@/types/marketplaceTypes';

interface ExploreFilterTypes {
  filterToggle: boolean;
}

const filters = [
  {
    id: 1,
    title: 'Price (ETH)',
    inputType: 'field',
    query: 'price',
  },
];

const ExploreFilter = ({ filterToggle }: ExploreFilterTypes) => {
  const { exploreFilter, setExploreFilter, handleClearFilter } = useContext(
    MarketplaceContext
  ) as MarketplaceContextReturnTypes;

  const [toggleFilter, setToggleFilter] = useState<number | null>(1);

  const { breakPoint: switchToggleMode } = useBreakPointDown({
    breakMark: 798,
  });

  // Check if the filter has new values
  const isFilterEmpty = deepEqual(initialExploreFilter, exploreFilter);

  return (
    <AnimatePresence>
      <FilterContainer
        variants={filterToggleVariant(switchToggleMode)}
        initial="hidden"
        animate={filterToggle ? 'show' : 'show'}
        exit="exit"
      >
        {!isFilterEmpty && (
          <FilterMenu>
            <FilterMenu>
              <button className="clear_btn" onClick={handleClearFilter}>
                Clear Filter
              </button>
            </FilterMenu>
          </FilterMenu>
        )}
        {filters.map((filter) => (
          <FilterItem
            key={filter.id}
            removeBorder={filter.id === filters.length}
          >
            <FilterItemShow
              onClick={() =>
                setToggleFilter(filter.id !== toggleFilter ? filter.id : null)
              }
            >
              <div>
                <p>{filter.title}</p>
              </div>
              <div>
                <button
                  className={
                    toggleFilter === filter.id ? 'rotate_start' : 'rotate_end'
                  }
                >
                  <FaChevronDown />
                </button>
              </div>
            </FilterItemShow>
            <FilterItemHidden
              variants={filterToggleVariant(true)}
              initial="hidden"
              animate={toggleFilter === filter.id ? 'show' : 'hidden'}
            >
              {filter.inputType === 'field' && (
                <RangeInput
                  query={filter.query}
                  setFilter={setExploreFilter}
                  filter={exploreFilter}
                />
              )}
            </FilterItemHidden>
          </FilterItem>
        ))}
      </FilterContainer>
    </AnimatePresence>
  );
};

export default ExploreFilter;
