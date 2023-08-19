import React, { useState, useContext } from 'react';
import {
  ExploreContext,
  ExploreContextReturnTypes,
} from '@/contexts/ExploreContext';
import {
  FilterContainer,
  FilterItem,
  FilterItemShow,
  FilterItemHidden,
  FilterMenu,
} from './exploreFilterStyles';
import { filterToggleVariant } from '@/styles/animation/filterToggleVariant';
import { useBreakPointDown } from '@/hooks/useBreakPoint';
import { AnimatePresence } from 'framer-motion';
import { FaChevronDown } from 'react-icons/fa';
import RangeInput from '@/components/global/form/InputFields/rangeInput';
import SelectTags from '@/components/global/form/InputFields/selectTags';
import useGetCategories from '@/hooks/RequestHooks/GET/useGetCategories';
import { deepEqual } from '@/helpers/deepEqual';
import { initialExploreFilter } from '@/types/exploreTypes';

interface ExploreFilterTypes {
  filterToggle: boolean;
}

const filters = [
  {
    id: 1,
    title: 'Minimum Investment',
    inputType: 'field',
    query: 'minInvestment',
  },
  { id: 2, title: 'Amount Raised', inputType: 'field', query: 'amountRaised' },
  { id: 3, title: 'Target Amount', inputType: 'field', query: 'targetAmount' },
  { id: 4, title: 'Category', inputType: 'select', query: 'categoryId' },
  {
    id: 5,
    title: 'Number of Investors',
    inputType: 'field',
    query: 'noOfInvestors',
  },
  {
    id: 6,
    title: 'Investment Days Left',
    inputType: 'field',
    query: 'noOfDaysLeft',
  },
];

const ExploreFilter = ({ filterToggle }: ExploreFilterTypes) => {
  const { exploreFilter, setExploreFilter, handleClearFilter } = useContext(
    ExploreContext
  ) as ExploreContextReturnTypes;

  // Check if the filter has new values
  const isFilterEmpty = deepEqual(initialExploreFilter, exploreFilter);

  const { categories } = useGetCategories();
  const [toggleFilter, setToggleFilter] = useState<number | null>(null);

  const { breakPoint: switchToggleMode } = useBreakPointDown({
    breakMark: 798,
  });

  return (
    <AnimatePresence>
      <FilterContainer
        variants={filterToggleVariant(switchToggleMode)}
        initial="hidden"
        animate={filterToggle ? 'show' : 'hidden'}
        exit="exit"
      >
        {!isFilterEmpty && (
          <FilterMenu>
            <button className="clear_btn" onClick={handleClearFilter}>
              Clear Filter
            </button>
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
              {filter.inputType === 'select' && (
                <SelectTags
                  data={categories || []}
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
