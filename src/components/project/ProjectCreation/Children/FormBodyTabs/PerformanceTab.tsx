import React from 'react';
import { RichTextEditor, Button } from '@/components/global';
import { InputContainer, FormButtonContainer } from './FormStyles';

const PeformanceTab = () => {
  return (
    <div>
      <InputContainer>
        <div>
          <label htmlFor="projectImage" className="custom-label">
            How do you plan to track and measure performance?
          </label>
        </div>
        <div className="editor_container">
          <RichTextEditor />
        </div>
      </InputContainer>
      <InputContainer>
        <div>
          <label htmlFor="projectImage" className="custom-label">
            How is your project different from other competitors?
          </label>
        </div>
        <div className="editor_container">
          <RichTextEditor />
        </div>
      </InputContainer>
      <InputContainer>
        <div>
          <label htmlFor="projectImage" className="custom-label">
            Explain your project&apos;s unique features.
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

export default PeformanceTab;
