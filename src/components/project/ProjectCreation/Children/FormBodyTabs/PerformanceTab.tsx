import React, { useState, useContext, useEffect } from 'react';
import {
  ProjectCreactionContext,
  ProjectCreactionContextReturnTypes,
} from '@/components/project/ProjectCreation/ProjectCreationContext';
import { RichTextEditor, Button } from '@/components/global';
import { InputContainer, FormButtonContainer } from './FormStyles';

const PeformanceTab = () => {
  const { projectFormData, setProjectFormData, setActiveTab } = useContext(
    ProjectCreactionContext
  ) as ProjectCreactionContextReturnTypes;

  const [state1, setState1] = useState('');
  const [state2, setState2] = useState('');
  const [state3, setState3] = useState('');

  useEffect(() => {
    setProjectFormData((prevState) => ({
      ...prevState,
      detail: {
        ...prevState.detail,
        performance: `${state1}**${state2}**${state3}`,
      },
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state1, state2, state3]);

  useEffect(() => {
    if (projectFormData.detail.performance !== '') {
      const performance = projectFormData.detail.performance.split('**');

      setState1(performance[0]);
      setState2(performance[1]);
      setState3(performance[2]);
    }
  }, []);

  const saveAndContinue = () => {
    if (projectFormData.detail.performance !== '') {
      setActiveTab(6);
    }
  };
  return (
    <div>
      <InputContainer>
        <div>
          <label htmlFor="projectImage" className="custom-label">
            How do you plan to track and measure performance?
          </label>
        </div>
        <div className="editor_container">
          <RichTextEditor state={state1} setState={setState1} />
        </div>
      </InputContainer>
      <InputContainer>
        <div>
          <label htmlFor="projectImage" className="custom-label">
            How is your project different from other competitors?
          </label>
        </div>
        <div className="editor_container">
          <RichTextEditor state={state2} setState={setState2} />
        </div>
      </InputContainer>
      <InputContainer>
        <div>
          <label htmlFor="projectImage" className="custom-label">
            Explain your project&apos;s unique features.
          </label>
        </div>
        <div className="editor_container">
          <RichTextEditor state={state3} setState={setState3} />
        </div>
      </InputContainer>
      <FormButtonContainer>
        <Button
          buttonTitle="Previous"
          buttonType="action"
          buttonFunction={() => setActiveTab(4)}
        />
        <Button
          buttonTitle="Save & Continue"
          buttonType="action"
          buttonFunction={saveAndContinue}
        />
      </FormButtonContainer>
    </div>
  );
};

export default PeformanceTab;
