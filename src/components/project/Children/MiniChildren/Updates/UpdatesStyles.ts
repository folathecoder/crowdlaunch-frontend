import styled from 'styled-components';
import { QUERIES } from '@/styles/mediaQueries';

export const UpdateSection = styled.section`
  margin-block: 2.62rem 1.84rem;
`;

export const UpdateFormContainer = styled.div`
  margin-bottom: 2rem;

  h2 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }

  form {
    width: 100%;
  }

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
      outline: 0.1rem solid var(--color-border-100);
    }

    &:focus {
      outline: 0.1rem solid var(--color-border-100);
    }

    &:hover {
      outline: 0.1rem solid var(--color-border-100);
    }
  }

  .custom-textarea {
    width: 100%;
    height: 400px;
    padding: 10px;
    font-size: 16px;
    border-radius: 0.5rem;
    resize: vertical;
    border-radius: 0.5rem;
    border: 0.1rem solid var(--color-border-100);
    background-color: var(--color-bg-200);
    color: var(--color-font-100);

    &:active {
      outline: 0.1rem solid var(--color-border-100);
    }

    &:focus {
      outline: 0.1rem solid var(--color-border-100);
    }

    &:hover {
      outline: 0.1rem solid var(--color-border-100);
    }
  }

  .update-button {
    display: inline-flex;
    height: 35px;
    padding: 9px 9.703px 10px 13px;
    justify-content: flex-end;
    align-items: center;
    flex-shrink: 0;
    border-radius: 12px;
    border: 1px solid var(--color-bg-400);
    background: var(--color-bg-400);
    color: var(--color-font-500);
    text-align: center;
    font-size: 14px;
    font-weight: 900;
    line-height: 40px;
    cursor: pointer;
    transition: 0.5s linear;
    margin: 20px 0px;

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
  }
`;

export const UpdateFeedContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const FeedContainer = styled.div`
  h3 {
    font-size: 1.5rem;
    text-decoration: underline;
    text-decoration: underline;
    text-decoration-color: var(--color-accent-100);
    text-decoration-skip-ink: none;
    text-underline-offset: 10px;
    margin-bottom: 1rem;
  }

  .update-date {
    margin-top: 1rem;
  }
`;
