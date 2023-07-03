import React from 'react';
import styled, { css } from 'styled-components';

interface CategoryTagTypes {
  title?: string;
  small?: boolean;
}

const Container = styled.div<CategoryTagTypes>`
  background-color: var(--color-font-100);
  color: var(--color-font-500);
  display: inline-flex;
  padding: 0px 0.5rem;
  border-radius: 100px;
  height: 1.37rem;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  line-height: 0rem;
  font-weight: 500;
  margin-right: 4px;

  ${({ small }) =>
    small &&
    css`
      height: 1.25rem;
      font-size: 0.75rem;
    `}
`;

const CatgoryTag = ({ title, small }: CategoryTagTypes) => {
  return <Container small={small}>{title}</Container>;
};

export default CatgoryTag;
