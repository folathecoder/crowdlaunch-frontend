import React from 'react';
import styled, { css } from 'styled-components';
import { useRouter } from 'next/router';
import { BsCheck } from 'react-icons/bs';

interface ButtonStylesTypes {
  bgColor: string;
  borderColor: string;
}

export const ButtonContainer = styled.button<ButtonStylesTypes>`
  display: inline-flex;
  height: 40px;
  padding: 9px 9.703px 10px 13px;
  justify-content: flex-end;
  align-items: center;
  flex-shrink: 0;
  border-radius: 8px;
  color: var(--color-font-100);
  text-align: center;
  font-size: 14px;
  font-weight: 900;
  line-height: 40px;
  cursor: pointer;
  transition: 0.5s linear;
  position: relative;

  ${({ bgColor, borderColor }) =>
    bgColor &&
    borderColor &&
    css`
      border: 1px solid ${borderColor};
      background: ${bgColor};
    `}

  &:hover {
    opacity: 0.8;
    transition: 0.5s linear;
  }

  &:focus {
    outline: none;
  }

  div {
    position: absolute;
    background: hsla(218, 80%, 2%, 0.7);
    font-size: 2.2rem;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    border-radius: 8px;
  }
`;

interface ButtonTypes {
  buttonTitle: string;
  buttonType: 'link' | 'action';
  buttonLink?: string;
  buttonFunction?: () => void;
  bgColor: string;
  borderColor: string;
  checkable?: boolean;
}

const ColorButton = ({
  buttonTitle,
  buttonType,
  buttonLink,
  buttonFunction,
  bgColor,
  borderColor,
  checkable,
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
    <ButtonContainer
      onClick={handleButtonClick}
      type="button"
      role="button"
      bgColor={bgColor}
      borderColor={borderColor}
    >
      {buttonTitle}
      {checkable && (
        <div>
          <BsCheck />
        </div>
      )}
    </ButtonContainer>
  );
};

export default ColorButton;
