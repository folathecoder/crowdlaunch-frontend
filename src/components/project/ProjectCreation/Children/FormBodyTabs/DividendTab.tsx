import React from 'react';
import { RichTextEditor, Button } from '@/components/global';
import { InputContainer, FormButtonContainer } from './FormStyles';

const DividendTab = () => {
  return (
    <div>
      <InputContainer>
        <div>
          <label htmlFor="projectImage" className="custom-label">
            What are the features of your project&apos;s NFT share?
          </label>
        </div>
        <div className="editor_container">
          <RichTextEditor />
        </div>
      </InputContainer>
      <InputContainer>
        <div>
          <label htmlFor="projectImage" className="custom-label">
            Dividend breakdown and payout period.
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

export default DividendTab;
