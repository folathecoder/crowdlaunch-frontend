import React from 'react';
import { Button } from '@/components/global';
import { ProjectCreatorContainer, ProjectCreatorForm } from './FormStyles';
import { FormButtonContainer } from './FormStyles';

const ProjectCreatorTab = () => {
  return (
    <ProjectCreatorContainer>
      <ProjectCreatorForm>
        <div>
          <h2>Lorem ipsum dolor sit amet cons</h2>
        </div>
        <div>
          <p className="project_subtitle">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit Lorem,
            ipsum dolor sit amet consectetur adipisicing elit.
          </p>
        </div>
        <div>
          <input
            type="text"
            value=""
            onChange={() => {}}
            placeholder="Target Investment Amount (USD)"
          />
        </div>
        <div>
          <input
            type="text"
            value=""
            onChange={() => {}}
            placeholder="($) Minimum Investment Amount"
          />
        </div>
        <div>
          <p>
            Note: A service charge of 0.1 ETH or its equivalent will be deducted
            for the creation of a project on the platform.
          </p>
        </div>
        <FormButtonContainer>
          <Button
            buttonTitle="Get Funded"
            buttonType="action"
            buttonFunction={() => {}}
          />
        </FormButtonContainer>
      </ProjectCreatorForm>
    </ProjectCreatorContainer>
  );
};

export default ProjectCreatorTab;
