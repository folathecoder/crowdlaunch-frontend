import styled from 'styled-components';
import { QUERIES } from '@/styles/mediaQueries';
import { motion } from 'framer-motion';

export const SettingContainer = styled(motion.section)`
  position: fixed;
  background: var(--color-bg-500);
  top: 0;
  left: auto;
  right: 0;
  bottom: 0;
  height: 100vh;
  overflow: hidden;
  width: 100vw;
  z-index: 999999;
  white-space: nowrap;
  padding: 1rem;
  overflow-y: auto;

  .close_btn {
    border: none;
    background: transparent;
    border-bottom: 1px solid var(--color-accent-100);
    color: var(--color-font-100);
    margin-bottom: 1rem;
    cursor: pointer;
  }

  @media ${QUERIES.mobile} {
    top: 0;
    left: auto;
    right: 0;
    bottom: 0;
    width: 500px;
    border-radius: 20px 0px 0px 20px;
  }
`;

export const Form = styled.form`
  input {
    width: 100%;
    height: 50px;
    padding: 10px;
    border-radius: 0.5rem;
    border: 0.1rem solid var(--color-border-100);
    background-color: var(--color-bg-200);
    color: var(--color-font-100);
    margin-bottom: 1rem;

    &:active {
      outline: 0.1rem solid var(--color-accent-100);
    }

    &:focus {
      outline: 0.1rem solid var(--color-border-100);
    }

    &:hover {
      outline: 0.1rem solid var(--color-border-100);
    }
  }
`;

export const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  h2 {
    font-size: 1.2rem;
    display: flex;

    span {
      margin-right: 0.5rem;
      display: grid;
      place-items: center;

      i {
        color: pink;
      }
    }
  }
`;

export const ButtonContainer = styled(motion.section)`
  margin-top: 1rem;
  display: flex;
  justify-content: space-between;
`;
