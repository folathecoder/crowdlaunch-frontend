import styled from 'styled-components';
import { QUERIES } from '@/styles/mediaQueries';

export const VotingContainer = styled.div`
  max-width: 26.6875rem;
  padding: 2.06rem 1.44rem 1.31rem 1.19rem;

  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  justify-content: center;
  border-radius: 1.25rem;
  background: rgba(33, 33, 35, 0.4);

  & > p {
    color: rgba(255, 255, 255, 0.5);
    font-size: 0.6875rem;
    text-align: center;
  }
`;
export const VotingHeader = styled.div`
  h4 {
    font-size: 1.25rem;
    margin-bottom: 0.6rem;
    color: rgba(255, 255, 255, 0.5);

    span {
      font-size: 1.25rem;
      background-image: radial-gradient(#fcc914, #fe6f37, #c66add, #9a74f1);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }

  p {
    font-size: 0.9375rem;
  }
`;

export const TimerContainer = styled.div`
  opacity: 0.5;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 0.3rem;

  @media only screen and (min-width: 400px) {
    flex-direction: row;
    align-items: center;
  }

  & > * {
    font-size: 0.6875rem;
  }

  span {
    display: block;
  }
`;

export const FormContainer = styled.div`
  display: grid;
  gap: 0.88rem;
`;
export const RadioContainer = styled.div`
  label {
    font-size: 0.9375rem;

    display: grid;
    grid-template-columns: 1em auto;
    gap: 1em;
  }

  input[type='radio'] {
    -webkit-appearance: none;
    appearance: none;
    background-color: #000;
    margin: 0;
    font: inherit;
    width: 1.15em;
    height: 1.15em;
    border: 0.15em solid rgba(255, 255, 255, 0.5);
    border-radius: 50%;
    transform: translateY(0.075em);

    display: grid;
    place-content: center;
  }

  input[type='radio']::before {
    content: '';
    width: 0.65em;
    height: 0.65em;
    border-radius: 50%;
    transition: 120ms transform ease-in-out;
    box-shadow: inset 1em 1em rgba(255, 255, 255, 0.5);
  }

  input[type='radio']:checked::before {
    box-shadow: inset 1em 1em #ff4264;
  }

  input[type='radio']:checked {
    border: 0.15em solid #ff4264;
  }

  & > div {
    max-width: 100%;
    margin-left: 2rem;
    span {
      font-size: 0.625rem;
      margin-left: auto;
      opacity: 0.5;
      display: flex;
      justify-content: flex-end;
    }
  }
`;
