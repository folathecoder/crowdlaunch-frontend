import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';

interface FilterType {
  field: string;
  gte: number;
  lt: number;
}

interface PropType {
  query: string;
}

export const Container = styled.div`
  padding: 0.5rem;

  .input_container {
    display: flex;
    gap: 0.5rem;

    input {
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
    }

    p {
      height: 100%;
      display: flex;
      align-items: center;
    }
  }
`;

const ErrorContainer = styled.div`
  color: red;
  font-size: 12px;
`;

const RangeInput = ({ query }: PropType) => {
  const [value1, setValue1] = useState('');
  const [isError1, setIsError1] = useState(false);
  const [value2, setValue2] = useState('');
  const [isError2, setIsError2] = useState(false);
  const [errorMessage, setErrorMessage] = useState(
    'The minimum value cannot be equal to the maximum value'
  );
  const [filterItem, setFilterItem] = useState<FilterType>({
    field: query,
    gte: 0,
    lt: 0,
  });

  const handleGteChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    const numericValue = inputValue.replace(/[^-0-9.]/g, '');
    setValue1(numericValue);

    setFilterItem((prevFilterItem) => ({
      ...prevFilterItem,
      field: query,

      gte: Number(numericValue),
      lt: Number(value2),
    }));
  };

  const handleLtChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    const numericValue = inputValue.replace(/[^-0-9.]/g, '');
    setValue2(numericValue);

    setFilterItem((prevFilterItem) => ({
      ...prevFilterItem,
      field: query,
      gte: Number(value1),
      lt: Number(numericValue),
    }));
  };

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
          <input
            type="text"
            value={value1}
            onChange={handleGteChange}
            placeholder=""
            // error={isError1}
            // isValuePresent={value1 !== ''}
          />
        </div>
        <div className="input_range">
          <p>to</p>
        </div>
        <div>
          <input
            type="text"
            value={value2}
            onChange={handleLtChange}
            placeholder=""
            // error={isError2}
            // isValuePresent={value2 !== ''}
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
