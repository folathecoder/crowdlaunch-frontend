import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ExploreFilterType, RangeType } from '@/types/exploreTypes';
import { handleDecimals, sanitizeInputValue } from '@/helpers/inputChecks';

interface PropType {
  query: string;
  filter: ExploreFilterType;
  setFilter: React.Dispatch<React.SetStateAction<ExploreFilterType>>;
}

export const Container = styled.div`
  padding: 0.5rem;

  .input_container {
    display: flex;
    gap: 0.5rem;

    p {
      height: 100%;
      display: flex;
      align-items: center;
    }
  }
`;

const Input = styled.input`
  width: 7rem;
  height: 2.5rem;
  border-radius: 0.5rem;
  background-color: var(--color-bg-500);
  border: 0.1rem solid var(--color-border-100);
  color: white;
  padding: 0rem 0.5rem;

  &:hover {
    outline: none;
    border: 1px solid var(--color-accent-100);
  }

  &:active {
    outline: none;
    border: 1px solid var(--color-accent-200);
  }

  &:focus {
    outline: none;
    border: 1px solid var(--color-accent-300);
  }

  .error_input {
    color: var(--color-accent-400);
    border: 0.1rem solid var(--color-accent-400);
  }
`;

const ErrorContainer = styled.div`
  color: red;
  font-size: 12px;
`;

// Function to optimally update filter
type RangeKey = 'gt' | 'lt';

const updateFilter = (
  prevState: ExploreFilterType,
  query: keyof ExploreFilterType,
  numericValue: number,
  rangeKey: RangeKey
): ExploreFilterType => {
  if (typeof prevState[query] === 'object' && prevState[query] !== null) {
    return {
      ...prevState,
      [query]: {
        ...prevState[query],
        [rangeKey]: Number(numericValue),
      },
    };
  }
  return prevState;
};

function isRangeType(value: any): value is RangeType {
  return value && typeof value.gt === 'number' && typeof value.lt === 'number';
}

const RangeInput = ({ query, filter, setFilter }: PropType) => {
  const [value1, setValue1] = useState('');
  const [isError1, setIsError1] = useState(false);
  const [value2, setValue2] = useState('');
  const [isError2, setIsError2] = useState(false);
  const [errorMessage, setErrorMessage] = useState(
    'The minimum value cannot be equal to the maximum value'
  );

  const handleNumericChange =
    (rangeKey: RangeKey) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = event.target.value;
      // const numericValue = inputValue.replace(/[^-0-9.]/g, '');
      const numericValue = sanitizeInputValue(inputValue);
      setFilter((prevState) =>
        updateFilter(
          prevState,
          query as keyof ExploreFilterType,
          Number(numericValue),
          rangeKey
        )
      );

      if (rangeKey === 'gt') {
        setValue1(numericValue);
      } else if (rangeKey === 'lt') {
        setValue2(numericValue);
      }
    };

  const handleGteChange = handleNumericChange('gt');
  const handleLtChange = handleNumericChange('lt');

  // Trigger error based on checks and inputs
  useEffect(() => {
    if (value1 !== '' && value2 !== '') {
      if (Number(value1) === Number(value2)) {
        setIsError1(true);
        setIsError2(true);
        setErrorMessage(
          'The minimum value cannot be equal to the maximum value'
        );
      } else if (Number(value1) > Number(value2)) {
        setIsError1(true);
        setIsError2(true);
        setErrorMessage(
          'The minimum value must be less than the maximum value'
        );
      } else {
        setIsError1(false);
        setIsError2(false);
        setErrorMessage('');
      }
    } else {
      setIsError1(false);
      setIsError2(false);
      setErrorMessage('');
    }
  }, [value1, value2]);

  return (
    <Container>
      <div className="input_container">
        <div>
          <Input
            type="number"
            value={(
              filter[query as keyof ExploreFilterType] as RangeType
            ).gt.toString()}
            onChange={handleGteChange}
            placeholder="0"
            className={isError1 ? 'error_input' : ''}
            name="gt"
          />
        </div>
        <div className="input_range">
          <p>to</p>
        </div>
        <div>
          <Input
            type="number"
            value={(
              filter[query as keyof ExploreFilterType] as RangeType
            ).lt.toString()}
            onChange={handleLtChange}
            placeholder="0"
            className={isError2 ? 'error_input' : ''}
            name="lt"
          />
        </div>
      </div>
      <div>
        <ErrorContainer>{errorMessage}</ErrorContainer>
      </div>
    </Container>
  );
};

export default RangeInput;
