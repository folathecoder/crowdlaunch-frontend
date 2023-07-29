import styled from 'styled-components';
import { QUERIES } from '@/styles/mediaQueries';
import { HexColorPicker } from 'react-colorful';

export const InputDivider = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1.5rem;

  & > * {
    flex: 1;
  }

  @media ${QUERIES.tabletMini} {
    flex-direction: row;
    margin-bottom: 0rem;
  }
`;

export const InputContainer = styled.div`
  max-width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;

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

  select {
    width: 100%;
    height: 50px;
    padding: 5px;
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

  .quill:nth-child(2) {
    display: none !important;
  }

  .custom-label {
    margin: 1.5rem 0rem;
  }

  .editor_container {
    margin-bottom: 16px;
  }
`;

export const FormButtonContainer = styled.div`
  margin: 2rem 0rem;
  display: flex;
  justify-content: flex-end;
`;

export const CreatorContainer = styled.section`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;

  @media ${QUERIES.tablet} {
    flex-direction: row;
  }

  & > * {
    flex: 1;
    padding: 1rem;
  }

  .color_input {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    margin-bottom: 2rem;
  }

  .color_input-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2rem;

    @media ${QUERIES.tablet} {
      flex-direction: row-reverse;
    }
  }
`;

export const ColorPicker = styled(HexColorPicker)`
  width: 100% !important;

  @media ${QUERIES.tablet} {
    width: 500px !important;
  }
`;

export const CreatorImage = styled.div`
  display: flex;
  justify-content: center;
`;

export const CreatorContent = styled.div`
  p {
    margin: 1rem 0rem;
  }

  h3 {
    margin-bottom: 1rem;
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

export const ProjectCreatorContainer = styled.section`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const ProjectCreatorForm = styled.div`
  max-width: 600px;

  h2 {
    margin-bottom: 20px;
  }

  .project_subtitle {
    margin-bottom: 20px;
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
