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
  padding: 0px 8px;
  border-radius: 100px;
  height: 22px;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  line-height: 0px;
  font-weight: 500;
  margin-right: 4px;

  ${({ small }) =>
    small &&
    css`
      height: 20px;
      font-size: 12px;
    `}
`;

const CatgoryTag = ({ title, small }: CategoryTagTypes) => {
  return <Container small={small}>{title}</Container>;
};

export default CatgoryTag;
