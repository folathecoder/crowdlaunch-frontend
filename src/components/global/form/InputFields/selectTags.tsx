import React, { useState } from 'react';
import styled from 'styled-components';
import { CategoryType } from '@/types/projectTypes';
import { ExploreFilterType } from '@/types/exploreTypes';

interface PropType {
  data: CategoryType[] | null;
  filter: ExploreFilterType;
  setFilter: React.Dispatch<React.SetStateAction<ExploreFilterType>>;
}

export const Container = styled.div`
  padding: 0.5rem;
  gap: 1rem;

  button {
    border-radius: 1rem;
    padding: 0.2rem 0.5rem;
    border: 1px solid var(--color-border-100);
    margin: 0.1rem;
    background-color: var(--color-bg-300);
    color: var(--color-font-100);
    cursor: pointer;
  }

  .active {
    background-color: #c2177e3a;
    border: 1px solid var(--color-accent-100);
    color: var(--color-font-100);
  }
`;

const SelectTags = ({ data, filter, setFilter }: PropType) => {
  const selectTag = (id: string) => {
    setFilter((prevState) => ({
      ...prevState,
      categoryId: [...prevState.categoryId, id],
    }));
  };

  return (
    <Container>
      {data?.map((item) => (
        <button
          key={item.categoryId}
          className={
            filter.categoryId.some((category) => category === item.categoryId)
              ? 'active'
              : ''
          }
          id={item.categoryId}
          aria-pressed="false"
          onClick={() => selectTag(item.categoryId)}
        >
          <div>
            <p>{item.categoryName}</p>
          </div>
        </button>
      ))}
    </Container>
  );
};

export default SelectTags;
