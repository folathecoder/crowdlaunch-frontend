import React, { useState, useContext } from 'react';
import {
  ProjectCreactionContext,
  ProjectCreactionContextReturnTypes,
} from '@/components/project/ProjectCreation/ProjectCreationContext';
import { Button } from '@/components/global';
import {
  ProjectCreatorContainer,
  ProjectCreatorForm,
  FormButtonContainer,
} from './FormStyles';

const ProjectCreatorTab = () => {
  const { projectFormData, setProjectFormData, setActiveTab } = useContext(
    ProjectCreactionContext
  ) as ProjectCreactionContextReturnTypes;

  const [formData, setFormData] = useState({
    targetAmount: '',
    minInvestment: '',
    campaignEndDate: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setProjectFormData((prevState) => ({
      ...prevState,
      main: {
        ...prevState.main,
        [name]: value,
      },
    }));
  };

  // Get current date in format YYYY-MM-DD
  const currentDate = new Date().toISOString().split('T')[0];

  return (
    <ProjectCreatorContainer>
      <ProjectCreatorForm>
        <div>
          <h2>Kickstart Your Vision: Set Your Funding Goals</h2>
        </div>
        <div>
          <p className="project_subtitle">
            For every project initiation on our platform, a nominal service fee
            of 0.1 ETH, or its equivalent, will be applied.
          </p>
        </div>
        <div>
          <label htmlFor="targetAmount">Target Investment (ETH)</label>
          <input
            type="number"
            step="1"
            min="0"
            pattern="^\d*(\.\d{0,2})?$"
            name="targetAmount"
            value={projectFormData.main.targetAmount.toLocaleString()}
            onChange={handleInputChange}
            placeholder="Target Investment Amount (USD)"
          />
        </div>
        <div>
          <label htmlFor="minInvestment">Minimum Investment (ETH)</label>
          <input
            type="number"
            step="0.01"
            min="0"
            pattern="^\d*(\.\d{0,2})?$"
            name="minInvestment"
            value={projectFormData.main.minInvestment.toLocaleString()}
            onChange={handleInputChange}
            placeholder="($) Minimum Investment Amount"
          />
        </div>
        <div>
          <label htmlFor="dateInput">Funding Completion Date</label>
          <input
            type="date"
            name="noOfDaysLeft"
            id="dateInput"
            min={currentDate}
            value={projectFormData.main.noOfDaysLeft}
            onChange={handleInputChange}
          />
        </div>
        <FormButtonContainer>
          <Button
            buttonTitle="Previous"
            buttonType="action"
            buttonFunction={() => setActiveTab(7)}
          />
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
