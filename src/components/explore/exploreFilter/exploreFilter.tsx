import React from 'react';
import { FilterContainer } from './exploreFilterStyles';
import { filterToggleVariant } from '@/styles/animation/filterToggleVariant';
import { useBreakPointDown } from '@/hooks/useBreakPoint';
import { AnimatePresence } from 'framer-motion';

interface ExploreFilterTypes {
  filterToggle: boolean;
  setFilterToggle: (value: boolean) => void;
}

const ExploreFilter = ({
  filterToggle,
  setFilterToggle,
}: ExploreFilterTypes) => {
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
        <div></div>
      </FilterContainer>
    </AnimatePresence>
  );
};

export default ExploreFilter;
