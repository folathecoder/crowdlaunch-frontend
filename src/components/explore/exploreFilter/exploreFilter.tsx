import React, { useState } from 'react';
import {
  FilterContainer,
  FilterItem,
  FilterItemShow,
  FilterItemHidden,
} from './exploreFilterStyles';
import { filterToggleVariant } from '@/styles/animation/filterToggleVariant';
import { useBreakPointDown } from '@/hooks/useBreakPoint';
import { AnimatePresence } from 'framer-motion';
import { FaChevronDown } from 'react-icons/fa';
import RangeInput from '@/components/global/form/InputFields/rangeInput';
import SelectTags from '@/components/global/form/InputFields/selectTags';
import useGetCategories from '@/hooks/RequestHooks/GET/useGetCategories';

interface ExploreFilterTypes {
  filterToggle: boolean;
}

const filters = [
  { id: 1, title: 'Minimum Investment', inputType: 'field' },
  { id: 2, title: 'Amount Raised', inputType: 'field' },
  { id: 3, title: 'Target Amount', inputType: 'field' },
  { id: 4, title: 'Category', inputType: 'select' },
  { id: 5, title: 'Number of Investors', inputType: 'field' },
  { id: 6, title: 'Investment Days Left', inputType: 'field' },
  { id: 7, title: 'Number of Likes', inputType: 'field' },
];

const ExploreFilter = ({ filterToggle }: ExploreFilterTypes) => {
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
        {filters.map((filter, index) => (
          <FilterItem
            key={filter.id}
            removeBorder={index === filters.length - 1}
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
                <RangeInput query={filter.title} />
              )}
              {filter.inputType === 'select' && (
                <SelectTags data={categories || []} />
              )}
            </FilterItemHidden>
          </FilterItem>
        ))}
      </FilterContainer>
    </AnimatePresence>
  );
};

export default ExploreFilter;
