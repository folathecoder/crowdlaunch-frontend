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

interface ExploreFilterTypes {
  filterToggle: boolean;
  setFilterToggle: (value: boolean) => void;
}

const ExploreFilter = ({
  filterToggle,
  setFilterToggle,
}: ExploreFilterTypes) => {
  const [activeFilter, setActiveFilter] = useState(0);
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
        {[1, 2, 3, 4, 5].map((item) => (
          <FilterItem key={item} removeBorder={item === 5}>
            <FilterItemShow>
              {/* <p>Filter by Category</p> */}
            </FilterItemShow>
            {/* <FilterItemHidden>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Praesentium sunt repellat ut facere ab. Nisi ullam expedita
              corporis nam quisquam dolores necessitatibus. Aliquid iste debitis
              aspernatur laboriosam libero cupiditate eaque.
            </FilterItemHidden> */}
          </FilterItem>
        ))}
      </FilterContainer>
    </AnimatePresence>
  );
};

export default ExploreFilter;
