import React from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { QUERIES } from '@/styles/mediaQueries';

export const ButtonContainer = styled.button`
  display: inline-flex;
  height: 35px;
  padding: 9px 9.703px 10px 13px;
  justify-content: flex-end;
  align-items: center;
  flex-shrink: 0;
  border-radius: 12px;
  border: 1px solid var(--color-bg-400);
  background: var(--color-bg-400);
  color: var(--color-font-400);
  text-align: center;
  font-size: 14px;
  font-family: Inter;
  font-style: normal;
  font-weight: 900;
  line-height: 40px;
  cursor: pointer;
  transition: 0.5s linear;

  &:hover {
    opacity: 0.8;
    transition: 0.5s linear;
  }

  &:focus {
    outline: none;
  }

  @media ${QUERIES.mobile} {
    height: 40px;
    padding: 11px 12.703px 12px 17px;
  }
`;

interface ButtonTypes {
  buttonTitle: string;
  buttonType: 'link' | 'action';
  buttonLink?: string;
  buttonFunction?: () => void;
}

const Button = ({
  buttonTitle,
  buttonType,
  buttonLink,
  buttonFunction,
}: ButtonTypes) => {
  const router = useRouter();

  const handleButtonClick = () => {
    if (buttonType === 'link' && buttonLink) {
      router.push(buttonLink);
    } else if (buttonType === 'action' && buttonFunction) {
      buttonFunction();
    }
  };

  return (
    <ButtonContainer onClick={handleButtonClick} type="button" role="button">
      {buttonTitle}
    </ButtonContainer>
  );
};

export default Button;
