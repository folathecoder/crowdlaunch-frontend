import React, { useState, useContext, useEffect } from 'react';
import {
  ProjectCreactionContext,
  ProjectCreactionContextReturnTypes,
} from '@/components/project/ProjectCreation/ProjectCreationContext';
import { RichTextEditor, Button } from '@/components/global';
import { InputContainer, FormButtonContainer } from './FormStyles';

const DividendTab = () => {
  const { projectFormData, setProjectFormData, setActiveTab } = useContext(
    ProjectCreactionContext
  ) as ProjectCreactionContextReturnTypes;

  const [state1, setState1] = useState('');
  const [state2, setState2] = useState('');

  useEffect(() => {
    setProjectFormData((prevState) => ({
      ...prevState,
      detail: {
        ...prevState.detail,
        dividend: `${state1}**${state2}`,
      },
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state1, state2]);

  useEffect(() => {
    if (projectFormData.detail.dividend !== '') {
      const dividend = projectFormData.detail.dividend.split('**');

      setState1(dividend[0]);
      setState2(dividend[1]);
    }
  }, []);

  const saveAndContinue = () => {
    if (projectFormData.detail.dividend !== '') {
      setActiveTab(5);
    }
  };

  return (
    <div>
      <InputContainer>
        <div>
          <label htmlFor="projectImage" className="custom-label">
            What are the features of your project&apos;s NFT share?
          </label>
        </div>
        <div className="editor_container">
          <RichTextEditor state={state1} setState={setState1} />
        </div>
      </InputContainer>
      <InputContainer>
        <div>
          <label htmlFor="projectImage" className="custom-label">
            Dividend breakdown and payout period.
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
          buttonFunction={() => setActiveTab(3)}
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

export default DividendTab;
