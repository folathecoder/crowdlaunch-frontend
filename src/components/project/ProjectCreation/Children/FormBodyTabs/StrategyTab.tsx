import React, { useState, useContext, useEffect } from 'react';
import {
  ProjectCreactionContext,
  ProjectCreactionContextReturnTypes,
} from '@/components/project/ProjectCreation/ProjectCreationContext';
import { RichTextEditor, Button } from '@/components/global';
import { InputContainer, FormButtonContainer } from './FormStyles';
import { isProjectFormComplete } from '@/helpers/inputChecks';
import { Notification } from '@/components/global';

const StrategyTab = () => {
  const { projectFormData, setProjectFormData, setActiveTab } = useContext(
    ProjectCreactionContext
  ) as ProjectCreactionContextReturnTypes;

  const [showNotifications, setShowNotifications] = useState(false);

  const [state1, setState1] = useState('');
  const [state2, setState2] = useState('');
  const [state3, setState3] = useState('');
  const [state4, setState4] = useState('');

  useEffect(() => {
    setProjectFormData((prevState) => ({
      ...prevState,
      detail: {
        ...prevState.detail,
        strategy: `${state1}**${state2}**${state3}**${state4}`,
      },
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state1, state2, state3, state4]);

  useEffect(() => {
    if (projectFormData.detail.strategy !== '') {
      const strategy = projectFormData.detail.strategy.split('**');

      setState1(strategy[0]);
      setState2(strategy[1]);
      setState3(strategy[2]);
      setState4(strategy[3]);
    }
  }, []);

  const saveAndContinue = () => {
    if (isProjectFormComplete(projectFormData.detail.strategy)) {
      setActiveTab(3);
    } else {
      setShowNotifications(true);
    }
  };

  return (
    <div>
      <InputContainer>
        <div>
          <label htmlFor="projectImage" className="custom-label">
            Explain your core business strategy?
          </label>
        </div>
        <div className="editor_container">
          <RichTextEditor state={state1} setState={setState1} />
        </div>
      </InputContainer>
      <InputContainer>
        <div>
          <label htmlFor="projectImage" className="custom-label">
            What is your customer acquistion and retention strategy?
          </label>
        </div>
        <div className="editor_container">
          <RichTextEditor state={state2} setState={setState2} />
        </div>
      </InputContainer>
      <InputContainer>
        <div>
          <label htmlFor="projectImage" className="custom-label">
            What is your marketing strategy?
          </label>
        </div>
        <div className="editor_container">
          <RichTextEditor state={state3} setState={setState3} />
        </div>
      </InputContainer>
      <InputContainer>
        <div>
          <label htmlFor="projectImage" className="custom-label">
            What is your growth strategy?
          </label>
        </div>
        <div className="editor_container">
          <RichTextEditor state={state4} setState={setState4} />
        </div>
      </InputContainer>
      <FormButtonContainer>
        <Button
          buttonTitle="Previous"
          buttonType="action"
          buttonFunction={() => setActiveTab(1)}
        />
        <Button
          buttonTitle="Save & Continue"
          buttonType="action"
          buttonFunction={saveAndContinue}
        />
      </FormButtonContainer>
      <Notification
        message="Please complete all fields"
        setState={setShowNotifications}
        state={showNotifications}
      />
    </div>
  );
};

export default StrategyTab;
