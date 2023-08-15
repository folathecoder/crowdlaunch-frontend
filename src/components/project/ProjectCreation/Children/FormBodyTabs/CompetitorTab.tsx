import React, { useState, useContext, useEffect } from 'react';
import {
  ProjectCreactionContext,
  ProjectCreactionContextReturnTypes,
} from '@/components/project/ProjectCreation/ProjectCreationContext';
import { RichTextEditor, Button } from '@/components/global';
import { InputContainer, FormButtonContainer } from './FormStyles';

const CompetitorTab = () => {
  const { projectFormData, setProjectFormData, setActiveTab } = useContext(
    ProjectCreactionContext
  ) as ProjectCreactionContextReturnTypes;
  const [coreCompetitors, setCoreCompetitors] = useState('');
  const [differentCompetitor, setDifferentCompetitor] = useState('');
  const [uniqueFeatures, setUniqueFeatures] = useState('');

  useEffect(() => {
    setProjectFormData((prevState) => ({
      ...prevState,
      detail: {
        ...prevState.detail,
        competitors: `${coreCompetitors}**${differentCompetitor}**${uniqueFeatures}`,
      },
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coreCompetitors, differentCompetitor, uniqueFeatures]);

  useEffect(() => {
    if (projectFormData.detail.competitors !== '') {
      const competitors = projectFormData.detail.competitors.split('**');

      setCoreCompetitors(competitors[0]);
      setDifferentCompetitor(competitors[1]);
      setUniqueFeatures(competitors[2]);
    }
  }, []);

  const saveAndContinue = () => {
    if (projectFormData.detail.competitors !== '') {
      setActiveTab(2);
    }
  };

  return (
    <div>
      <InputContainer>
        <div>
          <label htmlFor="projectImage" className="custom-label">
            Who are your core competitors?
          </label>
        </div>
        <div className="editor_container">
          <RichTextEditor
            state={coreCompetitors}
            setState={setCoreCompetitors}
          />
        </div>
      </InputContainer>
      <InputContainer>
        <div>
          <label htmlFor="projectImage" className="custom-label">
            How is your project different from other competitors?
          </label>
        </div>
        <div className="editor_container">
          <RichTextEditor
            state={differentCompetitor}
            setState={setDifferentCompetitor}
          />
        </div>
      </InputContainer>
      <InputContainer>
        <div>
          <label htmlFor="projectImage" className="custom-label">
            Explain your project&apos;s unique features.
          </label>
        </div>
        <div className="editor_container">
          <RichTextEditor state={uniqueFeatures} setState={setUniqueFeatures} />
        </div>
      </InputContainer>
      <FormButtonContainer>
        <Button
          buttonTitle="Previous"
          buttonType="action"
          buttonFunction={() => setActiveTab(0)}
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

export default CompetitorTab;
