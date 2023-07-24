import React from 'react';
import { RichTextEditor, Button } from '@/components/global';
import { InputContainer, FormButtonContainer } from './FormStyles';

const RiskTab = () => {
  return (
    <div>
      <InputContainer>
        <div>
          <label htmlFor="projectImage" className="custom-label">
            What are the major and minor risks associated with your project?
          </label>
        </div>
        <div className="editor_container">
          <RichTextEditor />
        </div>
      </InputContainer>
      <InputContainer>
        <div>
          <label htmlFor="projectImage" className="custom-label">
            What are the legal or regulatory terms of the project?
          </label>
        </div>
        <div className="editor_container">
          <RichTextEditor />
        </div>
      </InputContainer>
      <FormButtonContainer>
        <Button
          buttonTitle="Save & Continue"
          buttonType="action"
          buttonFunction={() => {}}
        />
      </FormButtonContainer>
    </div>
  );
};

export default RiskTab;
