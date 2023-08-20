import React, { useState, useContext, useEffect } from 'react';
import {
  ProjectCreactionContext,
  ProjectCreactionContextReturnTypes,
} from '@/components/project/ProjectCreation/ProjectCreationContext';
import { RichTextEditor, Button } from '@/components/global';
import { InputContainer, FormButtonContainer } from './FormStyles';
import { Notification } from '@/components/global';
import { isProjectFormComplete } from '@/helpers/inputChecks';

const RiskTab = () => {
  const { projectFormData, setProjectFormData, setActiveTab } = useContext(
    ProjectCreactionContext
  ) as ProjectCreactionContextReturnTypes;

  const [state1, setState1] = useState('');
  const [state2, setState2] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    setProjectFormData((prevState) => ({
      ...prevState,
      detail: {
        ...prevState.detail,
        risks: `${state1}**${state2}`,
      },
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state1, state2]);

  useEffect(() => {
    if (projectFormData.detail.risks !== '') {
      const risks = projectFormData.detail.risks.split('**');

      setState1(risks[0]);
      setState2(risks[1]);
    }
  }, []);

  const saveAndContinue = () => {
    if (isProjectFormComplete(projectFormData.detail.risks)) {
      setActiveTab(7);
    } else {
      setShowNotifications(true);
    }
  };
  return (
    <div>
      <InputContainer>
        <div>
          <label htmlFor="projectImage" className="custom-label">
            What are the major and minor risks associated with your project?
          </label>
        </div>
        <div className="editor_container">
          <RichTextEditor state={state1} setState={setState1} />
        </div>
      </InputContainer>
      <InputContainer>
        <div>
          <label htmlFor="projectImage" className="custom-label">
            What are the legal or regulatory terms of the project?
          </label>
        </div>
        <div className="editor_container">
          <RichTextEditor state={state2} setState={setState2} />
        </div>
      </InputContainer>
      <FormButtonContainer>
        <Button
          buttonTitle="Previous"
          buttonType="action"
          buttonFunction={() => setActiveTab(5)}
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

export default RiskTab;
