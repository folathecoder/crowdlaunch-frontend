import styled from 'styled-components';
import { QUERIES } from '@/styles/mediaQueries';

export const WalletSection = styled.section`
  margin-block: 2.62rem 1.84rem;
  width: 100%;

  h2 {
    font-size: 1.5rem;
  }
`;

export const WalletContainer = styled.div``;

export const WalletInfo = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr;
  margin: 1rem 0rem;

  @media ${QUERIES.tablet} {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const WalletInfoCard = styled.div`
  min-height: 92px;
  width: 100%;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  padding: 0rem 1rem;
  background-color: var(--color-bg-300);

  h3 {
    font-size: 14px;
    font-weight: 500;
    color: var(--color-font-300);
    cursor: pointer;

    span {
      margin-left: 0.4rem;
    }

    svg {
      transform: translateY(0.1rem);
    }
  }

  h4 {
    font-size: 30px;
    font-weight: 700;
    color: var(--color-font-100);
  }
`;

export const WalletTransaction = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: 1fr;
  gap: 1rem;

  h3 {
    margin-bottom: 1rem;
    text-decoration: underline;
    text-decoration: underline;
    text-decoration-color: var(--color-accent-100);
    text-decoration-skip-ink: none;
    text-underline-offset: 10px;
  }

  @media ${QUERIES.tablet} {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const WalletDeposit = styled.div`
  border-radius: 0.5rem;
  background-color: var(--color-bg-300);
  width: 100%;
  min-height: 10rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  ol {
    margin: 0.4rem;

    li {
      font-weight: 400;
      list-style-type: decimal;
      margin-left: 1rem;
      padding-left: 0.2rem;
      line-height: 1.5rem;
      color: var(--color-font-200);
    }
  }

  .qrcode {
    display: grid;
    place-items: center;

    canvas {
      width: 250px !important;
      height: 250px !important;
      background-color: white !important;
      padding: 1rem;
      border-radius: 0.5rem;
    }
  }

  .copy {
    display: flex;
    justify-content: center;

    button {
      cursor: pointer;
      background-color: var(--color-bg-400);
      padding: 0.3rem 0.8rem;
      color: var(--color-font-500);
      border: transparent;
      border-radius: 1rem;

      span {
        margin-left: 0.2rem;

        svg {
          transform: translateY(0.1rem);
        }
      }
    }
  }
`;

export const WalletWithdraw = styled.div`
  border-radius: 0.5rem;
  background-color: var(--color-bg-300);
  width: 100%;
  min-height: 10rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  position: relative;

  input {
    width: 100%;
    height: 50px;
    padding: 10px;
    border-radius: 0.5rem;
    border: 0.1rem solid var(--color-border-100);
    background-color: var(--color-bg-200);
    color: var(--color-font-100);
    margin: 1rem 0rem;
    font-weight: 500;

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

  .button_container {
    display: flex;
    justify-content: flex-end;
    padding: 1rem 0rem;
  }

  .withdraw_message {
    background-color: var(--color-bg-500);
    border: 0.1rem solid var(--color-border-100);
    padding: 1rem;
    border-radius: 0.5rem;

    p:first-of-type {
      color: var(--color-accent-100);
    }
  }

  .access {
    background-color: hsla(218, 80%, 2%, 0.8);
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    border: 0.1rem solid var(--color-border-100);
    border-radius: 0.5rem;
    display: grid;
    place-items: center;
  }
`;

export const Transactions = styled.ul`
  border-radius: 0.5rem;
  background-color: var(--color-bg-300);
  width: 100%;
  min-height: 10rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1rem;

  li {
    border-bottom: 0.1rem solid var(--color-border-100);
    padding-bottom: 1rem;
    display: flex;
    gap: 1rem;
    justify-content: space-between;
    flex-wrap: wrap;
    flex-direction: column;

    @media ${QUERIES.tablet} {
      flex-direction: row;
    }
  }

  .txn_msg {
    margin-top: 0.8rem;
  }

  .tnx_header {
    display: flex;
    align-items: center;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .txn_amount {
    text-decoration: underline;
    text-decoration: underline;
    text-decoration-color: var(--color-accent-100);
    text-decoration-skip-ink: none;
    text-underline-offset: 5px;
  }
`;

export const WalletDividend = styled.div`
  min-height: 92px;
  width: 100%;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  padding: 1rem;
  background-color: var(--color-bg-300);
  margin: 1rem 0rem;
  justify-content: space-between;
  gap: 2rem;
  flex-wrap: wrap;
  position: relative;

  .access {
    background-color: hsla(218, 80%, 2%, 0.8);
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    border: 0.1rem solid var(--color-border-100);
    border-radius: 0.5rem;
    display: grid;
    place-items: center;
  }

  span {
    h3 {
      color: var(--color-accent-100);
    }
  }
`;
