import React, { useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
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
import usePostProject from '@/hooks/RequestHooks/POST/usePostProject';
import { Notification } from '@/components/global';
import { initialProjectFormData } from '@/components/project/ProjectCreation/ProjectCreationContext';

const ProjectCreatorTab = () => {
  const router = useRouter();

  const [requestCompletionCount, setRequestCompletionCount] = useState(0);
  const [startProjectCreation, setStartProjectCreation] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [showNotification, setShowNotification] = useState(false);

  const { projectFormData, setProjectFormData, setActiveTab } = useContext(
    ProjectCreactionContext
  ) as ProjectCreactionContextReturnTypes;

  const {
    createProject,
    projectCreationStatus,
    projectDetailCreationStatus,
    projectData,
  } = usePostProject({ data: projectFormData });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setProjectFormData((prevState) => ({
      ...prevState,
      main: {
        ...prevState.main,
        [name]: name === 'noOfDaysLeft' ? value : Number(value),
      },
    }));
  };

  // Get current date in format YYYY-MM-DD
  const currentDate = new Date().toISOString().split('T')[0];

  useEffect(() => {
    if (projectCreationStatus === 2) {
      setRequestCompletionCount(1);
    }
  }, [projectCreationStatus]);

  useEffect(() => {
    if (projectDetailCreationStatus === 2) {
      setRequestCompletionCount(2);
      setNotificationMessage(
        'Congratulations, Your project had been created successfully'
      );
      setStartProjectCreation(false);
      setTimeout(() => {
        router.push(`/project/${projectData?.projectId}`);
        setProjectFormData(initialProjectFormData);
        setActiveTab(0);
      }, 2000);
    }

    if (projectDetailCreationStatus === 3) {
      setNotificationMessage('Project creation was not successful');
      setStartProjectCreation(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectData?.projectId, projectDetailCreationStatus, router]);

  const handleProjectCreation = () => {
    setStartProjectCreation(true);
    createProject();
  };

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
            pattern="^\d*(\.\d{0,9})?$"
            name="targetAmount"
            value={projectFormData.main.targetAmount}
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
            pattern="^\d*(\.\d{0,9})?$"
            name="minInvestment"
            value={projectFormData.main.minInvestment}
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
            buttonTitle={
              startProjectCreation
                ? `Get Funded (${requestCompletionCount}/2)`
                : `Get Funded`
            }
            buttonType="action"
            buttonFunction={handleProjectCreation}
          />
        </FormButtonContainer>
        <Notification
          message={notificationMessage}
          state={showNotification}
          setState={setShowNotification}
        />
      </ProjectCreatorForm>
    </ProjectCreatorContainer>
  );
};

export default ProjectCreatorTab;
