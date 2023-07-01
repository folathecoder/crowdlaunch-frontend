import React from 'react';
import { BsHandbag } from 'react-icons/bs';
import styled, { css } from 'styled-components';

export const Button = styled.button`
  background: transparent;
  color: var(--color-font-100);
  cursor: pointer;
  border: none;
  position: relative;

  div {
    position: absolute;
    height: 20px;
    width: 20px;
    background-color: var(--color-accent-100);
    border-radius: 100%;
    top: 0;
    right: 0;
    transform: translateX(10px) translateY(-10px);
    font-size: 12px;
    display: grid;
    place-items: center;
    line-height: 0px;
  }
`;

interface CartButtonTypes {
  cartItemCount: number;
}

const CartButton = ({ cartItemCount }: CartButtonTypes) => {
  return (
    <Button type="button">
      <BsHandbag />
      <div
        aria-label={`Cart items: ${cartItemCount}`}
        role="status"
        aria-live="polite"
      >
        {cartItemCount}
      </div>
    </Button>
  );
};

export default CartButton;
